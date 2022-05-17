import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { sleep } from '../src/utils'
import { getCollectionConfig } from '../src/config'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, run, getChainId } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()
  const config = await getCollectionConfig(chainId)

  const args = [`${config.api}/bscHero/`, config.proxy1155]

  const collectionContract = await deploy('CryptoKombatCollectionBinance', {
    from: deployer,
    args,
    log: true,
  })

  const isTest = hre.network.name === 'hardhat' || hre.network.name === 'localhost'

  if (!isTest) console.log('Collection deployed successfully: ', collectionContract.address)

  // await hre.ethernal.push({
  //   name: 'CryptoKombatCollectionBinance',
  //   address: collectionContract.address,
  // })

  if (!isTest) {
    try {
      console.log('Waiting to verify...')

      await sleep(25000)

      await run('verify:verify', {
        address: collectionContract.address,
        constructorArguments: args,
        contract: 'contracts/ERC1155/CryptoKombatCollectionBinance.sol:CryptoKombatCollectionBinance',
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (!isTest) console.log('Done')
}

export default func
func.tags = ['CollectionBsc']
