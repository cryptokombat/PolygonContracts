// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/utils/Context.sol';
import './ERC1155Preset.sol';

contract ChildERC1155Preset is ERC1155Preset {
    bytes32 public constant DEPOSITOR_ROLE = keccak256('DEPOSITOR_ROLE');

    constructor(
        string memory name,
        string memory symbol,
        string memory _baseUri,
        address _proxy
    ) ERC1155Preset(name, symbol, _baseUri, _proxy) {}

    /**
     * @notice called when tokens are deposited on root chain
     * @dev Should be callable only by ChildChainManager
     * Should handle deposit by minting the required tokens for user
     * Make sure minting is done only by this function
     * @param user user address for whom deposit is being done
     * @param depositData abi encoded ids array and amounts array
     */
    function deposit(address user, bytes calldata depositData) external {
        require(hasRole(DEPOSITOR_ROLE, _msgSender()), 'ChildERC1155Preset: !access');
        require(user != address(0), 'ChildERC1155Preset: !user');

        (uint256[] memory ids, uint256[] memory amounts, bytes memory data) = abi.decode(
            depositData,
            (uint256[], uint256[], bytes)
        );

        require(ids.length == amounts.length, 'ChildERC1155Preset: !length');

        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            uint256 St = _totalSupply[id];
            uint256 Sr = _reservedSupply[id];
            uint256 Sm = _maxSupply[id];
            uint256 Sb = _bridgedSupply[id];

            require(_exists(id), 'ChildERC1155Preset: !exists');
            require(St + amount <= Sm, 'ChildERC1155Preset: !max');
            require(Sr - Sb >= amount, 'ChildERC1155Preset: !reserved');

            _totalSupply[id] = St + amount;
            _bridgedSupply[id] = Sb + amount;
        }

        _mintBatch(user, ids, amounts, data);
    }

    /**
     * @notice called when user wants to withdraw single token back to root chain
     * @dev Should burn user's tokens. This transaction will be verified when exiting on root chain
     * @param id id to withdraw
     * @param amount amount to withdraw
     */
    function withdrawSingle(uint256 id, uint256 amount) external {
        require(_exists(id), 'ChildERC1155Preset: !exists');
        require(_totalSupply[id] >= amount, 'ChildERC1155Preset: !total');
        require(_bridgedSupply[id] >= amount, 'ChildERC1155Preset: !bridged');

        _totalSupply[id] = _totalSupply[id] - amount;
        _bridgedSupply[id] = _bridgedSupply[id] - amount;

        _burn(_msgSender(), id, amount);
    }

    /**
     * @notice called when user wants to batch withdraw tokens back to root chain
     * @dev Should burn user's tokens. This transaction will be verified when exiting on root chain
     * @param ids ids to withdraw
     * @param amounts amounts to withdraw
     */
    function withdrawBatch(uint256[] calldata ids, uint256[] calldata amounts) external {
        require(ids.length == amounts.length, 'ChildERC1155Preset: !length');

        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            require(_exists(id), 'ChildERC1155Preset: !exists');
            require(_totalSupply[id] >= amount, 'ChildERC1155Preset: !total');
            require(_bridgedSupply[id] >= amount, 'ChildERC1155Preset: !bridged');

            _totalSupply[id] = _totalSupply[id] - amount;
            _bridgedSupply[id] = _bridgedSupply[id] - amount;
        }

        _burnBatch(_msgSender(), ids, amounts);
    }
}
