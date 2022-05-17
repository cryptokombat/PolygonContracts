import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  const bridge = await deploy('MockBridge', {
    from: deployer,
    args: [],
    log: true,
  })

  const proxy = await deploy('MockProxyRegistry', {
    from: deployer,
    args: [],
    log: true,
  })

  // await hre.ethernal.push({
  //   name: 'MockBridge',
  //   address: bridge.address,
  // })
  // await hre.ethernal.push({
  //   name: 'MockProxyRegistry',
  //   address: proxy.address,
  // })
}

export default func
func.tags = ['Mocks']
