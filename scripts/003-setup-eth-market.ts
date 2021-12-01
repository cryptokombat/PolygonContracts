import hre from 'hardhat'

import { EthMarket, HeroEdition } from '../src/config'

import { CryptoKombatCollectionEthereum, KombatMarket } from '../typechain-types'

async function main() {
  const { getNamedAccounts, ethers } = hre
  const { deployer } = await getNamedAccounts()
  const signer = await ethers.getSigner(deployer)

  const collectionInstance = (await ethers.getContract(
    'CryptoKombatCollectionEthereum',
    signer
  )) as CryptoKombatCollectionEthereum
  const marketInstance = (await ethers.getContract('KombatMarket', signer)) as KombatMarket

  console.log('Collection instance loaded at %s', collectionInstance.address)
  console.log('Market instance loaded at %s', marketInstance.address)

  const market = EthMarket()

  console.log('[Market] Setting token prices...')
  // console.log('EPIC', market.edition[HeroEdition.EPIC], market.price[HeroEdition.EPIC])
  // console.log('RARE', market.edition[HeroEdition.RARE], market.price[HeroEdition.RARE])
  // console.log('COMMON', market.edition[HeroEdition.COMMON], market.price[HeroEdition.COMMON])

  await marketInstance.setTokenPrices(
    collectionInstance.address,
    [
      ...market.edition[HeroEdition.EPIC]!,
      ...market.edition[HeroEdition.RARE]!,
      ...market.edition[HeroEdition.COMMON]!,
    ],
    [
      ...market.price[HeroEdition.EPIC]!,
      ...market.price[HeroEdition.RARE]!,
      ...market.price[HeroEdition.COMMON]!,
    ]
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
