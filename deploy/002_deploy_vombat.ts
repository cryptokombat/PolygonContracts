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
    log: true,
  })

  const isTest = hre.network.name === 'hardhat' || hre.network.name === 'localhost'

  if (!isTest) console.log('VombatToken deployed successfully: ', vombat.address)

  if (!isTest) {
    try {
      console.log('Waiting to verify...')

      await sleep(25000)

      await run('verify:verify', {
        address: vombat.address,
        constructorArguments: args,
        contract: 'contracts/ERC20/VombatToken.sol:VombatToken',
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (!isTest) console.log('Done')
}

export default func
func.tags = ['Vombat']
