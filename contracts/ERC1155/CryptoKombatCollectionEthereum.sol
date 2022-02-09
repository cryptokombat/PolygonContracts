// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './ChildERC1155Preset.sol';

contract CryptoKombatCollectionEthereum is ChildERC1155Preset {
    constructor(string memory _baseUri, address _proxyRegistryAddress)
        ChildERC1155Preset('Crypto Kombat Collection Ethereum', 'CKCE', _baseUri, _proxyRegistryAddress)
    {}
}
