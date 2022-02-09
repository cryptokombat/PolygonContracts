//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './TestERC20.sol';

contract TestERC223 is TestERC20 {
    constructor(string memory name, string memory symbol) TestERC20(name, symbol) {}

    function transferAndCall(
        address to,
        uint256 value,
        bytes calldata
    ) public returns (bool) {
        return transfer(to, value);
    }
}
