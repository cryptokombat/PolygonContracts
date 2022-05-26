// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './IBridgeNFT.sol';

/**
 * Required for ERC-1155 / ERC721A while transferring NFTs / SFTs in batches
 */

interface IBridgeNFTBatch is IBridgeNFT {
    function mintBatch(
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata mintArgs
    ) external;

    function burnBatchFor(
        address from,
        uint256[] calldata ids,
        uint256[] calldata amounts
    ) external;
}
