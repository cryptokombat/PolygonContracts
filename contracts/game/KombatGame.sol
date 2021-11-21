// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';

import '../interfaces/ICollection.sol';
import '../interfaces/IVombat.sol';

contract KombatGame is AccessControl, ReentrancyGuard, EIP712 {
    bytes32 public constant AUTOMATION_ROLE = keccak256('AUTOMATION_ROLE');

    using SafeERC20 for IVombat;

    struct KombatStruct {
        address user;
        address collection;
        uint256 heroId;
        uint256[] consumables;
    }

    uint256 public constant BASE_BP = 10000;

    uint256 public winnerShare = 6000;
    uint256 public stakerShare = 3000;
    uint256 public arenaShare = 4000;

    IVombat public immutable vombat;

    address public treasure;

    ICollection public immutable collectionEth;
    ICollection public immutable collectionBsc;
    ICollection public immutable consumables;
    IERC721 public immutable arenas;

    address public stakingContract;

    //1 Vombat default reward
    uint256 public winReward = 1e18;

    event SharesSet(uint256 indexed winnerShare, uint256 indexed stakerShare, uint256 indexed arenaShare);
    event PVPKombat(address indexed winner, address indexed loser);

    modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), '!admin');
        _;
    }

    modifier onlyAutomation() {
        require(hasRole(AUTOMATION_ROLE, _msgSender()), '!automation');
        _;
    }

    constructor(
        IVombat _vombat,
        address _treasure,
        ICollection _collectionEth,
        ICollection _collectionBsc,
        ICollection _consumables,
        IERC721 _arena,
        address _staking
    ) EIP712('Kombat Game', '1') {
        vombat = _vombat;
        treasure = _treasure;
        collectionEth = _collectionEth;
        collectionBsc = _collectionBsc;
        consumables = _consumables;
        arenas = _arena;
        stakingContract = _staking;
    }

    function setTreasure(address _treasure) external onlyAdmin {
        require(_treasure != address(0), '!address');
        treasure = _treasure;
    }

    function setWinReward(uint256 _winReward) external onlyAdmin {
        require(_winReward > 0, '!zero');
        winReward = _winReward;
    }

    function setShares(
        uint256 _winnerShare,
        uint256 _stakerShare,
        uint256 _arenaShare
    ) external onlyAdmin {
        require(_winnerShare + _stakerShare + _arenaShare == BASE_BP, '!share');
        winnerShare = _winnerShare;
        stakerShare = _stakerShare;
        arenaShare = _arenaShare;
        emit SharesSet(_winnerShare, _stakerShare, _arenaShare);
    }

    function processPVPKombat(
        KombatStruct memory winner,
        KombatStruct memory loser,
        uint256 arenaId
    ) external onlyAutomation {
        ICollection wCollection = ICollection(winner.collection);
        ICollection lCollection = ICollection(loser.collection);

        require(wCollection.balanceOf(winner.user, winner.heroId) > 0, '!owner');
        require(lCollection.balanceOf(loser.user, loser.heroId) > 0, '!owner');

        if (winner.consumables.length > 0) {
            consumables.burnBatch(winner.user, winner.consumables, fillArray(winner.consumables.length, 1));
        }

        if (loser.consumables.length > 0) {
            consumables.burnBatch(loser.user, loser.consumables, fillArray(loser.consumables.length, 1));
        }

        distributeReward(winner.user, arenaId);

        emit PVPKombat(winner.user, loser.user);
    }

    function distributeReward(address user, uint256 arenaId) internal {
        uint256 wonAmount = (winReward * BASE_BP) / winnerShare;
        uint256 stakeAmount = (winReward * BASE_BP) / stakerShare;
        uint256 arenaAmount = (winReward * BASE_BP) / stakerShare;

        address arenaOwner = arenas.ownerOf(arenaId);

        mintOrTransfer(user, wonAmount);
        mintOrTransfer(stakingContract, stakeAmount);

        if (arenaOwner != address(0)) {
            mintOrTransfer(arenaOwner, arenaAmount);
        } else {
            mintOrTransfer(treasure, arenaAmount);
        }
    }

    function mintOrTransfer(address to, uint256 amount) internal {
        if (vombat.balanceOf(address(this)) < amount) {
            vombat.mint(to, amount);
        } else {
            vombat.safeTransferFrom(address(this), to, amount);
        }
    }

    function fillArray(uint256 _l, uint256 _v) internal pure returns (uint256[] memory result) {
        result = new uint256[](_l);
        for (uint256 i = 0; i < _l; i++) {
            result[i] = _v;
        }
    }
}
