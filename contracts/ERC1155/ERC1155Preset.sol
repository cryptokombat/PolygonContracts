// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/utils/Context.sol';
import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';

import '../common/ContextMixin.sol';
import './ERC1155Tradable.sol';

contract ERC1155Preset is Context, ContextMixin, ERC1155Tradable, EIP712 {
    constructor(
        string memory name,
        string memory symbol,
        string memory _baseUri,
        address _proxy
    ) ERC1155Tradable(name, symbol, _proxy) EIP712(name, '1') {
        _setBaseMetadataURI(_baseUri);
    }

    function _msgSender() internal view override returns (address sender) {
        return ContextMixin.msgSender();
    }

    /**
     * @dev See {EIP712-DOMAIN_SEPARATOR}.
     */
    // solhint-disable-next-line func-name-mixedcase
    function DOMAIN_SEPARATOR() external view returns (bytes32) {
        return _domainSeparatorV4();
    }

    /**
     * @dev Returns whether the specified token exists by checking to see if it has a creator
     * @param _id uint256 ID of the token to query the existence of
     * @return bool whether the token exists
     */
    function exists(uint256 _id) external view returns (bool) {
        return _exists(_id);
    }
}
