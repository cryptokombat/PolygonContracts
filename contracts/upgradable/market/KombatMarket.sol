// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol';

import '../lib/Error.sol';
import '../interfaces/ICollection.sol';

contract KombatMarket is
    Initializable,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    EIP712Upgradeable
{
    using SafeERC20Upgradeable for IERC20Upgradeable;

    // --- State variables  ---
    // token used for the market
    IERC20Upgradeable public marketToken;
    // treasure address
    address public treasure;
    // allowed collection array
    address[] public allowedCollections;
    // Mapping collection address => (tokenId => tokenPrice)
    mapping(address => mapping(uint256 => uint256)) public collectionPrices;

    // NOTE: Add more variables after all

    // --- Events  ---
    event TokenSet(address indexed token);
    event TreasureSet(address indexed treasure);
    event CollectionSet(address[] indexed collections);
    event PriceSet(address indexed collection, uint256[] indexed heroes, uint256[] indexed prices);
    event Purchase(
        address indexed user,
        address indexed collection,
        uint256 id,
        uint256 amount,
        uint256 price,
        uint256 total
    );
    event BatchPurchase(
        address indexed user,
        address indexed collection,
        uint256[] ids,
        uint256[] amounts,
        uint256 total
    );

    // --- Errors ---

    /// Collection not allowed
    error CollectionNotAllowed();
    /// Non existent token
    error TokenNotExists();

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _token,
        address _treasure,
        address[] memory _collection
    ) public virtual initializer {
        __AccessControl_init();
        __ReentrancyGuard_init();
        __EIP712_init('KombatMarket', 'v1');

        _setupToken(_token);
        _setupTreasure(_treasure);
        _setupCollection(_collection);

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    // --- Admin external functions  ---
    function setToken(address _token) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setupToken(_token);
    }

    function setTreasure(address _treasure) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setupTreasure(_treasure);
    }

    function setAllowedCollections(address[] memory _collection) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setupCollection(_collection);
    }

    function setPrice(
        address _collection,
        uint256[] memory _tokens,
        uint256[] memory _prices
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setupPrice(_collection, _tokens, _prices);
    }

    // --- Public external functions  ---
    function purchase(
        address _collection,
        uint256 _id,
        uint256 _amount
    ) external nonReentrant {
        _revertCollectionAllowed(_collection);
        Error._revertZeroUint(_id);
        Error._revertZeroUint(_amount);

        ICollection collection = ICollection(_collection);
        uint256 price = collectionPrices[_collection][_id];
        uint256 total = price * _amount;

        Error._revertZeroUint(total);
        if (!collection.exists(_id)) revert TokenNotExists();

        marketToken.safeTransferFrom(_msgSender(), treasure, total);
        collection.mint(_msgSender(), _id, _amount, new bytes(0));

        emit Purchase(_msgSender(), _collection, _id, _amount, price, total);
    }

    function batchPurchase(
        address _collection,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) external nonReentrant {
        _revertCollectionAllowed(_collection);
        Error._revertArrayMismatch(_ids, _amounts);

        ICollection collection = ICollection(_collection);

        uint256 total = 0;

        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 id = _ids[i];
            uint256 amount = _amounts[i];
            uint256 price = collectionPrices[_collection][id];

            if (!collection.exists(id)) revert TokenNotExists();

            total += price * amount;
        }

        Error._revertZeroUint(total);

        marketToken.safeTransferFrom(_msgSender(), treasure, total);
        collection.mintBatch(_msgSender(), _ids, _amounts, new bytes(0));

        emit BatchPurchase(_msgSender(), _collection, _ids, _amounts, total);
    }

    // --- Other external functions  ---
    /**
     * @dev See {EIP712-DOMAIN_SEPARATOR}.
     */
    // solhint-disable-next-line func-name-mixedcase
    function DOMAIN_SEPARATOR() external view returns (bytes32) {
        return _domainSeparatorV4();
    }

    // --- Internal functions  ---
    function _setupToken(address _address) internal {
        Error._revertZeroAddress(_address);
        marketToken = IERC20Upgradeable(_address);
        emit TokenSet(_address);
    }

    function _setupTreasure(address _address) internal {
        Error._revertZeroAddress(_address);
        treasure = _address;
        emit TreasureSet(_address);
    }

    function _setupCollection(address[] memory _list) internal {
        for (uint256 i = 0; i < _list.length; i++) {
            Error._revertZeroAddress(_list[i]);
        }
        allowedCollections = _list;
        emit CollectionSet(_list);
    }

    function _setupPrice(
        address _collection,
        uint256[] memory _ids,
        uint256[] memory _prices
    ) internal {
        Error._revertArrayMismatch(_ids, _prices);
        _revertCollectionAllowed(_collection);

        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 id = _ids[i];
            uint256 price = _prices[i];

            Error._revertZeroUint(price);

            collectionPrices[_collection][id] = price;
        }
        emit PriceSet(_collection, _ids, _prices);
    }

    function _revertCollectionAllowed(address _collection) internal view {
        Error._revertZeroAddress(_collection);
        if (!_isCollectionAllowed(_collection)) revert CollectionNotAllowed();
    }

    function _isCollectionAllowed(address _collection) internal view returns (bool) {
        for (uint256 i = 0; i < allowedCollections.length; i++) {
            if (allowedCollections[i] == _collection) {
                return true;
            }
        }
        return false;
    }
}
