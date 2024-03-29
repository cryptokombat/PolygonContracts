import hre from 'hardhat'

import {
  getBridgeMinter,
  getBscRootNetworkName,
  getCollectionPayload,
  getEthRootNetworkName,
} from '../src/config'
import { getCollectionData } from '../src/json'

async function setupCollection(collectionName: string, network: string): Promise<void> {
  const { getNamedAccounts, ethers, getChainId } = hre
  const { deployer } = await getNamedAccounts()
  const signer = await ethers.getSigner(deployer)

  const chainId = await getChainId()

  const collection = await ethers.getContract(collectionName, signer)
  console.log(`[${collectionName}] loaded at:`, collection.address)

  try {
    // Setup supply for the collection
    const data = await getCollectionData(network)
    const payload = getCollectionPayload(data)
    //console.log('payload', payload)

    const supply = await collection.maxSupply(1)
    if (supply.eq(0)) {
      console.log(`[${collectionName}] Creating new tokens...`)
      const tx = await collection.createBatch(
        payload.max,
        payload.reserved,
        payload.mint,
        ethers.constants.HashZero
      )
      console.log(`[${collectionName}] tx hash '${tx.hash}'...`)
    } else {
      console.log(`[${collectionName}] Creating skipped...`)
    }

    // Setup bridge role for the collection
    const bridgeRole = ethers.utils.id('BRIDGE_ROLE')
    const bridgeAddress = await getBridgeMinter(chainId)
    const hasBridgeRole = await collection.hasRole(bridgeRole, bridgeAddress)
    if (!hasBridgeRole) {
      console.log(`[${collectionName}] Setting minter role for bridge '${bridgeAddress}'...`)
      const tx = await collection.grantRole(bridgeRole, bridgeAddress)
      console.log(`[${collectionName}] tx hash '${tx.hash}'...`)
    }
  } catch (err: any) {
    console.log(`[${collectionName}] [Error] Failed to load collection data:`, err.message)
  }
}

async function main() {
  const { getChainId } = hre

  const chainId = await getChainId()

  const ethRootName = await getEthRootNetworkName(chainId)
  const bscRootName = await getBscRootNetworkName(chainId)

  await setupCollection('CryptoKombatCollectionEthereum', ethRootName)
  await setupCollection('CryptoKombatCollectionBinance', bscRootName)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
