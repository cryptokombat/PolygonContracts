import hre from 'hardhat'

import { getCollectionStorageName, getMarketPayload } from '../src/config'
import { getCurrentData } from '../src/json'
import { KombatMarket } from '../typechain-types'

async function setupCollection(collectionName: string, prefix: string): Promise<void> {
  const { ethers, getNamedAccounts, getChainId } = hre

  const { deployer } = await getNamedAccounts()
  const signer = await ethers.getSigner(deployer)
  const minterRole = ethers.utils.id('MINTER_ROLE')
  const chainId = await getChainId()

  const collection = await ethers.getContract(collectionName, signer)
  const market = (await ethers.getContract('KombatMarket', signer)) as KombatMarket

  console.log(`[${collectionName}] Collection loaded at:`, collection.address)
  console.log(`[${collectionName}] Market loaded at:`, market.address)

  try {
    const storageName = await getCollectionStorageName(chainId, prefix)
    const data = await getCurrentData(storageName)
    const payload = getMarketPayload(data)

    console.log(`[${collectionName}] Setting token prices...`)
    //console.log('ids', payload.ids)
    //console.log('prices', payload.prices)

    await market.setPrice(collection.address, payload.ids, payload.prices)
  } catch (err: any) {
    console.log('[Error] Failed to load collection data:', err.message)
  }

  console.log(`[${collectionName}] Setting minter role for market...`)
  await collection.grantRole(minterRole, market.address)
}

async function main() {
  await setupCollection('CryptoKombatCollectionEthereum', 'ETH')
  await setupCollection('CryptoKombatCollectionBinance', 'BSC')
  //await setupCollection('CryptoKombatConsumables', 'CONS')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
