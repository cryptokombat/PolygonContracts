import { expect } from './chai-setup'
import hre, { getNamedAccounts, getUnnamedAccounts, ethers, deployments } from 'hardhat'

import { BigNumber } from 'ethers'
import { Address } from 'hardhat-deploy/types'

import { CryptoKombatCollectionEthereum } from '../typechain-types'

const OVERFLOW_NUMBER = BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1))

const ADMIN_ROLE = ethers.utils.id('ADMIN_ROLE')
const MINTER_ROLE = ethers.utils.id('MINTER_ROLE')
const DEPOSITOR_ROLE = ethers.utils.id('DEPOSITOR_ROLE')
const zeroData = ethers.constants.HashZero
const zeroAddress = ethers.constants.AddressZero
const abiEcnoder = new ethers.utils.AbiCoder()

const depositData = (ids: number[], amounts: number[]) => {
  const data = abiEcnoder.encode(['uint256[]', 'uint256[]', 'bytes'], [ids, amounts, zeroData])
  return data
}

const token1 = 1
const token2 = 2
const token3 = 3
const token4 = 4
const token5 = 5

const setupTest = deployments.createFixture(async ({ deployments, getNamedAccounts, ethers }, options) => {
  await deployments.fixture()
  const { deployer } = await getNamedAccounts()
  const accounts = await getUnnamedAccounts()
  const collection = (await ethers.getContract(
    'CryptoKombatCollectionEthereum',
    deployer
  )) as CryptoKombatCollectionEthereum

  // ID=1, create NFT with 10 max supply, 5 original supply and 0 total supply
  await collection.create(10, 5, 0, ethers.constants.HashZero)

  // ID=2, create NFT with 10 max supply, 10 original supply and 0 total supply
  await collection.create(10, 5, 0, ethers.constants.HashZero)

  // ID=3, create NFT with 10 max supply, 0 original supply and 10 total supply
  await collection.create(10, 0, 10, ethers.constants.HashZero)

  // ID=4, create NFT with 10 max supply, 0 original supply and 0 total supply
  await collection.create(10, 0, 10, ethers.constants.HashZero)

  await collection.grantRole(DEPOSITOR_ROLE, accounts[0])
})

describe('ChildERC1155Preset - ERC1155Tradable', () => {
  let deployer: Address
  let bridge: Address
  let alice: Address
  let bob: Address
  let collection: CryptoKombatCollectionEthereum
  let connected: CryptoKombatCollectionEthereum

  before(async () => {
    await setupTest()

    deployer = (await getNamedAccounts()).deployer
    const accounts = await getUnnamedAccounts()

    bridge = accounts[0]
    alice = accounts[1]
    bob = accounts[2]

    collection = await ethers.getContract('CryptoKombatCollectionEthereum')
    connected = collection.connect(await ethers.getSigner(bridge))

    hre.tracer.nameTags[zeroAddress] = 'Zero'
    hre.tracer.nameTags[deployer] = 'Deployer'
    hre.tracer.nameTags[bridge] = 'Bridge'
    hre.tracer.nameTags[alice] = 'Alice'
    hre.tracer.nameTags[bob] = 'Bob'
    hre.tracer.nameTags[collection.address] = 'Collection'
  })

  describe('#deposit()', async () => {
    it('bridge can mint tokens', async () => {
      await expect(connected.deposit(alice, depositData([token1], [1])))
        .to.emit(connected, 'TransferBatch')
        .withArgs(bridge, zeroAddress, alice, [token1], [1])

      expect(await connected.totalSupply(token1)).to.be.equal(1)
      expect(await connected.maxSupply(token1)).to.be.equal(10)
      expect(await connected.balanceOf(alice, token1)).to.be.equal(1)
    })

    it('cannot mint more then max supply', async () => {
      await expect(connected.deposit(alice, depositData([token1], [999]))).to.be.revertedWith('!max')
    })

    it('non-bridge can not mint tokens', async () => {
      await expect(collection.deposit(alice, depositData([token1], [1]))).to.be.revertedWith('!access')
    })

    it('cannot mint non existent token', async () => {
      await expect(connected.deposit(alice, depositData([999], [1]))).to.be.revertedWith('!max')
    })
  })
  describe('#deposit()', async () => {
    it('bridge can mint tokens', async () => {
      await expect(connected.deposit(alice, depositData([token1], [1])))
        .to.emit(connected, 'TransferBatch')
        .withArgs(bridge, zeroAddress, alice, [token1], [1])

      expect(await connected.totalSupply(token1)).to.be.equal(1)
      expect(await connected.maxSupply(token1)).to.be.equal(10)
      expect(await connected.balanceOf(alice, token1)).to.be.equal(1)
    })

    it('cannot mint more then max supply', async () => {
      await expect(connected.deposit(alice, depositData([token1], [999]))).to.be.revertedWith('!max')
    })

    it('non-bridge can not mint tokens', async () => {
      await expect(collection.deposit(alice, depositData([token1], [1]))).to.be.revertedWith('!access')
    })

    it('cannot mint non existent token', async () => {
      await expect(connected.deposit(alice, depositData([999], [1]))).to.be.revertedWith('!max')
    })
  })
})
