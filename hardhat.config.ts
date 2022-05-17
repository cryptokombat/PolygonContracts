require('dotenv').config()

import 'hardhat-deploy'
// import 'hardhat-deploy-ethers'
import 'hardhat-gas-reporter'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-ethers'
import '@typechain/hardhat'
import 'hardhat-tracer'
import 'solidity-coverage'
import 'hardhat-ethernal'

import { HardhatUserConfig } from 'hardhat/config'

const INFURA_API_KEY = process.env.INFURA_API_KEY || ''

const ALCHEMY_API_KEY_MUMBAI = process.env.ALCHEMY_API_KEY_MUMBAI || ''
const ALCHEMY_API_KEY_POLYGON = process.env.ALCHEMY_API_KEY_POLYGON || ''

const MAINNET_MNEMONIC = process.env.MAINNET_MNEMONIC || ''
const TESTNET_MNEMONIC = process.env.TESTNET_MNEMONIC || ''

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || ''
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || ''

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ''

const config: HardhatUserConfig = {
  networks: {
    hardhat: {},
    localhost: {},
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: {
        mnemonic: MAINNET_MNEMONIC,
      },
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: {
        mnemonic: TESTNET_MNEMONIC,
      },
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: {
        mnemonic: TESTNET_MNEMONIC,
      },
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: {
        mnemonic: TESTNET_MNEMONIC,
      },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: {
        mnemonic: TESTNET_MNEMONIC,
      },
    },
    bsc: {
      url: `https://bsc-dataseed1.binance.org`,
      saveDeployments: true,
      accounts: {
        mnemonic: MAINNET_MNEMONIC,
      },
      //gasPrice: 6000000000,
    },
    bsctest: {
      url: `https://data-seed-prebsc-2-s3.binance.org:8545`,
      saveDeployments: true,
      accounts: {
        mnemonic: TESTNET_MNEMONIC,
      },
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_POLYGON}`,
      saveDeployments: true,
      accounts: {
        mnemonic: MAINNET_MNEMONIC,
      },
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY_MUMBAI}`,
      saveDeployments: true,
      accounts: {
        mnemonic: TESTNET_MNEMONIC,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    marketTreasure: {
      default: 1,
    },
    gameTreasure: {
      default: 2,
    },
    automation: {
      default: 3,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      ropsten: ETHERSCAN_API_KEY,
      rinkeby: ETHERSCAN_API_KEY,
      kovan: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      bsc: BSCSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },
  ethernal: {
    disableSync: false,
    disableTrace: false,
    uploadAst: true,
    disabled: true,
    resetOnStart: 'Ganache',
    email: process.env.ETHERNAL_EMAIL,
    password: process.env.ETHERNAL_PASSWORD,
  },
  gasReporter: {
    coinmarketcap: COINMARKETCAP_API_KEY,
    currency: 'USD',
    gasPrice: 100,
    enabled: false,
  },
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}

export default config
