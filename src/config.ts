import { NomicLabsHardhatPluginError } from 'hardhat/plugins'

export enum NetworkID {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  // Binance Smart Chain
  BSC = 56,
  BSC_TESTNET = 97,
  // Huobi ECO Chain
  //HECO = 128,
  //HECO_TESTNET = 256,
  // Fantom mainnet
  //OPERA = 250,
  // Optimistim
  //OPTIMISTIC_ETHEREUM = 10,
  //OPTIMISTIC_KOVAN = 69,
  // Polygon
  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
  // Arbitrum
  //ARBITRUM_ONE = 42161,
  //Hardhat
  HARDHAT = 31337,
  GANACHE = 1337,
}

export interface CollectionSupplyData {
  id: number
  max: number
  total: number
}
export interface CollectionPriceData {
  id: number
  price: number
}

export interface CollectionSupply extends Array<CollectionSupplyData> {}
export interface CollectionPrice extends Array<CollectionPriceData> {}

export enum HeroEdition {
  GENESIS,
  EPIC,
  RARE,
  COMMON,
}

const collectionAddress: { [networkID in NetworkID]?: string | undefined } = {
  [NetworkID.MAINNET]: '0xD0f27dfa54FbF80b823a63470C0e693AE4A626b8',
  [NetworkID.ROPSTEN]: '0xe46a083b0710082B3E34D299F18FE22Ce78aC0f4',
  [NetworkID.RINKEBY]: '0xea0144115c9F722f26963aCC6d564Cee8Bd77F76',
  [NetworkID.GOERLI]: '0xe46a083b0710082B3E34D299F18FE22Ce78aC0f4',
  [NetworkID.KOVAN]: undefined,
  [NetworkID.BSC]: '0x93e6f7264033dC2210919c4E3feE065313015109',
  [NetworkID.BSC_TESTNET]: '0x611477c54F8f2dA620Ea0A3B44729929c6C91a27',
  [NetworkID.POLYGON]: undefined,
  [NetworkID.POLYGON_MUMBAI]: undefined,
}

const multicallAddress: { [networkID in NetworkID]?: string | undefined } = {
  [NetworkID.MAINNET]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  [NetworkID.ROPSTEN]: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
  [NetworkID.RINKEBY]: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  [NetworkID.GOERLI]: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  [NetworkID.KOVAN]: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
  [NetworkID.BSC]: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
  [NetworkID.BSC_TESTNET]: '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
  [NetworkID.POLYGON]: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
  [NetworkID.POLYGON_MUMBAI]: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
}

//------------- Market Configuration --------------------------------

const getPriceByMaxSupply = (max: number) => {
  switch (max) {
    case 10:
      return 1200
    case 100:
      return 120
    case 1000:
      return 12
    default:
      return undefined
  }
}

export const getMarketPayload = (data: CollectionSupply) => {
  const payload = data.reduce((result, { id, max }) => {
    const price = getPriceByMaxSupply(max)
    if (price) {
      result.push({
        id,
        price,
      })
    }
    return result
  }, [] as CollectionPrice)

  return {
    ids: payload.map(({ id }) => id),
    prices: payload.map(({ price }) => price),
  }
}

// export const EthMarket = () => {
//   const edition: TokenMapping = {
//     [HeroEdition.EPIC]: [...arrayRange(2, 18, 4), ...arrayRange(25, 53, 4), 63, 70],
//     [HeroEdition.RARE]: [...arrayRange(3, 19, 4), ...arrayRange(26, 54, 4), 64, 71],
//     [HeroEdition.COMMON]: [...arrayRange(4, 20, 4), ...arrayRange(27, 55, 4), 65, 72],
//   }
//   const price: TokenPrice = {
//     [HeroEdition.EPIC]: Array.from({ length: edition[HeroEdition.EPIC]!.length }, () =>
//       tokenToWei(1200)
//     ).flat(),
//     [HeroEdition.RARE]: Array.from({ length: edition[HeroEdition.RARE]!.length }, () =>
//       tokenToWei(120)
//     ).flat(),
//     [HeroEdition.COMMON]: Array.from({ length: edition[HeroEdition.COMMON]!.length }, () =>
//       tokenToWei(12)
//     ).flat(),
//   }
//   return {
//     edition,
//     price,
//   }
// }

// export const BscMarket = () => {
//   const edition: TokenMapping = {
//     [HeroEdition.EPIC]: [...arrayRange(2, 28, 4), 33, 37],
//     [HeroEdition.RARE]: [...arrayRange(3, 28, 4), 34, 38],
//     [HeroEdition.COMMON]: [...arrayRange(4, 28, 4), 35, 39],
//   }
//   const price: TokenPrice = {
//     [HeroEdition.EPIC]: Array.from({ length: edition[HeroEdition.EPIC]!.length }, () =>
//       tokenToWei(1200)
//     ).flat(),
//     [HeroEdition.RARE]: Array.from({ length: edition[HeroEdition.RARE]!.length }, () =>
//       tokenToWei(120)
//     ).flat(),
//     [HeroEdition.COMMON]: Array.from({ length: edition[HeroEdition.COMMON]!.length }, () =>
//       tokenToWei(12)
//     ).flat(),
//   }
//   return {
//     edition,
//     price,
//   }
// }

// const polygonTokenEditionMapping: TokenMapping = {
//   [HeroEdition.EMPTY]: allTokenIds,
//   [HeroEdition.GENESIS]: genesisTokenIds,
//   [HeroEdition.EPIC]: epicTokenIds,
//   [HeroEdition.RARE]: rareTokenIds,
//   [HeroEdition.COMMON]: commonTokenIds,
// }

// // BSC PROD
// const bscTokenEditionMapping: TokenMapping = {
//   [HeroEdition.EMPTY]: [...arrayRange(1, 38, 1)],
//   [HeroEdition.GENESIS]: [...arrayRange(1, 28, 4), 32, 36],
//   [HeroEdition.EPIC]: [...arrayRange(2, 28, 4), 33, 37],
//   [HeroEdition.RARE]: [...arrayRange(3, 28, 4), 34, 38],
//   [HeroEdition.COMMON]: [...arrayRange(4, 28, 4), 35, 39],
// }
// // BSC UAT
// const bscTestTokenEditionMapping: TokenMapping = {
//   [HeroEdition.EMPTY]: [...arrayRange(1, 38, 1)],
//   [HeroEdition.GENESIS]: [...arrayRange(1, 28, 4), 32, 39],
//   [HeroEdition.EPIC]: [...arrayRange(2, 28, 4), 33, 40],
//   [HeroEdition.RARE]: [...arrayRange(3, 28, 4), 34, 41],
//   [HeroEdition.COMMON]: [...arrayRange(4, 28, 4), 35, 42],
// }

// export const testTokenEditionMapping: TokenMapping = {
//   [HeroEdition.EMPTY]: [...arrayRange(1, 38, 1)],
//   [HeroEdition.GENESIS]: [...arrayRange(1, 28, 4), 32],
//   [HeroEdition.EPIC]: [...arrayRange(2, 28, 4), 33],
//   [HeroEdition.RARE]: [...arrayRange(3, 28, 4), 34],
//   [HeroEdition.COMMON]: [...arrayRange(4, 28, 4), 35],
// }

// const tokenMappingByChain: { [networkID in NetworkID]: TokenMapping | undefined } = {
//   [NetworkID.MAINNET]: undefined,
//   [NetworkID.ROPSTEN]: undefined,
//   [NetworkID.RINKEBY]: undefined,
//   [NetworkID.GOERLI]: undefined,
//   [NetworkID.KOVAN]: undefined,
//   [NetworkID.BSC]: bscTokenEditionMapping,
//   [NetworkID.BSC_TESTNET]: bscTestTokenEditionMapping,
//   [NetworkID.POLYGON]: undefined,
//   [NetworkID.POLYGON_MUMBAI]: polygonTokenEditionMapping,
// }

//------------- Mixer Configuration --------------------------------
export interface MixerConfig {
  editions: HeroEdition[]
  chances: number[]
}

export const COMMON_CONFIG = {
  editions: [HeroEdition.EPIC, HeroEdition.RARE, HeroEdition.COMMON],
  chances: [3700, 36600, 59700],
  //chances: [5000, 35000, 60000],
}

export const RARE_CONFIG = {
  editions: [HeroEdition.COMMON, HeroEdition.EPIC, HeroEdition.RARE],
  chances: [9700, 34700, 55600],
}

export const mixerConfig: { [editionId in HeroEdition]: MixerConfig | undefined } = {
  [HeroEdition.GENESIS]: undefined,
  [HeroEdition.EPIC]: undefined,
  [HeroEdition.RARE]: RARE_CONFIG,
  [HeroEdition.COMMON]: COMMON_CONFIG,
}

export const getCollectionPayload = (data: CollectionSupply) => {
  return {
    max: data.map(({ max }) => max),
    reserved: data.map(({ total }) => total),
    mint: Array.from({ length: data.length }, () => 0).flat(),
  }
}

export async function getCollectionAddress(networkId: string): Promise<string> {
  const chainID = parseInt(networkId) as NetworkID

  const address = collectionAddress[chainID]

  if (address === undefined) {
    throw new NomicLabsHardhatPluginError(
      'Collection Address',
      `The collection address could not be found for this network. ChainID: ${chainID}.`
    )
  }

  return address
}

export async function getMulticallAddress(networkId: string): Promise<string> {
  const chainID = parseInt(networkId) as NetworkID

  const address = multicallAddress[chainID]

  if (address === undefined) {
    throw new NomicLabsHardhatPluginError(
      'Multicall Address',
      `The multicall address could not be found for this network. ChainID: ${chainID}.`
    )
  }

  return address
}

export async function getNetworkName(chainID: string): Promise<string> {
  const networkId = parseInt(chainID)

  if (networkId === undefined) {
    throw new NomicLabsHardhatPluginError(
      'Network Name',
      `The network ID could not be found for this network. ChainID: ${chainID}.`
    )
  }

  return NetworkID[networkId]
}

export async function getCollectionStorageName(chainId: string, prefix: string) {
  const networkName = await getNetworkName(chainId)
  return `${prefix}_${networkName}`
}

export async function getEthRootNetworkName(childId: string): Promise<string> {
  const networkId = parseInt(childId) as NetworkID
  return getRootCollectionNetworkName(networkId, NetworkID.MAINNET, NetworkID.GOERLI)
}

export async function getBscRootNetworkName(childId: string): Promise<string> {
  const networkId = parseInt(childId) as NetworkID
  return getRootCollectionNetworkName(networkId, NetworkID.BSC, NetworkID.BSC_TESTNET)
}

async function getRootCollectionNetworkName(
  child: NetworkID,
  mainnet: NetworkID,
  testnet: NetworkID
): Promise<string> {
  if (child === NetworkID.POLYGON) {
    return getNetworkName(String(mainnet))
  } else if (child === NetworkID.POLYGON_MUMBAI) {
    return getNetworkName(String(testnet))
  } else {
    throw new NomicLabsHardhatPluginError(
      'Root Collection Network',
      `The root collection network is not available for this network. ChainID: ${child}.`
    )
  }
}

// ------------- Collection Configuration --------------------------------
export interface CollectionConfig {
  proxy721: string
  proxy1155: string
  api: string
}

const networkIDtoCollectionConfig: { [networkID in NetworkID]?: CollectionConfig } = {
  [NetworkID.POLYGON]: {
    proxy721: '0x58807baD0B376efc12F5AD86aAc70E78ed67deaE',
    proxy1155: '0x207Fa8Df3a17D96Ca7EA4f2893fcdCb78a304101',
    api: 'https://api-polygon.cryptokombat.com',
  },
  [NetworkID.POLYGON_MUMBAI]: {
    proxy721: '0x58807baD0B376efc12F5AD86aAc70E78ed67deaE',
    proxy1155: '0x207Fa8Df3a17D96Ca7EA4f2893fcdCb78a304101',
    api: 'https://api-staging.cryptokombat.com',
  },
  [NetworkID.HARDHAT]: {
    proxy721: '0x58807baD0B376efc12F5AD86aAc70E78ed67deaE',
    proxy1155: '0x207Fa8Df3a17D96Ca7EA4f2893fcdCb78a304101',
    api: 'https://api-staging.cryptokombat.com',
  },
  [NetworkID.GANACHE]: {
    proxy721: '0x58807baD0B376efc12F5AD86aAc70E78ed67deaE',
    proxy1155: '0x207Fa8Df3a17D96Ca7EA4f2893fcdCb78a304101',
    api: 'https://api-staging.cryptokombat.com',
  },
}

export async function getCollectionConfig(networkId: string): Promise<CollectionConfig> {
  const chainID = parseInt(networkId) as NetworkID

  const config = networkIDtoCollectionConfig[chainID]

  if (config === undefined) {
    throw new NomicLabsHardhatPluginError(
      'Collection Configuration',
      `The collection config could not be found for this network. ChainID: ${chainID}.`
    )
  }

  return config
}

//------------- Chainlink Configuration --------------------------------
// export interface ChainlinkConfig {
//   link: string
//   coordinator: string
//   keyhash: string
//   fee: BigNumber
// }

// const networkIDtoConfig: { [networkID in NetworkID]: ChainlinkConfig } = {
//   [NetworkID.MAINNET]: {
//     link: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
//     coordinator: '0xf0d54349aDdcf704F77AE15b96510dEA15cb7952',
//     keyhash: '0xAA77729D3466CA35AE8D28B3BBAC7CC36A5031EFDC430821C02BC31A238AF445',
//     fee: utils.parseUnits('2'),
//   },
//   [NetworkID.RINKEBY]: {
//     link: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
//     coordinator: '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B',
//     keyhash: '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311',
//     fee: utils.parseUnits('0.1'),
//   },
//   [NetworkID.KOVAN]: {
//     link: '0xa36085F69e2889c224210F603D836748e7dC0088',
//     coordinator: '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9',
//     keyhash: '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
//     fee: utils.parseUnits('0.1'),
//   },
//   [NetworkID.BSC]: {
//     link: '0x404460C6A5EdE2D891e8297795264fDe62ADBB75',
//     coordinator: '0x747973a5A2a4Ae1D3a8fDF5479f1514F65Db9C31',
//     keyhash: '0xc251acd21ec4fb7f31bb8868288bfdbaeb4fbfec2df3735ddbd4f7dc8d60103c',
//     fee: utils.parseUnits('0.2'),
//   },
//   [NetworkID.BSC_TESTNET]: {
//     link: '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06',
//     coordinator: '0xa555fC018435bef5A13C6c6870a9d4C11DEC329C',
//     keyhash: '0xcaf3c3727e033261d383b315559476f48034c13b18f8cafed4d871abe5049186',
//     fee: utils.parseUnits('0.1'),
//   },
//   [NetworkID.POLYGON]: {
//     link: '0xb0897686c545045aFc77CF20eC7A532E3120E0F1',
//     coordinator: '0x3d2341ADb2D31f1c5530cDC622016af293177AE0',
//     keyhash: '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da',
//     fee: utils.parseUnits('0.0001'),
//   },
//   [NetworkID.POLYGON_MUMBAI]: {
//     link: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
//     coordinator: '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255',
//     keyhash: '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4',
//     fee: utils.parseUnits('0.0001'),
//   },
// }

// export async function getChainlinkConfig(networkId: string): Promise<ChainlinkConfig> {
//   const chainID = parseInt(networkId) as NetworkID

//   const config = networkIDtoConfig[chainID]

//   if (config === undefined) {
//     throw new NomicLabsHardhatPluginError(
//       'Chainlink Configuration',
//       `The chainlink config could not be found for this network. ChainID: ${chainID}.`
//     )
//   }

//   return config
// }
