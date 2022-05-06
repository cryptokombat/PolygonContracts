import { expect } from './chai-setup'
import hre, { getNamedAccounts, getUnnamedAccounts, ethers, deployments } from 'hardhat'

import { BigNumber } from 'ethers'
import { Address } from 'hardhat-deploy/types'

import { TestERC20, KombatGame, CryptoKombatCollectionEthereum, VombatToken } from '../typechain-types'

const FEE_BASE = BigNumber.from('10000')
const MINTER_ROLE = ethers.utils.id('MINTER_ROLE')
const AUTOMATION_ROLE = ethers.utils.id('AUTOMATION_ROLE')

const setupTest = deployments.createFixture(async ({ deployments, getNamedAccounts, ethers }, options) => {
  await deployments.fixture()
  const { deployer } = await getNamedAccounts()
  const vombat = (await ethers.getContract('VombatToken', deployer)) as VombatToken
  const game = (await ethers.getContract('KombatGame', deployer)) as KombatGame
  const collection = (await ethers.getContract(
    'CryptoKombatCollectionEthereum',
    deployer
  )) as CryptoKombatCollectionEthereum

  await vombat.grantRole(MINTER_ROLE, game.address)

  await game.grantRole(AUTOMATION_ROLE, deployer)

  await collection.createBatch(
    [100, 100, 100, 100],
    [0, 0, 0, 0],
    [100, 100, 100, 100],
    ethers.constants.HashZero
  )
})

context('KombatGame', () => {
  let deployer: Address
  let feeRecipient: Address
  let game: KombatGame
  let ethCollection: CryptoKombatCollectionEthereum

  before(async () => {
    await setupTest()

    deployer = (await getNamedAccounts()).deployer
    const accounts = await getUnnamedAccounts()

    feeRecipient = accounts[0]

    hre.tracer.nameTags[ethers.constants.AddressZero] = 'Zero'
    hre.tracer.nameTags[deployer] = 'Deployer'
    hre.tracer.nameTags[feeRecipient] = 'FeeRecipient'

    game = await ethers.getContract('KombatGame')
    ethCollection = await ethers.getContract('CryptoKombatCollectionEthereum')
  })

  describe('#processPVEKombat()', async () => {
    it('should reward correct amounts', async () => {
      const struct: KombatGame.KombatStructStruct = {
        user: deployer,
        collection: ethCollection.address,
        heroId: 1,
        consumables: [],
      }
      await game.processPVEKombat(1, struct, 0, true)
    })
  })
})
