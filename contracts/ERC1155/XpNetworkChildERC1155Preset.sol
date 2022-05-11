// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/utils/Context.sol';
import './ERC1155Preset.sol';

contract XpNetworkChildERC1155Preset is ERC1155Preset {
    bytes32 public constant BRIDGE_ROLE = keccak256('BRIDGE_ROLE');

    // --- Errors ---

    /// Transaction `from` or `to` zero address
    error BridgeErrorZeroUser();

    /// Collection is not approved to _msgSender()
    error BridgeErrorNotApproved();

    /// Not same arrays length
    error BridgeErrorLengthMistmach();

    /// Token id doesn't exists
    /// @param tokenId token id.
    error BridgeErrorNotExists(uint256 tokenId);

    /// Token id max amount underflow
    error BridgeErrorMaxUnderflow();

    /// Token id reserved amount underflow
    error BridgeErrorReservedUnderflow();

    /// Token id total amount overflow
    error BridgeErrorTotalOverflow();

    /// Token id bridged amount overflow
    error BridgeErrorBridgedOverflow();

    constructor(
        string memory name,
        string memory symbol,
        string memory _baseUri,
        address _proxy
    ) ERC1155Preset(name, symbol, _baseUri, _proxy) {}

    function mint(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) public override {
        if (hasRole(BRIDGE_ROLE, _msgSender())) {
            _checkZeroAddress(_to);

            _checkBridgeMint(_id, _amount);

            _totalSupply[_id] += _amount;
            _bridgedSupply[_id] += _amount;

            _mint(_to, _id, _amount, _data);
        } else {
            super.mint(_to, _id, _amount, _data);
        }
    }

    function mintBatch(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) public override {
        if (hasRole(BRIDGE_ROLE, _msgSender())) {
            _checkZeroAddress(_to);
            _checkLength(_ids, _amounts);

            for (uint256 i = 0; i < _ids.length; i++) {
                uint256 id = _ids[i];
                uint256 amount = _amounts[i];

                _checkBridgeMint(id, amount);

                _totalSupply[id] += amount;
                _bridgedSupply[id] += amount;
            }

            _mintBatch(_to, _ids, _amounts, _data);
        } else {
            super.mintBatch(_to, _ids, _amounts, _data);
        }
    }

    function burn(
        address _from,
        uint256 _id,
        uint256 _amount
    ) public override {
        if (hasRole(BRIDGE_ROLE, _msgSender())) {
            _checkApproved(_from, _msgSender());

            _checkBridgeBurn(_id, _amount);

            _totalSupply[_id] -= _amount;
            _bridgedSupply[_id] -= _amount;

            _burn(_from, _id, _amount);
        } else {
            super.burn(_from, _id, _amount);
        }
    }

    function burnBatch(
        address _from,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) public override {
        if (hasRole(BRIDGE_ROLE, _msgSender())) {
            _checkApproved(_from, _msgSender());
            _checkLength(_ids, _amounts);

            for (uint256 i = 0; i < _ids.length; i++) {
                uint256 id = _ids[i];
                uint256 amount = _amounts[i];

                _checkBridgeBurn(id, amount);

                _totalSupply[id] -= amount;
                _bridgedSupply[id] -= amount;
            }

            _burnBatch(_from, _ids, _amounts);
        } else {
            super.burnBatch(_from, _ids, _amounts);
        }
    }

    function _checkZeroAddress(address _address) internal pure {
        if (_address == address(0)) revert BridgeErrorZeroUser();
    }

    function _checkLength(uint256[] memory _first, uint256[] memory _second) internal pure {
        if (_first.length != _second.length) revert BridgeErrorLengthMistmach();
    }

    function _checkApproved(address _from, address _operator) internal view {
        if (!isApprovedForAll(_from, _operator)) revert BridgeErrorNotApproved();
    }

    function _checkExists(uint256 _id) internal view {
        if (!_exists(_id)) revert BridgeErrorNotExists(_id);
    }

    function _checkBridgeMint(uint256 _id, uint256 _amount) internal view {
        _checkExists(_id);

        if (_maxSupply[_id] < _totalSupply[_id] + _amount) revert BridgeErrorMaxUnderflow();
        if (_reservedSupply[_id] < _bridgedSupply[_id] + _amount) revert BridgeErrorReservedUnderflow();
    }

    function _checkBridgeBurn(uint256 _id, uint256 _amount) internal view {
        _checkExists(_id);

        if (_totalSupply[_id] < _amount) revert BridgeErrorTotalOverflow();
        if (_bridgedSupply[_id] < _amount) revert BridgeErrorBridgedOverflow();
    }
}
