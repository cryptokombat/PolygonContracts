// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library Error {
    /// Trying to set uint256 type variable to zero
    error ZeroUint();
    /// Trying to set address type variable to zero address
    error ZeroAddress();
    /// Input arrays length mismatch
    error ArrayMismatch();

    // --- Utility internal functions ---
    function _revertZeroUint(uint256 _uint) internal pure {
        if (_isZeroUint(_uint)) revert ZeroUint();
    }

    function _revertZeroAddress(address _address) internal pure {
        if (_isZeroAddress(_address)) revert ZeroAddress();
    }

    function _revertArrayMismatch(uint256[] memory _arr1, uint256[] memory _arr2) internal pure {
        if (_isArrayMismatch(_arr1, _arr2)) revert ArrayMismatch();
    }

    function _isZeroUint(uint256 _uint) internal pure returns (bool) {
        return _uint == 0;
    }

    function _isZeroAddress(address _address) internal pure returns (bool) {
        return _address == address(0);
    }

    function _isArrayMismatch(uint256[] memory _arr1, uint256[] memory _arr2) internal pure returns (bool) {
        return _arr1.length != _arr2.length;
    }
}
