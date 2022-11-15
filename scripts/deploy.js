const { run, ethers, network } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()
  const balanceOnWei = await deployer.getBalance()
  console.log(
    `Your balance is ${ethers.utils.formatUnits(balanceOnWei, 'ether')} ETH`
  )
  const contractFactory = await ethers.getContractFactory('Lottery')
  console.log('Deploying Contract ...')
  const contract = await contractFactory.deploy()
  await contract.deployed()
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API) {
    await contract.deployTransaction.wait(6)
    await verify(contract.address, [])
  }
}

const verify = async (contractAddress, args = []) => {
  console.log('Verifying Contract ...')
  try {
    run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (err) {
    if (err.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified')
    } else {
      console.log(err)
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
