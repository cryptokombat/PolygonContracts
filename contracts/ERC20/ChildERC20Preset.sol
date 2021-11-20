// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './ERC20Preset.sol';

contract ChildERC20Preset is ERC20Preset {
    constructor(string memory _name, string memory _symbol) ERC20Preset(_name, _symbol) {}

    function deposit(address to, bytes calldata data) external {
        require(hasRole(MINTER_ROLE, _msgSender()), '!access');
        _mint(to, abi.decode(data, (uint256)));
    }

    function withdraw(uint256 amount) external {
        _burn(_msgSender(), amount);
    }
}
