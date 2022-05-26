// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * Required for ERC721 & ERC-721A while transaferring individual NFTs
 */
interface IBridgeNFT {
    function mint(
        address to,
        uint256 id,
        bytes calldata mintArgs
    ) external;

    function burnFor(address to, uint256 id) external;

    function baseURI() external returns (string memory);
}
