import { expect } from './chai-setup'
import hre, { getNamedAccounts, getUnnamedAccounts, ethers, deployments } from 'hardhat'

import { Address } from 'hardhat-deploy/types'

import { CryptoKombatCollectionEthereum } from '../typechain-types'

const DEPOSITOR_ROLE = ethers.utils.id('DEPOSITOR_ROLE')
const zeroData = ethers.constants.HashZero
const zeroAddress = ethers.constants.AddressZero
const abiEcnoder = new ethers.utils.AbiCoder()

const depositData = (ids: number[], amounts: number[]) => {
  const data = abiEcnoder.encode(['uint256[]', 'uint256[]', 'bytes'], [ids, amounts, zeroData])
  return data
}

const TOKEN_ID = 1
const NON_EXISTENT_TOKEN_ID = 999

const CASES: Args[] = [
  {
    max: 10,
    reserved: 5,
    supply: 0,
  },
  {
    max: 10,
    reserved: 0,
    supply: 5,
  },

  {
    max: 10,
    reserved: 10,
    supply: 0,
  },
  {
    max: 10,
    reserved: 0,
    supply: 10,
  },
  {
    max: 10,
    reserved: 3,
    supply: 3,
  },
  {
    max: 10,
    reserved: 1,
    supply: 0,
  },
  {
    max: 10,
    reserved: 2,
    supply: 8,
  },
  {
    max: 10,
    reserved: 6,
    supply: 3,
  },
  {
    max: 100,
    reserved: 45,
    supply: 5,
  },
  {
    max: 1000,
    reserved: 555,
    supply: 66,
  },
]
type Args = {
  max: number
  reserved: number
  supply: number
}

const getTestCaseName = (index: number, { max, reserved, supply }: Args) => {
  return `CASE ${
    index + 1
  }: NFT with ${max} max supply, ${reserved} reserved supply and ${supply} total supply`
}

describe('ChildERC1155Preset - ERC1155Tradable', () => {
  let deployer: Address
  let bridge: Address
  let alice: Address
  let bob: Address
  let collection: CryptoKombatCollectionEthereum
  let connectedBridge: CryptoKombatCollectionEthereum

  before(async () => {
    deployer = (await getNamedAccounts()).deployer
    const accounts = await getUnnamedAccounts()

    bridge = accounts[0]
    alice = accounts[1]
    bob = accounts[2]

    hre.tracer.nameTags[zeroAddress] = 'Zero'
    hre.tracer.nameTags[deployer] = 'Deployer'
    hre.tracer.nameTags[bridge] = 'Bridge'
    hre.tracer.nameTags[alice] = 'Alice'
    hre.tracer.nameTags[bob] = 'Bob'
  })

  beforeEach(async () => {
    const accounts = await getUnnamedAccounts()

    const ProxyContract = await ethers.getContractFactory('MockProxyRegistry')
    const proxy = await ProxyContract.deploy()

    const CollectionContract = await ethers.getContractFactory('CryptoKombatCollectionEthereum')
    collection = (await CollectionContract.deploy('', proxy.address)) as CryptoKombatCollectionEthereum

    // setup bridge
    bridge = accounts[0]
    connectedBridge = collection.connect(await ethers.getSigner(bridge))
    await collection.grantRole(DEPOSITOR_ROLE, bridge)

    hre.tracer.nameTags[collection.address] = 'Collection'
  })

  CASES.forEach((args, index) => {
    describe(getTestCaseName(index, args), () => {
      const canMint = args.max - args.reserved - args.supply
      const bridgeCanMint = args.reserved

      let connectedAlice: CryptoKombatCollectionEthereum
      // before(() => {
      //   console.log('canMint', canMint)
      //   console.log('bridgeCanMint', bridgeCanMint)
      // })

      beforeEach(async () => {
        await collection.create(args.max, args.reserved, args.supply, ethers.constants.HashZero)
        connectedAlice = await collection.connect(await ethers.getSigner(alice))
      })

      it('cannot mint non existent token', async () => {
        await expect(collection.mint(alice, NON_EXISTENT_TOKEN_ID, 1, zeroData)).to.be.revertedWith(
          'ERC1155Tradable: !exists'
        )
      })

      it(`cannot mint > ${canMint} tokens`, async () => {
        await expect(collection.mint(alice, TOKEN_ID, canMint + 1, zeroData)).to.be.revertedWith(
          'ERC1155Tradable: !mintable'
        )
      })

      if (canMint > 0) {
        it(`can mint <= ${canMint} tokens`, async () => {
          await expect(collection.mint(alice, TOKEN_ID, canMint, zeroData))
            .to.emit(collection, 'TransferSingle')
            .withArgs(deployer, zeroAddress, alice, TOKEN_ID, canMint)
        })
      } else {
        it(`[Skipped] Minting test skipped as canMint = ${canMint} <= 0`, async () => {
          expect(canMint <= 0)
        })
      }

      it('cannot burn non existent token', async () => {
        await expect(connectedAlice.burn(alice, NON_EXISTENT_TOKEN_ID, 1)).to.be.revertedWith(
          'ERC1155Tradable: !exists'
        )
      })

      if (canMint > 1) {
        it('cannot burn > supply', async () => {
          //mint canMint tokens to alice account
          await collection.mint(alice, TOKEN_ID, canMint, zeroData)

          const supply = await collection.totalSupply(TOKEN_ID)

          // burning more tokens then supply should revert
          await expect(connectedAlice.burn(alice, TOKEN_ID, supply.add(1))).to.be.revertedWith(
            'ERC1155Tradable: !burnable'
          )
        })

        it('cannot burn > balance', async () => {
          //mint 1 token to alice account
          await collection.mint(alice, TOKEN_ID, 1, zeroData)
          //mint 1 token to bob account
          await collection.mint(bob, TOKEN_ID, 1, zeroData)

          const connectedAlice = collection.connect(await ethers.getSigner(alice))

          // burning more tokens then alice has should revert
          await expect(connectedAlice.burn(alice, TOKEN_ID, 2)).to.be.revertedWith(
            'ERC1155: burn amount exceeds balance'
          )
        })
      } else {
        it(`[Skipped] Burning tests skipped as canMint = ${canMint} <= 1`, async () => {
          expect(canMint <= 0)
        })
      }

      it('non-bridge can not mint (deposit) tokens', async () => {
        await expect(collection.deposit(alice, depositData([TOKEN_ID], [1]))).to.be.revertedWith(
          'ChildERC1155Preset: !access'
        )
      })

      it('bridge cannot mint (deposit) non existent token', async () => {
        await expect(
          connectedBridge.deposit(alice, depositData([NON_EXISTENT_TOKEN_ID], [1]))
        ).to.be.revertedWith('ChildERC1155Preset: !exists')
      })

      it('bridge can not burn (withdraw) non existent token', async () => {
        await expect(connectedAlice.withdrawSingle(NON_EXISTENT_TOKEN_ID, 1)).to.be.revertedWith(
          'ChildERC1155Preset: !exists'
        )
        await expect(connectedAlice.withdrawBatch([NON_EXISTENT_TOKEN_ID], [1])).to.be.revertedWith(
          'ChildERC1155Preset: !exists'
        )
      })

      it('bridge cannot mint (deposit) more then max supply', async () => {
        await expect(connectedBridge.deposit(alice, depositData([TOKEN_ID], [999]))).to.be.revertedWith(
          'ChildERC1155Preset: !max'
        )
      })

      it('bridge can not burn (withdraw) more then total supply', async () => {
        await expect(connectedAlice.withdrawSingle(TOKEN_ID, 999)).to.be.revertedWith(
          'ChildERC1155Preset: !total'
        )
        await expect(connectedAlice.withdrawBatch([TOKEN_ID], [999])).to.be.revertedWith(
          'ChildERC1155Preset: !total'
        )
      })

      if (args.supply > 0) {
        it('bridge can not burn (withdraw) more then bridged supply', async () => {
          await expect(connectedAlice.withdrawSingle(TOKEN_ID, 1)).to.be.revertedWith(
            'ChildERC1155Preset: !bridged'
          )
          await expect(connectedAlice.withdrawBatch([TOKEN_ID], [1])).to.be.revertedWith(
            'ChildERC1155Preset: !bridged'
          )
        })
      } else {
        it(`[Skipped] Bridge burn (withdraw) more then bridged supply as supply = ${args.supply} = 0`, async () => {
          expect(args.reserved + args.supply >= args.max)
        })
      }

      if (args.reserved + args.supply < args.max) {
        it('bridge cannot mint more then reserved supply', async () => {
          await expect(
            connectedBridge.deposit(alice, depositData([TOKEN_ID], [args.reserved + 1]))
          ).to.be.revertedWith('ChildERC1155Preset: !reserved')
        })
      } else {
        it(`[Skipped] Bridge check reserved skipped as reserved + supply = max = ${args.reserved} + ${args.supply} = ${args.max}`, async () => {
          expect(args.reserved + args.supply >= args.max)
        })
      }

      if (bridgeCanMint >= 1) {
        it('bridge can mint (deposit) tokens', async () => {
          const deposit = 1
          await expect(connectedBridge.deposit(alice, depositData([TOKEN_ID], [deposit])))
            .to.emit(connectedBridge, 'TransferBatch')
            .withArgs(bridge, zeroAddress, alice, [TOKEN_ID], [deposit])

          expect(await collection.totalSupply(TOKEN_ID)).to.be.equal(args.supply + deposit)
          expect(await collection.maxSupply(TOKEN_ID)).to.be.equal(args.max)
          expect(await collection.reservedSupply(TOKEN_ID)).to.be.equal(args.reserved)
          expect(await collection.bridgedSupply(TOKEN_ID)).to.be.equal(deposit)
          expect(await collection.balanceOf(alice, TOKEN_ID)).to.be.equal(deposit)
        })

        it('bridge can burn (withdraw) tokens', async () => {
          const deposit = 1
          await connectedBridge.deposit(alice, depositData([TOKEN_ID], [deposit]))

          await expect(connectedAlice.withdrawSingle(TOKEN_ID, deposit))
            .to.emit(connectedAlice, 'TransferSingle')
            .withArgs(alice, alice, zeroAddress, TOKEN_ID, deposit)

          expect(await collection.totalSupply(TOKEN_ID)).to.be.equal(args.supply)
          expect(await collection.maxSupply(TOKEN_ID)).to.be.equal(args.max)
          expect(await collection.reservedSupply(TOKEN_ID)).to.be.equal(args.reserved)
          expect(await collection.bridgedSupply(TOKEN_ID)).to.be.equal(0)
          expect(await collection.balanceOf(alice, TOKEN_ID)).to.be.equal(0)
        })

        if (bridgeCanMint >= 2) {
          it('bridge can burn (withdrawBatch) tokens', async () => {
            const deposit = 2
            await connectedBridge.deposit(alice, depositData([TOKEN_ID], [deposit]))

            await expect(connectedAlice.withdrawBatch([TOKEN_ID], [deposit]))
              .to.emit(connectedAlice, 'TransferBatch')
              .withArgs(alice, alice, zeroAddress, [TOKEN_ID], [deposit])

            expect(await collection.totalSupply(TOKEN_ID)).to.be.equal(args.supply)
            expect(await collection.maxSupply(TOKEN_ID)).to.be.equal(args.max)
            expect(await collection.reservedSupply(TOKEN_ID)).to.be.equal(args.reserved)
            expect(await collection.bridgedSupply(TOKEN_ID)).to.be.equal(0)
            expect(await collection.balanceOf(alice, TOKEN_ID)).to.be.equal(0)
          })
        } else {
          it(`[Skipped] Bridge withdrawBatch tests skipped as bridgeCanMint = ${bridgeCanMint} < 2`, async () => {
            expect(bridgeCanMint <= 0)
          })
        }
      } else {
        it(`[Skipped] Bridge minting/burning tests skipped as bridgeCanMint = ${bridgeCanMint} = 0`, async () => {
          expect(bridgeCanMint <= 0)
        })
      }
    })
  })
})
