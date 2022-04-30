//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IRewardStaking {
    function stake(uint256 _amount) external;

    function unstake(uint256 _amount) external;

    function increaseReward(uint256 _amount) external;

    function getPendingReward(address _user) external view returns (uint256);
}
