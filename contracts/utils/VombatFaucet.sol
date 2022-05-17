// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '../interfaces/IRewardToken.sol';

contract VombatFaucet {
    uint256 public constant tokenAmount = 12000000000000000000;
    uint256 public constant waitTime = 5 minutes;

    IRewardToken public vombat;

    mapping(address => uint256) lastAccessTime;

    constructor(address _vombat) {
        require(_vombat != address(0));
        vombat = IRewardToken(_vombat);
    }

    function requestTokens() public {
        require(allowedToWithdraw(msg.sender));
        vombat.mint(msg.sender, tokenAmount);
        lastAccessTime[msg.sender] = block.timestamp + waitTime;
    }

    function allowedToWithdraw(address _address) public view returns (bool) {
        if (lastAccessTime[_address] == 0) {
            return true;
        } else if (block.timestamp >= lastAccessTime[_address]) {
            return true;
        }
        return false;
    }
}
