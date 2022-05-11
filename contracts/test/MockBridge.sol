// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '../interfaces/ICollection.sol';

/**
 * @dev A simple mock bridge contract for use in local tests
 */
contract MockBridge {
    ICollection public collection;

    function setCollection(address _collection) external {
        collection = ICollection(_collection);
    }

    function mint(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) external {
        collection.mint(_to, _id, _amount, _data);
    }

    function mintBatch(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) external {
        collection.mintBatch(_to, _ids, _amounts, _data);
    }

    function burn(
        address _from,
        uint256 _id,
        uint256 _amount
    ) external {
        collection.burn(_from, _id, _amount);
    }

    function burnBatch(
        address _from,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) external {
        collection.burnBatch(_from, _ids, _amounts);
    }
}
