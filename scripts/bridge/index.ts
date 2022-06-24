import {
  ChainFactoryConfigs,
  ChainFactory,
  AppConfigs,
  NftMintArgs,
  Chain,
  Web3Helper,
  NftInfo,
} from 'xp.network'
import { config } from 'dotenv'
config()

// EVM chains compatible wallet:
import { Wallet } from 'ethers'
import { mint, transferNft, testnetConfig, nftList } from './utils'

import { getNftInfo, ContractType } from './types'

/**
 * Constants imported from the environment:
 */
const originContract: string = '0x611477c54F8f2dA620Ea0A3B44729929c6C91a27'
const targetContract: string = '0x4863C4af8669408b635CE089925c77d2D3902Db2'
const nftOwner: string = '0x97e4f195f4D29354Eb1406221D290F54418F4267'

const tokenTicker: string = 'CKC'
const contractName: string = 'Crypto Kombat Collection'

/**
 * Set the Constants before running:
 */
const nftCounter: number = 12
const uris: string[] = ['https://bsc-api.cryptokombat.com/hero']

/**
 * NFT Object
 */
let selected: NftInfo<any> = getNftInfo(
  // NFT Metadata URI
  uris[0],
  // Chain of departure nonce
  Chain.BSC.toString(),
  // NFT ID
  nftCounter.toString(),
  // NFT Owner
  nftOwner,
  // Original NFT smart contract
  originContract,
  // NFT contract token symbol
  tokenTicker,
  // Collection Name
  contractName,
  // Contract Type
  ContractType.ERC1155
)

;(async () => {
  // Flags for running parts of the script:
  const shallSelect = true
  const shallCheck = true
  const shallMint = false
  const shallApprove = true
  const shallTransfer = true

  // Creation of the testnet Factory
  const factory = ChainFactory(AppConfigs.TestNet(), await testnetConfig)

  // Initiating chain inner objects to manipulate with:
  const bsc = await factory.inner(Chain.BSC)
  const polygon = await factory.inner(Chain.POLYGON)

  if (shallSelect) {
    // ======== LISTING ==============================
    const listResult = await nftList(bsc, 'BSC Testnet', factory)
    selected = listResult.filter(({ native }) => native.tokenId !== '43')[0]

    console.log('Selected:', selected)

    if (shallCheck) {
      // ======== CHECKING ==============================
      console.log('isNftWhitelisted on BSC', await bsc.isNftWhitelisted(selected))
      console.log('isNftWhitelisted on PLG', await polygon.isNftWhitelisted(selected))

      let contracts = await factory.getVerifiedContracts(originContract, bsc.getNonce(), polygon.getNonce())
      console.log('Origin Verfied Contract', contracts)

      contracts = await factory.getVerifiedContracts(targetContract, bsc.getNonce(), polygon.getNonce())
      console.log('Target Verfied Contract', contracts)
    }
  }

  if (shallMint) {
    // ======== MINTING ==============================
    const mintingResult = await mint(bsc, uris, originContract, factory)
  }

  if (shallApprove) {
    // ==== APPROVING ============================
    const signer = new Wallet(process.env.BRIDGE_TEST_PK!, bsc.getProvider())
    const approved = await bsc.approveForMinter(selected, signer)
    console.log(`Approved: ${approved}`)
  }

  if (shallTransfer) {
    // ==== TRANSFERRING =========================
    const result = await transferNft(bsc, polygon, selected, factory, targetContract)
    console.log('Transfer result:', result)
  }

  process.exit(0)
})().catch((error: any) => {
  console.error('Error:', error)
  process.exit(1)
})
