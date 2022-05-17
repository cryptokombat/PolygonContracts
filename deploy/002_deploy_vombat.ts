import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { sleep } from '../src/utils'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, run } = hre
  const { deploy } = deployments

  const args: any[] = []

  const { deployer } = await getNamedAccounts()
  const vombat = await deploy('VombatToken', {
    from: deployer,
    args,
    proxy: {
      proxyContract: 'OptimizedTransparentProxy',
      methodName: 'initialize',
    },
    log: true,
  })

  const proxyAdminContract = await hre.ethers.getContract('DefaultProxyAdmin')

  const isTest = hre.network.name === 'hardhat' || hre.network.name === 'localhost'

  // await hre.ethernal.push({
  //   name: 'DefaultProxyAdmin',
  //   address: proxyAdminContract.address,
  // })

  // await hre.ethernal.push({
  //   name: 'VombatToken',
  //   address: vombat.address,
  // })

  if (!isTest) {
    console.log(`Default Proxy Admin [${proxyAdminContract.address}]`)
    console.log(`Vombat Token Proxy  [${vombat.address}]`)
    console.log(`Vombat Token Impl   [${vombat.implementation}]`)
  }

  if (!isTest) {
    try {
      console.log('Waiting to verify...')

      await sleep(25000)

      await run('verify:verify', {
        address: vombat.implementation,
        constructorArguments: [],
        contract: 'contracts/upgradable/ERC20/VombatToken.sol:VombatToken',
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (!isTest) console.log('Done')
}

export default func
func.tags = ['Vombat']
