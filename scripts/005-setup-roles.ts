import hre from 'hardhat'
import { tokenToWei } from '../src/utils'

import {
  VombatToken,
  CryptoKombatCollectionEthereum,
  CryptoKombatCollectionBinance,
  CryptoKombatConsumables,
  KombatGame,
  KombatMarket,
} from '../typechain-types'

async function main() {
  const { getNamedAccounts, ethers } = hre
  const { deployer } = await getNamedAccounts()
  const signer = await ethers.getSigner(deployer)

  const vombatInstance = (await ethers.getContract('VombatToken', signer)) as VombatToken

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

  const gameInstance = (await ethers.getContract('KombatGame', signer)) as KombatGame
  const marketInstance = (await ethers.getContract('KombatMarket', signer)) as KombatMarket

  console.log('VombatToken instance loaded at %s', vombatInstance.address)
  console.log('CryptoKombatCollectionEthereum instance loaded at %s', ethCollectionInstance.address)
  console.log('CryptoKombatCollectionBinance instance loaded at %s', bscCollectionInstance.address)
  console.log('CryptoKombatConsumables instance loaded at %s', consumablesInstance.address)
  console.log('KombatGame instance loaded at %s', gameInstance.address)
  console.log('KombatMarket instance loaded at %s', marketInstance.address)

  const minterRole = ethers.utils.id('MINTER_ROLE')

  console.log(`[Vombat] Setting minter role for [KombatGame]:'${gameInstance.address}'`)
  await vombatInstance.grantRole(minterRole, gameInstance.address)

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
