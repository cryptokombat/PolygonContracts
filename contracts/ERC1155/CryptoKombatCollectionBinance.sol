// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './ChildERC1155Preset.sol';

contract CryptoKombatCollectionBinance is ChildERC1155Preset {
    constructor(string memory _baseUri, address _proxyRegistryAddress)
        ChildERC1155Preset('Crypto Kombat Collection Binance', 'CKCB', _baseUri, _proxyRegistryAddress)
    {}
}
