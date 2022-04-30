//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/utils/Context.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/utils/math/Math.sol';

import '../interfaces/IVombat.sol';
import '../interfaces/IRewardStaking.sol';

contract RewardStaking is Context, Ownable, EIP712, IRewardStaking {
    using SafeERC20 for IERC20;

    uint256 internal constant DECIMAL_PRECISION = 1e18;

    mapping(address => uint256) public stakes;
    uint256 public totalStaked;

    uint256 public F_REWARD; // Running sum of reward tokens per tokens staked

    // User snapshots of F_REWARD, taken at the point at which their latest deposit was made
    mapping(address => uint256) public snapshots;

    IERC20 public stakeToken;
    IERC20 public rewardToken;

    address public rewarder;

    // --- Events ---

    event StakeChanged(address indexed _staker, uint256 _stake);
    event StakingRewardWithdrawn(address indexed _staker, uint256 _reward);
    event F_RewardUpdated(uint256 _F_REWARD);
    event TotalStakedUpdated(uint256 _amount);
    event StakerSnapshotsUpdated(address _staker, uint256 _F_REWARD);

    constructor(
        address _stakeToken,
        address _rewardToken,
        address _rewarder
    ) EIP712('RewardStaking', '1') {
        stakeToken = IERC20(_stakeToken);
        rewardToken = IERC20(_rewardToken);
        rewarder = _rewarder;
    }

    // --- Functions ---

    // If caller has a pre-existing stake, send any accumulated rewards to them.
    function stake(uint256 _amount) external override {
        _requireNonZeroAmount(_amount);

        uint256 currentStake = stakes[_msgSender()];

        uint256 rewardAmount;

        _updateUserSnapshots(_msgSender());

        uint256 newStake = currentStake + _amount;

        // Increase user’s stake and total staked
        stakes[_msgSender()] = newStake;
        totalStaked = totalStaked + _amount;

        emit TotalStakedUpdated(totalStaked);

        // Transfer stake token from caller to this contract
        stakeToken.safeTransferFrom(_msgSender(), address(this), _amount);

        emit StakeChanged(_msgSender(), newStake);

        // Send accumulated rewards to the caller
        if (currentStake != 0) {
            // Grab any accumulated rewards from the current stake
            rewardAmount = _getPendingReward(_msgSender());
            rewardToken.safeTransfer(_msgSender(), rewardAmount);
            emit StakingRewardWithdrawn(_msgSender(), rewardAmount);
        }
    }

    // Unstake the stake token and send the it back to the caller, along with their accumulated rewards.
    // If requested amount > stake, send their entire stake.
    function unstake(uint256 _amount) external override {
        uint256 currentStake = stakes[_msgSender()];
        _requireUserHasStake(currentStake);

        // Grab any accumulated rewards from the current stake
        uint256 rewardAmount = _getPendingReward(_msgSender());

        _updateUserSnapshots(_msgSender());

        if (_amount > 0) {
            uint256 unstakeAmount = Math.min(_amount, currentStake);

            uint256 newStake = currentStake - unstakeAmount;

            // Decrease user's stake and total LQTY staked
            stakes[_msgSender()] = newStake;
            totalStaked = totalStaked - unstakeAmount;

            emit TotalStakedUpdated(totalStaked);

            // Transfer unstaked LQTY to user
            stakeToken.safeTransfer(_msgSender(), unstakeAmount);

            emit StakeChanged(_msgSender(), newStake);
        }

        // Send accumulated LUSD and ETH gains to the caller
        rewardToken.transfer(_msgSender(), rewardAmount);
        emit StakingRewardWithdrawn(_msgSender(), rewardAmount);
    }

    // --- Reward-per-unit-staked increase functions. Called by rewarder ---

    function increaseReward(uint256 _amount) external override {
        _requireCallerIsRewarder();
        uint256 rewardPerTokenStaked;

        if (totalStaked > 0) {
            rewardPerTokenStaked = (_amount * DECIMAL_PRECISION) / totalStaked;
        }

        F_REWARD = F_REWARD + rewardPerTokenStaked;
        emit F_RewardUpdated(F_REWARD);
    }

    // --- Pending reward functions ---

    function getPendingReward(address _user) external view override returns (uint256) {
        return _getPendingReward(_user);
    }

    function _getPendingReward(address _user) internal view returns (uint256) {
        uint256 userSnapshot = snapshots[_user];
        uint256 reward = (stakes[_user] * (F_REWARD - userSnapshot)) / DECIMAL_PRECISION;
        return reward;
    }

    // --- Internal helper functions ---

    function _updateUserSnapshots(address _user) internal {
        snapshots[_user] = F_REWARD;
        emit StakerSnapshotsUpdated(_user, F_REWARD);
    }

    // --- 'require' functions ---

    function _requireCallerIsRewarder() internal view {
        require(_msgSender() == rewarder, '!rewarder');
    }

    function _requireUserHasStake(uint256 currentStake) internal pure {
        require(currentStake > 0, '!stake');
    }

    function _requireNonZeroAmount(uint256 _amount) internal pure {
        require(_amount > 0, '!amount');
    }
}
