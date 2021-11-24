import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { sleep } from '../src/utils'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, run } = hre
  const { deploy } = deployments

  const args: any[] = []

  const { deployer } = await getNamedAccounts()
  const kombat = await deploy('KombatToken', {
    from: deployer,
    args,
    log: true,
  })

  console.log('KombatToken deployed successfully: ', kombat.address)

  if (hre.network.name !== 'hardhat' && hre.network.name !== 'localhost') {
    try {
      console.log('Waiting to verify...')

      await sleep(25000)

      await run('verify:verify', {
        address: kombat.address,
        constructorArguments: args,
      })
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('Verification skipped...')
  }
  console.log('Done')
}

export default func
func.tags = ['Kombat']
