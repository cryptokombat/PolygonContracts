import hre from 'hardhat'
import { tokenToWei } from '../src/utils'

import { KombatToken, VombatToken, KombatGame } from '../typechain-types'

async function main() {
  const { getNamedAccounts, ethers } = hre
  const { deployer } = await getNamedAccounts()
  const signer = await ethers.getSigner(deployer)

  const kombatInstance = (await ethers.getContract('KombatToken', signer)) as KombatToken
  const vombatInstance = (await ethers.getContract('VombatToken', signer)) as VombatToken
  const gameInstance = (await ethers.getContract('KombatGame', signer)) as KombatGame

  console.log('KombatToken instance loaded at %s', kombatInstance.address)
  console.log('VombatToken instance loaded at %s', vombatInstance.address)
  console.log('KombatGame instance loaded at %s', gameInstance.address)

  const supply = await kombatInstance.totalSupply()
  const minterRole = await vombatInstance.MINTER_ROLE()

  if (supply.eq(0)) {
    console.log('[Token] Minting new tokens...')
    await kombatInstance.mint(deployer, tokenToWei(1000, 8))
    await vombatInstance.mint(deployer, tokenToWei(1000))

    console.log('[Token] Setting minter role...')
    await vombatInstance.grantRole(minterRole, gameInstance.address)
  } else {
    console.log('[Token] Minting skipped...')
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
