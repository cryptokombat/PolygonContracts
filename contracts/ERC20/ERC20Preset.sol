// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract ERC20Preset is AccessControl, ERC20Burnable, ERC20Permit {
    bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) ERC20Permit(_name) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
    }

    function mint(address to, uint256 amount) public virtual {
        require(hasRole(MINTER_ROLE, _msgSender()), '!access');
        _mint(to, amount);
    }

    function recoverToken(address token, uint256 amount) external virtual {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), '!access');
        require(IERC20(token).balanceOf(address(this)) >= amount, '!balance');
        IERC20(token).transfer(_msgSender(), amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
