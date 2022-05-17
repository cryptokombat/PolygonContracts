import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { sleep } from '../src/utils'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, run } = hre
  const { deploy } = deployments

  const { deployer, marketTreasure } = await getNamedAccounts()

  const vombat = await hre.ethers.getContract('VombatToken')
  const collectionEth = await hre.ethers.getContract('CryptoKombatCollectionEthereum')
  const collectionBsc = await hre.ethers.getContract('CryptoKombatCollectionBinance')
  const consumables = await hre.ethers.getContract('CryptoKombatConsumables')

  const args = [
    vombat.address,
    marketTreasure,
    [collectionEth.address, collectionBsc.address, consumables.address],
  ]

  const marketContract = await deploy('KombatMarket', {
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

  const proxyAdminContract = await hre.ethers.getContract('DefaultProxyAdmin')

  // await hre.ethernal.push({
  //   name: 'KombatMarket',
  //   address: marketContract.address,
  // })

  const isTest = hre.network.name === 'hardhat' || hre.network.name === 'localhost'

  if (!isTest) {
    console.log(`Default Proxy Admin [${proxyAdminContract.address}]`)
    console.log(`Kombat Market Proxy [${marketContract.address}]`)
    console.log(`Kombat Market Impl  [${marketContract.implementation}]`)
  }

  if (!isTest) {
    try {
      console.log('Waiting to verify...')

      await sleep(25000)

      await run('verify:verify', {
        address: marketContract.implementation,
        constructorArguments: [],
        contract: 'contracts/upgradable/market/KombatMarket.sol:KombatMarket',
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (!isTest) console.log('Done')
}

export default func
func.tags = ['Market']
func.dependencies = ['Vombat', 'CollectionEth', 'CollectionBsc', 'Consumables']
