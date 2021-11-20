// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './ChildERC20Preset.sol';

contract KombatToken is ChildERC20Preset {
    constructor() ChildERC20Preset('Kombat Token', 'KOMBAT') {}

    function decimals() public view virtual override returns (uint8) {
        return 8;
    }
}
