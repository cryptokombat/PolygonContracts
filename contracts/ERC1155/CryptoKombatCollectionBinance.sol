// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './XpNetworkChildERC1155Preset.sol';

contract CryptoKombatCollectionBinance is XpNetworkChildERC1155Preset {
    constructor(string memory _baseUri, address _proxyRegistryAddress)
        XpNetworkChildERC1155Preset(
            'Crypto Kombat Collection Binance',
            'CKCB',
            _baseUri,
            _proxyRegistryAddress
        )
    {}
}
