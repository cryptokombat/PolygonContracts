import hre from 'hardhat'

import { BscCollection } from '../src/config'

import { CryptoKombatCollectionBinance, KombatMarket } from '../typechain-types'

async function main() {
  const { getNamedAccounts, ethers } = hre
  const { deployer } = await getNamedAccounts()
  const signer = await ethers.getSigner(deployer)

  const collectionInstance = (await ethers.getContract(
    'CryptoKombatCollectionBinance',
    signer
  )) as CryptoKombatCollectionBinance
  const marketInstance = (await ethers.getContract('KombatMarket', signer)) as KombatMarket

  console.log('Collection instance loaded at %s', collectionInstance.address)
  console.log('Market instance loaded at %s', marketInstance.address)

  const supply = await collectionInstance.maxSupply(1)
  const minterRole = await collectionInstance.MINTER_ROLE()
  const collection = BscCollection()

  if (supply.eq(0)) {
    console.log('[Collection] Minting new tokens...')
    await collectionInstance.createBatch(collection.amount, collection.initial, ethers.constants.HashZero)

    console.log('[Collection] Setting minter role...')
    await collectionInstance.grantRole(minterRole, marketInstance.address)
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
