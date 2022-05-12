//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IRootCollection {
    function balanceOf(address account, uint256 id) external view returns (uint256);

    function balanceOfBatch(address[] memory accounts, uint256[] memory ids)
        external
        view
        returns (uint256[] memory);

    function totalSupply(uint256 _id) external view returns (uint256);

    function maxSupply(uint256 _id) external view returns (uint256);

    function creators(uint256 _id) external view returns (address);

    function uri(uint256 _id) external view returns (string memory);
}
