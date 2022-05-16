import { expect } from './chai-setup'
import hre, { ethers, deployments } from 'hardhat'

import { BigNumber } from 'ethers'
import { Address } from 'hardhat-deploy/types'

import { KombatGame, CryptoKombatCollectionEthereum, VombatToken } from '../typechain-types'

const FEE_BASE = BigNumber.from('10000')
const MINTER_ROLE = ethers.utils.id('MINTER_ROLE')
const AUTOMATION_ROLE = ethers.utils.id('AUTOMATION_ROLE')

type SetupParams = {
  deployer: Address
  treasure: Address
  alice: Address
  bob: Address
  vombat: VombatToken
  game: KombatGame
  collection: CryptoKombatCollectionEthereum
}

const setupTest = deployments.createFixture<SetupParams, unknown>(
  async ({ deployments, getNamedAccounts, getUnnamedAccounts, ethers }, options) => {
    await deployments.fixture('Game')

    // console.log('Deploying fixtures...')

    const { deployer } = await getNamedAccounts()
    const accounts = await getUnnamedAccounts()
    const treasure = accounts[0]
    const alice = accounts[1]
    const bob = accounts[2]

    hre.tracer.nameTags[ethers.constants.AddressZero] = 'Zero'
    hre.tracer.nameTags[deployer] = 'Deployer'
    hre.tracer.nameTags[treasure] = 'Treasure'
    hre.tracer.nameTags[alice] = 'Alice'
    hre.tracer.nameTags[bob] = 'Bob'

    const vombat = (await ethers.getContract('VombatToken', deployer)) as VombatToken
    const game = (await ethers.getContract('KombatGame', deployer)) as KombatGame
    const collection = (await ethers.getContract(
      'CryptoKombatCollectionEthereum',
      deployer
    )) as CryptoKombatCollectionEthereum

    hre.tracer.nameTags[vombat.address] = 'VOMBAT'
    hre.tracer.nameTags[game.address] = 'Game'
    hre.tracer.nameTags[collection.address] = 'Collection'

    await vombat.grantRole(MINTER_ROLE, game.address)

    await game.grantRole(AUTOMATION_ROLE, deployer)

    await collection.createBatch(
      [100, 100, 100, 100],
      [0, 0, 0, 0],
      [100, 100, 100, 100],
      ethers.constants.HashZero
    )

    return {
      deployer,
      treasure,
      alice,
      bob,
      vombat,
      game,
      collection,
    }
  }
)

context('KombatGame', () => {
  let _: SetupParams

  beforeEach(async () => {
    _ = await setupTest()
  })

  describe('#processPVEKombat()', async () => {
    it('should reward correct amounts', async () => {
      const struct: KombatGame.KombatStructStruct = {
        user: _.deployer,
        collection: _.collection.address,
        heroId: 1,
        consumables: [],
      }
      await _.game.processPVEKombat(1, struct, 0, true)
    })
  })
})
