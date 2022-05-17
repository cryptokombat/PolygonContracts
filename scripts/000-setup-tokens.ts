import hre from 'hardhat'
import { tokenToWei } from '../src/utils'

import { KombatToken, VombatToken } from '../typechain-types'

async function main() {
  const { getNamedAccounts, ethers } = hre
  const { deployer } = await getNamedAccounts()
  const signer = await ethers.getSigner(deployer)

  const kombatInstance = (await ethers.getContract('KombatToken', signer)) as KombatToken
  const vombatInstance = (await ethers.getContract('VombatToken', signer)) as VombatToken

  console.log('KombatToken instance loaded at %s', kombatInstance.address)
  console.log('VombatToken instance loaded at %s', vombatInstance.address)

  const supply = await vombatInstance.totalSupply()

  if (supply.eq(0)) {
    console.log('[Token] Minting new tokens...')
    //await kombatInstance.mint(deployer, tokenToWei(1000, 8))
    await vombatInstance.mint(deployer, tokenToWei(1000))
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
