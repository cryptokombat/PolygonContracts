// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';

import '../lib/Error.sol';
import '../interfaces/ICollection.sol';
import '../interfaces/IRewardToken.sol';

contract KombatGame is Initializable, AccessControlUpgradeable, EIP712Upgradeable {
    using SafeERC20Upgradeable for IRewardToken;

    // --- Constants  ---
    // Can define constants for Upgradable contract
    bytes32 public constant AUTOMATION_ROLE = keccak256('AUTOMATION_ROLE');
    uint256 public constant BASE_BP = 10000;

    // --- Structs  ---
    // Struct to pass kombat data to processors
    struct KombatStruct {
        address user;
        address collection;
        uint256 heroId;
        uint256[] consumables;
        uint256[] amounts;
        // add storage gap so we can add more variables to the struct in the future
        // we can add up to 5 variables each 32 bytes length
        uint256[5] __gap;
    }

    // --- State variables  ---
    // reward token rewardToken
    IRewardToken public rewardToken;
    // reward amount for distributeReward
    uint256 public rewardAmount;
    // winner share, all in basis points
    uint256 public wShare;
    // stakingContract contract share
    uint256 public sShare;
    // location owner share
    uint256 public lShare;
    // staking contract address
    address public stakingContract;
    // treasure address
    address public treasure;

    // collections
    ICollection public ethCollection;
    ICollection public bscCollection;
    ICollection public consCollection;
    IERC721Upgradeable public locationCollection;

    // NOTE: Add more variables after all

    // --- Events  ---
    event RewardSet(address indexed token, uint256 indexed amount);
    event ShareSet(uint256 indexed wShare, uint256 indexed sShare, uint256 indexed lShare);
    event CollectionSet(address indexed eth, address indexed bsc, address indexed cons, address loc);
    event StakingSet(address indexed staking);
    event TreasureSet(address indexed treasure);
    event PVPKombat(uint256 indexed kombatId, address indexed winner, address indexed loser);
    event PVEKombat(uint256 indexed kombatId, address indexed user, bool indexed isWin);

    // --- Errors ---

    /// Invalid shares set, sum should be eq BASE_BP
    error InvalidShare();
    /// User in kombat not an owner of the hero
    error HeroNotOwned();

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    // --- Initializer  ---
    function initialize(
        address _token,
        uint256 _amount,
        uint256 _wShare,
        uint256 _sShare,
        uint256 _lShare,
        address _staking,
        address _treasure,
        address _eth,
        address _bsc,
        address _cons,
        address _loc
    ) public virtual initializer {
        __AccessControl_init();
        __EIP712_init('KombatGame', 'v1');

        _setupReward(_token, _amount);
        _setupShares(_wShare, _sShare, _lShare);
        _setupStaking(_staking);
        _setupTreasure(_treasure);
        _setupCollections(_eth, _bsc, _loc, _cons);

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    // --- Admin external functions  ---
    function setReward(address _token, uint256 _amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setupReward(_token, _amount);
    }

    function setShares(
        uint256 _wShare,
        uint256 _sShare,
        uint256 _lShare
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setupShares(_wShare, _sShare, _lShare);
    }

    function setCollections(
        address _eth,
        address _bsc,
        address _loc,
        address _cons
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setupCollections(_eth, _bsc, _loc, _cons);
    }

    function setStaking(address _staking) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setupStaking(_staking);
    }

    function setTreasure(address _treasure) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setupTreasure(_treasure);
    }

    // --- Automation external functions  ---
    function processPVPKombat(
        uint256 kombatId,
        KombatStruct memory winner,
        KombatStruct memory loser,
        uint256 locationId
    ) external onlyRole(AUTOMATION_ROLE) {
        _revertUserBalance(winner.collection, winner.user, winner.heroId);
        _revertUserBalance(loser.collection, loser.user, loser.heroId);

        _processConsumables(winner.user, winner.consumables, winner.amounts);
        _processConsumables(loser.user, loser.consumables, loser.amounts);

        _distributeReward(winner.user, locationId);

        emit PVPKombat(kombatId, winner.user, loser.user);
    }

    function processPVEKombat(
        uint256 kombatId,
        KombatStruct memory player,
        uint256 locationId,
        bool win
    ) external onlyRole(AUTOMATION_ROLE) {
        _revertUserBalance(player.collection, player.user, player.heroId);
        _processConsumables(player.user, player.consumables, player.amounts);

        if (win) {
            _distributeReward(player.user, locationId);
        }
        emit PVEKombat(kombatId, player.user, win);
    }

    // --- Other external functions  ---
    /**
     * @dev See {EIP712-DOMAIN_SEPARATOR}.
     */
    // solhint-disable-next-line func-name-mixedcase
    function DOMAIN_SEPARATOR() external view returns (bytes32) {
        return _domainSeparatorV4();
    }

    // --- Internal functions  ---
    function _revertUserBalance(
        address _collection,
        address _user,
        uint256 _hero
    ) internal view {
        Error._revertZeroAddress(_collection);
        Error._revertZeroAddress(_user);
        Error._revertZeroUint(_hero);

        if (ICollection(_collection).balanceOf(_user, _hero) <= 0) revert HeroNotOwned();
    }

    function _processConsumables(
        address _user,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) internal {
        Error._revertZeroAddress(_user);
        Error._revertArrayMismatch(_ids, _amounts);

        if (_ids.length > 0) {
            consCollection.burnBatch(_user, _ids, _amounts);
        }
    }

    function _distributeReward(address _user, uint256 _location) internal {
        uint256 wAmount = (rewardAmount * wShare) / BASE_BP;
        uint256 sAmount = (rewardAmount * sShare) / BASE_BP;
        uint256 lAmount = (rewardAmount * lShare) / BASE_BP;

        // Treasure amount, all leftovers will be send to the treasures address
        uint256 tAmount = 0;

        // If staking contract is not defined add reward to treasure
        if (!Error._isZeroAddress(stakingContract)) {
            _mintOrTransfer(stakingContract, sAmount);
        } else {
            tAmount += sAmount;
        }

        // Add reward to the treasure if:
        // - location not set for kombat
        // - location collection is not defined
        // - there is no owner for set location
        // otherwise send reward to the owner of the location

        if (!Error._isZeroAddress(address(locationCollection))) {
            try locationCollection.ownerOf(_location) returns (address owner) {
                _mintOrTransfer(owner, lAmount);
            } catch (bytes memory) {
                tAmount += lAmount;
            }
        } else {
            tAmount += lAmount;
        }

        // if treasure address set up and amount > 0 then send rewards to
        // the treasure, otherwise add it to the winner amount
        if (!Error._isZeroAddress(treasure) && tAmount > 0) {
            _mintOrTransfer(treasure, tAmount);
        } else {
            wAmount += tAmount;
        }

        if (wAmount > 0) _mintOrTransfer(_user, wAmount);
    }

    function _mintOrTransfer(address to, uint256 amount) internal {
        if (rewardToken.balanceOf(address(this)) < amount) {
            rewardToken.mint(to, amount);
        } else {
            rewardToken.safeTransferFrom(address(this), to, amount);
        }
    }

    function _setupReward(address _token, uint256 _amount) internal {
        Error._revertZeroAddress(_token);

        rewardToken = IRewardToken(_token);
        rewardAmount = _amount;
        emit RewardSet(_token, _amount);
    }

    function _setupShares(
        uint256 _wShare,
        uint256 _sShare,
        uint256 _lShare
    ) internal {
        if (_wShare + _sShare + _lShare != BASE_BP) revert InvalidShare();
        wShare = _wShare;
        sShare = _sShare;
        lShare = _lShare;
        emit ShareSet(_wShare, _sShare, _lShare);
    }

    function _setupStaking(address _address) internal {
        //Error._revertZeroAddress(_address);
        stakingContract = _address;
        emit StakingSet(_address);
    }

    function _setupTreasure(address _address) internal {
        //Error._revertZeroAddress(_address);
        treasure = _address;
        emit TreasureSet(_address);
    }

    function _setupCollections(
        address _eth,
        address _bsc,
        address _loc,
        address _cons
    ) internal {
        Error._revertZeroAddress(_eth);
        Error._revertZeroAddress(_bsc);
        //Error._revertZeroAddress(_loc);
        //Error._revertZeroAddress(_cons);

        ethCollection = ICollection(_eth);
        bscCollection = ICollection(_bsc);
        consCollection = ICollection(_cons);
        locationCollection = IERC721Upgradeable(_loc);
        emit CollectionSet(_eth, _bsc, _cons, _loc);
    }

    // --- Utility internal functions ---
    function _fillArray(uint256 _l, uint256 _v) internal pure returns (uint256[] memory result) {
        result = new uint256[](_l);
        for (uint256 i = 0; i < _l; i++) {
            result[i] = _v;
        }
    }
}
