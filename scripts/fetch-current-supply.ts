import hre from 'hardhat'
import { providers } from '@0xsequence/multicall'

import { IRootCollection, IRootCollection__factory } from '../typechain-types'

import {
  CollectionSupply,
  getCollectionStorageName,
  getMulticallAddress,
  getNetworkName,
} from '../src/config'
import { saveCurrentData } from '../src/json'

const { ethers, getChainId } = hre

async function fetchSupply(address: string) {
  const zeroAddress = ethers.constants.AddressZero

  const chainId = await getChainId()

  const multicallAddress = await getMulticallAddress(chainId)

  const multicallProvider = new providers.MulticallProvider(ethers.provider, {
    contract: multicallAddress,
    verbose: false,
  })

  const instance = new ethers.Contract(
    address,
    IRootCollection__factory.abi,
    multicallProvider
  ) as IRootCollection

  const maxTokenId = 80

  const getData = async (id: number) => {
    return await Promise.all([instance.creators(id), instance.maxSupply(id), instance.totalSupply(id)])
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
  return result
}

async function main() {
  const chainId = await getChainId()

  const ethInstance = await ethers.getContract('CryptoKombatCollectionEthereum')
  console.log('eth instance loaded at %s', ethInstance.address)
  let data = await fetchSupply(ethInstance.address)
  let name = await getCollectionStorageName(chainId, 'ETH')
  await saveCurrentData(data, name)

  const bscInstance = await ethers.getContract('CryptoKombatCollectionBinance')
  console.log('bsc instance loaded at %s', bscInstance.address)
  data = await fetchSupply(bscInstance.address)
  name = await getCollectionStorageName(chainId, 'BSC')
  await saveCurrentData(data, name)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
