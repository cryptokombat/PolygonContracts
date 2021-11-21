// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './ERC1155Preset.sol';

contract CryptoKombatConsumables is ERC1155Preset {
    constructor(string memory _baseUri, address _proxyRegistryAddress)
        ERC1155Preset('Crypto Kombat Consumables', 'CKCM', _baseUri, _proxyRegistryAddress)
    {}
}
