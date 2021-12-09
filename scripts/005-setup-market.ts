import hre from 'hardhat'

import {
  CryptoKombatCollectionEthereum,
  CryptoKombatCollectionBinance,
  CryptoKombatConsumables,
  KombatMarket,
} from '../typechain-types'

async function main() {
  const { getNamedAccounts, ethers } = hre
  const { deployer } = await getNamedAccounts()
  const signer = await ethers.getSigner(deployer)

  const ethCollectionInstance = (await ethers.getContract(
    'CryptoKombatCollectionEthereum',
    signer
  )) as CryptoKombatCollectionEthereum

  const bscCollectionInstance = (await ethers.getContract(
    'CryptoKombatCollectionBinance',
    signer
  )) as CryptoKombatCollectionBinance

  const consumablesInstance = (await ethers.getContract(
    'CryptoKombatConsumables',
    signer
  )) as CryptoKombatConsumables

  const marketInstance = (await ethers.getContract('KombatMarket', signer)) as KombatMarket

  console.log('CryptoKombatCollectionEthereum instance loaded at %s', ethCollectionInstance.address)
  console.log('CryptoKombatCollectionBinance instance loaded at %s', bscCollectionInstance.address)
  console.log('CryptoKombatConsumables instance loaded at %s', consumablesInstance.address)
  console.log('KombatMarket instance loaded at %s', marketInstance.address)

  const minterRole = ethers.utils.id('MINTER_ROLE')

  console.log(`[CollectionEth] Setting minter role for [KombatMarket]:'${ethCollectionInstance.address}'`)
  await ethCollectionInstance.grantRole(minterRole, marketInstance.address)

  console.log(`[CollectionBsc] Setting minter role for [KombatMarket]:'${bscCollectionInstance.address}'`)
  await bscCollectionInstance.grantRole(minterRole, marketInstance.address)

  console.log(`[Consumables] Setting minter role for [KombatMarket]:'${bscCollectionInstance.address}'`)
  await consumablesInstance.grantRole(minterRole, marketInstance.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
