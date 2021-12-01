import hre from 'hardhat'

import { EthCollection } from '../src/config'

import { CryptoKombatCollectionEthereum } from '../typechain-types'

async function main() {
  const { getNamedAccounts, ethers } = hre
  const { deployer } = await getNamedAccounts()
  const signer = await ethers.getSigner(deployer)

  const collectionInstance = (await ethers.getContract(
    'CryptoKombatCollectionEthereum',
    signer
  )) as CryptoKombatCollectionEthereum

  console.log('Collection instance loaded at %s', collectionInstance.address)

  const supply = await collectionInstance.maxSupply(1)
  const collection = EthCollection()

  if (supply.eq(0)) {
    console.log('[Collection] Minting new tokens...')
    await collectionInstance.createBatch(collection.amount, collection.initial, ethers.constants.HashZero)
  } else {
    console.log('[Collection] Minting skipped...')
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
