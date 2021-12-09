import hre from 'hardhat'

import { VombatToken, KombatGame } from '../typechain-types'

async function main() {
  const { getNamedAccounts, ethers } = hre
  const { deployer } = await getNamedAccounts()
  const signer = await ethers.getSigner(deployer)

  const vombatInstance = (await ethers.getContract('VombatToken', signer)) as VombatToken
  const gameInstance = (await ethers.getContract('KombatGame', signer)) as KombatGame

  console.log('VombatToken instance loaded at %s', vombatInstance.address)
  console.log('KombatGame instance loaded at %s', gameInstance.address)

  const minterRole = ethers.utils.id('MINTER_ROLE')
  const automationRole = ethers.utils.id('AUTOMATION_ROLE')

  console.log(`[Vombat] Setting minter role for [KombatGame]:'${gameInstance.address}'`)
  await vombatInstance.grantRole(minterRole, gameInstance.address)

  console.log(`[Game] Setting automation role for [Backend]:'${deployer}'`)
  await gameInstance.grantRole(automationRole, deployer)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
