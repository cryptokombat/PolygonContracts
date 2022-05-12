import hre from 'hardhat'
import { providers } from '@0xsequence/multicall'

import { IRootCollection, IRootCollection__factory } from '../typechain-types'

import { CollectionSupply, getCollectionAddress, getMulticallAddress, getNetworkName } from '../src/config'
import { saveCollectionData } from '../src/json'

async function main() {
  const { ethers, getChainId } = hre

  const zeroAddress = ethers.constants.AddressZero

  const chainId = await getChainId()

  const collectionAddress = await getCollectionAddress(chainId)

  const networkName = await getNetworkName(chainId)

  const multicallAddress = await getMulticallAddress(chainId)

  const multicallProvider = new providers.MulticallProvider(ethers.provider, {
    contract: multicallAddress,
    verbose: false,
  })

  const collectionInstance = new ethers.Contract(
    collectionAddress,
    IRootCollection__factory.abi,
    multicallProvider
  ) as IRootCollection

  console.log('Collection instance loaded at %s', collectionInstance.address)

  const maxTokenId = 80

  const getData = async (id: number) => {
    return await Promise.all([
      collectionInstance.creators(id),
      collectionInstance.maxSupply(id),
      collectionInstance.totalSupply(id),
    ])
  }

  const result: CollectionSupply = []

  for (let i = 1; i < maxTokenId; i++) {
    const [creator, max, total] = await getData(i)

    if (creator === zeroAddress) break

    result.push({
      id: i,
      max: max.toNumber(),
      total: total.toNumber(),
    })
  }

  await saveCollectionData(result, networkName)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
