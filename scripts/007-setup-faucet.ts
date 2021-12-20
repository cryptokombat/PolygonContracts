import hre from 'hardhat'

import { VombatToken, VombatFaucet } from '../typechain-types'

async function main() {
  const { getNamedAccounts, ethers } = hre
  const { deployer } = await getNamedAccounts()
  const signer = await ethers.getSigner(deployer)

  const vombatInstance = (await ethers.getContract('VombatToken', signer)) as VombatToken
  const faucetInstance = (await ethers.getContract('VombatFaucet', signer)) as VombatFaucet

  console.log('VombatToken instance loaded at %s', vombatInstance.address)
  console.log('VombatFaucet instance loaded at %s', faucetInstance.address)

  const minterRole = ethers.utils.id('MINTER_ROLE')

  console.log(`[Vombat] Setting minter role for [VombatFaucet]:'${faucetInstance.address}'`)
  await vombatInstance.grantRole(minterRole, faucetInstance.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
