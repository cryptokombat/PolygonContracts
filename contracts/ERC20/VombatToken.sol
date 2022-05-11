// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './ERC20Preset.sol';

contract VombatToken is ERC20Preset {
    constructor() ERC20Preset('Vombat Token', 'VOMBAT') {}

    function mint(address to, uint256 amount) external {
        require(hasRole(MINTER_ROLE, _msgSender()), '!access');
        _mint(to, amount);
    }
}
