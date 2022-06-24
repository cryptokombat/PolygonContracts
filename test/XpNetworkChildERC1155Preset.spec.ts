import { expect } from './chai-setup'
import hre, { getNamedAccounts, getUnnamedAccounts, ethers, deployments } from 'hardhat'

import { Address } from 'hardhat-deploy/types'

import { CryptoKombatCollectionEthereum, MockBridge, MockProxyRegistry } from '../typechain-types'

const BRIDGE_ROLE = ethers.utils.id('BRIDGE_ROLE')
const zeroData = ethers.constants.HashZero
const zeroAddress = ethers.constants.AddressZero
const abiEncoder = new ethers.utils.AbiCoder()

const depositDataBatch = (ids: number[], amounts: number[]) => {
  return [ids, amounts, zeroData] as const
}
const depositData = (id: number, amount: number) => {
  return [id, amount, zeroData] as const
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

type SetupParams = {
  deployer: Address
  alice: Address
  bob: Address
  bridgeEOA: Address
  collection: CryptoKombatCollectionEthereum
  aliceCollection: CryptoKombatCollectionEthereum
  bridgeCollection: CryptoKombatCollectionEthereum
  bridge: MockBridge
  aliceBridge: MockBridge
}

const setupTest = deployments.createFixture<SetupParams, unknown>(
  async ({ deployments, getNamedAccounts, ethers }, options) => {
    await deployments.fixture(['CollectionEth', 'Mocks'])

    // console.log('Deploying fixtures...')

    const { deployer } = await getNamedAccounts()
    const accounts = await getUnnamedAccounts()

    const alice = accounts[0]
    const bob = accounts[1]
    const bridgeEOA = accounts[2]

    hre.tracer.nameTags[zeroAddress] = 'Zero'
    hre.tracer.nameTags[deployer] = 'Deployer'
    hre.tracer.nameTags[alice] = 'Alice'
    hre.tracer.nameTags[bob] = 'Bob'
    hre.tracer.nameTags[bridgeEOA] = 'BridgeEOA'

    const collection = (await ethers.getContract(
      'CryptoKombatCollectionEthereum',
      deployer
    )) as CryptoKombatCollectionEthereum
    const mockBridge = (await ethers.getContract('MockBridge', deployer)) as MockBridge

    const mockProxy = (await ethers.getContract('MockProxyRegistry', deployer)) as MockProxyRegistry

    hre.tracer.nameTags[collection.address] = 'Collection'
    hre.tracer.nameTags[mockBridge.address] = 'Bridge'

    await collection.grantRole(BRIDGE_ROLE, bridgeEOA)
    await collection.grantRole(BRIDGE_ROLE, mockBridge.address)
    await collection.setProxyRegistryAddress(mockProxy.address)

    await mockBridge.setCollection(collection.address)

    const aliceCollection = await collection.connect(await ethers.getSigner(alice))
    const aliceBridge = await mockBridge.connect(await ethers.getSigner(alice))
    const bridgeCollection = await collection.connect(await ethers.getSigner(bridgeEOA))

    await aliceCollection.setApprovalForAll(mockBridge.address, true)
    await aliceCollection.setApprovalForAll(bridgeEOA, true)

    // console.log('deployer', deployer)
    // console.log('alice', alice)
    // console.log('bob', bob)
    // console.log('collection', collection.address)
    // console.log('bridge', mockBridge.address)

    return {
      deployer,
      alice,
      bob,
      bridgeEOA,
      collection,
      aliceCollection,
      bridgeCollection,
      bridge: mockBridge,
      aliceBridge,
    }
  }
)

describe('XpNetworkChildERC1155Preset', () => {
  let _: SetupParams

  beforeEach(async () => {
    _ = await setupTest()
  })

  describe('Test for mint and burn function visibility', () => {
    const args = CASES[0]

    beforeEach(async () => {
      await _.collection.create(args.max, args.reserved, args.supply, ethers.constants.HashZero)
    })

    it('bridgeEOA can mint 1 token', async () => {
      await expect(_.bridgeCollection['mint(address,uint256,bytes)'](_.alice, TOKEN_ID, zeroData))
        .to.emit(_.collection, 'TransferSingle')
        .withArgs(_.bridgeEOA, zeroAddress, _.alice, TOKEN_ID, 1)
    })

    it('bridgeEOA can mint > 1 token', async () => {
      await expect(
        _.bridgeCollection['mint(address,uint256,uint256,bytes)'](_.alice, TOKEN_ID, args.reserved, zeroData)
      )
        .to.emit(_.collection, 'TransferSingle')
        .withArgs(_.bridgeEOA, zeroAddress, _.alice, TOKEN_ID, args.reserved)
    })

    it('bridgeEOA can burn 1 token', async () => {
      await _.bridgeCollection['mint(address,uint256,bytes)'](_.alice, TOKEN_ID, zeroData)
      await expect(_.bridgeCollection.burnFor(_.alice, TOKEN_ID))
        .to.emit(_.collection, 'TransferSingle')
        .withArgs(_.bridgeEOA, _.alice, zeroAddress, TOKEN_ID, 1)
    })

    it('bridgeEOA can burn > 1 token', async () => {
      await _.bridgeCollection['mint(address,uint256,uint256,bytes)'](
        _.alice,
        TOKEN_ID,
        args.reserved,
        zeroData
      )
      await expect(_.bridgeCollection.burn(_.alice, TOKEN_ID, args.reserved))
        .to.emit(_.collection, 'TransferSingle')
        .withArgs(_.bridgeEOA, _.alice, zeroAddress, TOKEN_ID, args.reserved)
    })
  })

  // CASES.forEach((args, index) => {
  //   describe(getTestCaseName(index, args), () => {
  //     const canMint = args.max - args.reserved - args.supply
  //     const bridgeCanMint = args.reserved

  //     // before(() => {
  //     //   console.log('canMint', canMint)
  //     //   console.log('bridgeCanMint', bridgeCanMint)
  //     // })

  //     beforeEach(async () => {
  //       await _.collection.create(args.max, args.reserved, args.supply, ethers.constants.HashZero)
  //     })

  //     it('cannot mint non-existent token', async () => {
  //       await expect(
  //         _.collection['mint(address,uint256,uint256,bytes)'](_.alice, NON_EXISTENT_TOKEN_ID, 1, zeroData)
  //       ).to.be.revertedWith('ERC1155Tradable: !exists')
  //     })

  //     it(`cannot mint > ${canMint} tokens`, async () => {
  //       await expect(
  //         _.collection['mint(address,uint256,uint256,bytes)'](_.alice, TOKEN_ID, canMint + 1, zeroData)
  //       ).to.be.revertedWith('ERC1155Tradable: !mintable')
  //     })

  //     if (canMint > 0) {
  //       it(`can mint <= ${canMint} tokens`, async () => {
  //         await expect(
  //           _.collection['mint(address,uint256,uint256,bytes)'](_.alice, TOKEN_ID, canMint, zeroData)
  //         )
  //           .to.emit(_.collection, 'TransferSingle')
  //           .withArgs(_.deployer, zeroAddress, _.alice, TOKEN_ID, canMint)
  //       })
  //     } else {
  //       it(`[Skipped] Minting test skipped as canMint = ${canMint} <= 0`, async () => {
  //         expect(canMint <= 0)
  //       })
  //     }

  //     it('cannot burn non-existent token', async () => {
  //       await expect(_.aliceCollection.burn(_.alice, NON_EXISTENT_TOKEN_ID, 1)).to.be.revertedWith(
  //         'ERC1155Tradable: !exists'
  //       )
  //     })

  //     if (canMint > 1) {
  //       it('cannot burn > supply', async () => {
  //         //mint canMint tokens to alice account
  //         await _.collection['mint(address,uint256,uint256,bytes)'](_.alice, TOKEN_ID, canMint, zeroData)

  //         const supply = await _.collection.totalSupply(TOKEN_ID)

  //         // burning more tokens then supply should revert
  //         await expect(_.aliceCollection.burn(_.alice, TOKEN_ID, supply.add(1))).to.be.revertedWith(
  //           'ERC1155Tradable: !burnable'
  //         )
  //       })

  //       it('cannot burn > balance', async () => {
  //         //mint 1 token to alice account
  //         await _.collection['mint(address,uint256,uint256,bytes)'](_.alice, TOKEN_ID, 1, zeroData)
  //         //mint 1 token to bob account
  //         await _.collection['mint(address,uint256,uint256,bytes)'](_.bob, TOKEN_ID, 1, zeroData)

  //         // burning more tokens then alice has should revert
  //         await expect(_.aliceCollection.burn(_.alice, TOKEN_ID, 2)).to.be.revertedWith(
  //           'ERC1155: burn amount exceeds balance'
  //         )
  //       })
  //     } else {
  //       it(`[Skipped] Burning tests skipped as canMint = ${canMint} <= 1`, async () => {
  //         expect(canMint <= 0)
  //       })
  //     }

  //     it('non-bridge or non-minter can not mint tokens', async () => {
  //       await expect(
  //         _.aliceCollection['mint(address,uint256,uint256,bytes)'](_.alice, ...depositData(TOKEN_ID, 1))
  //       ).to.be.revertedWith('ERC1155Tradable: must have minter role')
  //     })

  //     it('bridge cannot mint non-existent token', async () => {
  //       await expect(_.bridge.mint(_.alice, ...depositData(NON_EXISTENT_TOKEN_ID, 1))).to.be.revertedWith(
  //         'NotExists'
  //       )
  //     })

  //     it('bridge can not burn non-existent token', async () => {
  //       await expect(_.bridge.burn(_.alice, NON_EXISTENT_TOKEN_ID, 1)).to.be.revertedWith('NotExists')
  //       await expect(_.bridge.burnBatch(_.alice, [NON_EXISTENT_TOKEN_ID], [1])).to.be.revertedWith(
  //         'NotExists'
  //       )
  //     })

  //     it('bridge cannot mint more then max supply', async () => {
  //       await expect(_.bridge.mint(_.alice, ...depositData(TOKEN_ID, 999))).to.be.revertedWith('MaxUnderflow')
  //       await expect(_.bridge.mintBatch(_.alice, ...depositDataBatch([TOKEN_ID], [999]))).to.be.revertedWith(
  //         'MaxUnderflow'
  //       )
  //     })

  //     it('bridge can not burn more then total supply', async () => {
  //       await expect(_.bridge.burn(_.alice, TOKEN_ID, 999)).to.be.revertedWith('TotalOverflow')
  //       await expect(_.bridge.burnBatch(_.alice, [TOKEN_ID], [999])).to.be.revertedWith('TotalOverflow')
  //     })

  //     if (args.supply > 0) {
  //       it('bridge can not burn more then bridged supply', async () => {
  //         await expect(_.bridge.burn(_.alice, TOKEN_ID, 1)).to.be.revertedWith('BridgedOverflow')
  //         await expect(_.bridge.burnBatch(_.alice, [TOKEN_ID], [1])).to.be.revertedWith('BridgedOverflow')
  //       })
  //     } else {
  //       it(`[Skipped] Bridge burn more then bridged supply as supply = ${args.supply} = 0`, async () => {
  //         expect(args.reserved + args.supply >= args.max)
  //       })
  //     }

  //     if (args.reserved + args.supply < args.max) {
  //       it('bridge cannot mint more then reserved supply', async () => {
  //         await expect(
  //           _.bridge.mint(_.alice, ...depositData(TOKEN_ID, args.reserved + 1))
  //         ).to.be.revertedWith('ReservedUnderflow')
  //       })
  //     } else {
  //       it(`[Skipped] Bridge check reserved skipped as reserved + supply = max = ${args.reserved} + ${args.supply} = ${args.max}`, async () => {
  //         expect(args.reserved + args.supply >= args.max)
  //       })
  //     }

  //     if (bridgeCanMint >= 1) {
  //       it('bridge can mint (deposit) tokens', async () => {
  //         const deposit = 1
  //         await expect(_.bridge.mint(_.alice, ...depositData(TOKEN_ID, deposit)))
  //           .to.emit(_.collection, 'TransferSingle')
  //           .withArgs(_.bridge.address, zeroAddress, _.alice, TOKEN_ID, deposit)

  //         expect(await _.collection.totalSupply(TOKEN_ID)).to.be.equal(args.supply + deposit)
  //         expect(await _.collection.maxSupply(TOKEN_ID)).to.be.equal(args.max)
  //         expect(await _.collection.reservedSupply(TOKEN_ID)).to.be.equal(args.reserved)
  //         expect(await _.collection.bridgedSupply(TOKEN_ID)).to.be.equal(deposit)
  //         expect(await _.collection.balanceOf(_.alice, TOKEN_ID)).to.be.equal(deposit)
  //       })

  //       it('bridge can batchMint (deposit) tokens', async () => {
  //         const deposit = 1
  //         await expect(_.bridge.mintBatch(_.alice, ...depositDataBatch([TOKEN_ID], [deposit])))
  //           .to.emit(_.collection, 'TransferBatch')
  //           .withArgs(_.bridge.address, zeroAddress, _.alice, [TOKEN_ID], [deposit])

  //         expect(await _.collection.totalSupply(TOKEN_ID)).to.be.equal(args.supply + deposit)
  //         expect(await _.collection.maxSupply(TOKEN_ID)).to.be.equal(args.max)
  //         expect(await _.collection.reservedSupply(TOKEN_ID)).to.be.equal(args.reserved)
  //         expect(await _.collection.bridgedSupply(TOKEN_ID)).to.be.equal(deposit)
  //         expect(await _.collection.balanceOf(_.alice, TOKEN_ID)).to.be.equal(deposit)
  //       })

  //       it('bridge can burn (withdraw) tokens', async () => {
  //         const deposit = 1
  //         await _.bridge.mint(_.alice, ...depositData(TOKEN_ID, deposit))

  //         await expect(_.bridge.burn(_.alice, TOKEN_ID, deposit))
  //           .to.emit(_.collection, 'TransferSingle')
  //           .withArgs(_.bridge.address, _.alice, zeroAddress, TOKEN_ID, deposit)

  //         expect(await _.collection.totalSupply(TOKEN_ID)).to.be.equal(args.supply)
  //         expect(await _.collection.maxSupply(TOKEN_ID)).to.be.equal(args.max)
  //         expect(await _.collection.reservedSupply(TOKEN_ID)).to.be.equal(args.reserved)
  //         expect(await _.collection.bridgedSupply(TOKEN_ID)).to.be.equal(0)
  //         expect(await _.collection.balanceOf(_.alice, TOKEN_ID)).to.be.equal(0)
  //       })

  //       if (bridgeCanMint >= 2) {
  //         it('bridge can burn (withdrawBatch) tokens', async () => {
  //           const deposit = 2
  //           await _.bridge.mintBatch(_.alice, ...depositDataBatch([TOKEN_ID], [deposit]))

  //           await expect(_.bridge.burnBatch(_.alice, [TOKEN_ID], [deposit]))
  //             .to.emit(_.collection, 'TransferBatch')
  //             .withArgs(_.bridge.address, _.alice, zeroAddress, [TOKEN_ID], [deposit])

  //           expect(await _.collection.totalSupply(TOKEN_ID)).to.be.equal(args.supply)
  //           expect(await _.collection.maxSupply(TOKEN_ID)).to.be.equal(args.max)
  //           expect(await _.collection.reservedSupply(TOKEN_ID)).to.be.equal(args.reserved)
  //           expect(await _.collection.bridgedSupply(TOKEN_ID)).to.be.equal(0)
  //           expect(await _.collection.balanceOf(_.alice, TOKEN_ID)).to.be.equal(0)
  //         })
  //       } else {
  //         it(`[Skipped] Bridge withdrawBatch tests skipped as bridgeCanMint = ${bridgeCanMint} < 2`, async () => {
  //           expect(bridgeCanMint <= 0)
  //         })
  //       }
  //     } else {
  //       it(`[Skipped] Bridge minting/burning tests skipped as bridgeCanMint = ${bridgeCanMint} = 0`, async () => {
  //         expect(bridgeCanMint <= 0)
  //       })
  //     }
  //   })
  // })
})
