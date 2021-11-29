// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';

import '../interfaces/ICollection.sol';
import '../interfaces/IVombat.sol';

contract KombatMarket is AccessControl, ReentrancyGuard, EIP712 {
    using SafeERC20 for IVombat;

    IVombat public vombat;

    address public treasure;

    address[] public allowedCollections;

    // Mapping collection address => (tokenId => tokenPrice)
    mapping(address => mapping(uint256 => uint256)) public collectionPrices;

    event TokenPricesSet(address collection, uint256[] heroes, uint256[] prices);

    event Purchased(
        address indexed user,
        address indexed collection,
        uint256 id,
        uint256 amount,
        uint256 price
    );
    event BatchPurchased(
        address indexed user,
        address indexed collection,
        uint256[] ids,
        uint256[] amounts,
        uint256 price
    );

    modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), '!admin');
        _;
    }

    constructor(
        IVombat _vombat,
        address _treasure,
        address[] memory _collections
    ) EIP712('Kombat Market', '1') {
        vombat = _vombat;
        treasure = _treasure;
        _setAllowedCollections(_collections);

        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function setTreasure(address _treasure) external onlyAdmin {
        require(_treasure != address(0), '!address');
        treasure = _treasure;
    }

    function setAllowedCollections(address[] memory _list) public onlyAdmin {
        require(_list.length > 0, '!length');
        _setAllowedCollections(_list);
    }

    function setTokenPrices(
        address _collection,
        uint256[] memory _tokens,
        uint256[] memory _prices
    ) external onlyAdmin {
        require(_tokens.length == _prices.length, '!length');

        for (uint256 i = 0; i < _tokens.length; i++) {
            uint256 tokenId = _tokens[i];
            uint256 price = _prices[i];

            require(price > 0, '!price');

            collectionPrices[_collection][tokenId] = price;
        }
        emit TokenPricesSet(_collection, _tokens, _prices);
    }

    function purchase(
        address _collection,
        uint256 _id,
        uint256 _amount
    ) external nonReentrant {
        require(isCollectionAllowed(_collection), '!collection');
        require(_id != 0, '!token');
        require(collectionPrices[_collection][_id] > 0, '!price');

        ICollection collection = ICollection(_collection);

        require(collection.exists(_id), '!exists');

        uint256 totalPrice = collectionPrices[_collection][_id] * _amount;

        vombat.safeTransferFrom(_msgSender(), treasure, totalPrice);

        collection.mint(_msgSender(), _id, _amount, new bytes(0));

        emit Purchased(_msgSender(), _collection, _id, _amount, totalPrice);
    }

    function batchPurchase(
        address _collection,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) external nonReentrant {
        require(isCollectionAllowed(_collection), '!collection');
        require(_ids.length == _amounts.length, '!length');

        ICollection collection = ICollection(_collection);

        uint256 totalPrice;

        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 id = _ids[i];
            uint256 amount = _amounts[i];
            totalPrice = totalPrice + (collectionPrices[_collection][id] * amount);

            require(collection.exists(id), '!exists');
            require(amount > 0, '!amount');
        }

        vombat.safeTransferFrom(_msgSender(), treasure, totalPrice);

        collection.mintBatch(_msgSender(), _ids, _amounts, new bytes(0));

        emit BatchPurchased(_msgSender(), _collection, _ids, _amounts, totalPrice);
    }

    /**
     * @dev Check that nft collection is in the allowed list
     * @param _collection Address of collection
     * @return bool
     */
    function isCollectionAllowed(address _collection) public view returns (bool) {
        for (uint256 i = 0; i < allowedCollections.length; i++) {
            if (allowedCollections[i] == _collection) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev See {EIP712-DOMAIN_SEPARATOR}.
     */
    // solhint-disable-next-line func-name-mixedcase
    function DOMAIN_SEPARATOR() external view returns (bytes32) {
        return _domainSeparatorV4();
    }

    function _setAllowedCollections(address[] memory _list) internal {
        allowedCollections = _list;
    }
}
