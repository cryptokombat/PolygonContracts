import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { sleep, tokenToWei } from '../src/utils'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, run } = hre
  const { deploy } = deployments

  const { deployer, gameTreasure } = await getNamedAccounts()

  const vombat = await hre.ethers.getContract('VombatToken')
  const collectionEth = await hre.ethers.getContract('CryptoKombatCollectionEthereum')
  const collectionBsc = await hre.ethers.getContract('CryptoKombatCollectionBinance')
  const consumables = await hre.ethers.getContract('CryptoKombatConsumables')

  const rewardAmount = tokenToWei(1)
  const addressZero = hre.ethers.constants.AddressZero
  const collectionLocation = addressZero
  const stakingContract = addressZero

  const args = [
    vombat.address,
    rewardAmount,
    6000,
    3000,
    1000,
    stakingContract,
    gameTreasure,
    collectionEth.address,
    collectionBsc.address,
    consumables.address,
    collectionLocation,
  ]

  const gameContract = await deploy('KombatGame', {
    from: deployer,
    args: [],
    proxy: {
      proxyContract: 'OptimizedTransparentProxy',
      execute: {
        methodName: 'initialize',
        args,
      },
    },
    log: true,
  })

  const isTest = hre.network.name === 'hardhat' || hre.network.name === 'localhost'

  const proxyAdminContract = await hre.ethers.getContract('DefaultProxyAdmin')

  // await hre.ethernal.push({
  //   name: 'KombatGame',
  //   address: gameContract.address,
  // })

  if (!isTest) {
    console.log(`Default Proxy Admin [${proxyAdminContract.address}]`)
    console.log(`Kombat Game Proxy   [${gameContract.address}]`)
    console.log(`Kombat Game Impl    [${gameContract.implementation}]`)
  }

  if (!isTest) {
    try {
      console.log('Waiting to verify...')

      await sleep(25000)

      await run('verify:verify', {
        address: gameContract.implementation,
        constructorArguments: [],
        contract: 'contracts/upgradable/game/KombatGame.sol:KombatGame',
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (!isTest) console.log('Done')
}

export default func
func.tags = ['Game']
func.dependencies = ['Market']
