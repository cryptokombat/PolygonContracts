import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { sleep } from '../src/utils'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, run } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  const vombat = await hre.ethers.getContract('VombatToken')

  const args = [vombat.address]

  const faucetContract = await deploy('VombatFaucet', {
    from: deployer,
    args,
    log: true,
  })

  const isTest = hre.network.name === 'hardhat' || hre.network.name === 'localhost'

  console.log('VombatFaucet deployed successfully: ', faucetContract.address)

  if (hre.network.name !== 'hardhat' && hre.network.name !== 'localhost') {
    try {
      console.log('Waiting to verify...')

      await sleep(25000)

      await run('verify:verify', {
        address: faucetContract.address,
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
func.tags = ['Faucet']
func.dependencies = ['Vombat', 'CollectionEth', 'CollectionBsc', 'Consumables']
