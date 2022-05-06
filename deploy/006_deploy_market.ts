import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { getChainlinkConfig, getCollectionAddress } from '../src/config'
import { sleep } from '../src/utils'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, getChainId, run } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  const vombat = await hre.ethers.getContract('VombatToken')
  const collectionEth = await hre.ethers.getContract('CryptoKombatCollectionEthereum')
  const collectionBsc = await hre.ethers.getContract('CryptoKombatCollectionBinance')
  const consumables = await hre.ethers.getContract('CryptoKombatConsumables')

  const args = [vombat.address, deployer, [collectionEth.address, collectionBsc.address, consumables.address]]

  const marketContract = await deploy('KombatMarket', {
    from: deployer,
    args,
    log: true,
  })

  const isTest = hre.network.name === 'hardhat' || hre.network.name === 'localhost'

  if (!isTest) console.log('Market deployed successfully: ', marketContract.address)

  if (!isTest) {
    try {
      console.log('Waiting to verify...')

      await sleep(25000)

      await run('verify:verify', {
        address: marketContract.address,
        constructorArguments: args,
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (!isTest) console.log('Done')
}

export default func
func.tags = ['Mainnet', 'Testnet', 'Market']
