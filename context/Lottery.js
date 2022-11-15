/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react'
import { ADDRESS, CONTRACT_API } from '../constants'
import { BigNumber, ethers } from 'ethers'

const LotteryContext = createContext() // creating context API

// Lottery Provider
const LotteryProvider = ({ children }) => {
  const [account, setAccount] = useState('') // set address of connected account
  const [balance, setBalance] = useState(0)
  const [players, setPlayers] = useState([])
  const [winner, setWinner] = useState()
  const [lotteryId, setLotteryId] = useState(1)
  const [contract, setContract] = useState(null)

  // connect account
  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const { ethereum } = window
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (accounts.length > 0) {
          setAccount(accounts[0])
          initLotteryContract()
        } else {
          console.warn('No accounts found')
        }
        window.ethereum.on('accountsChanged', async () => {
          const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
          })
          /* set account 1 to React state */
          setAccount(accounts[0])
        })
      } catch (err) {
        console.error(err.message)
      }
    } else {
      console.log('Install Metamask.')
    }
  }
  //check if is wallet connected
  const isWallectConnected = async () => {
    try {
      const { ethereum } = window
      const accounts = await ethereum.request({
        method: 'eth_accounts',
      })
      if (accounts.length > 0) {
        setAccount(accounts[0])
      } else {
        console.warn('No accounts found')
      }
    } catch (err) {
      console.error(err.message)
    }
  }
  // enter a lottery
  const enterLottery = async () => {
    try {
      if (account) {
        console.log(await contract.owner())
        await contract.enter({
          from: account,
          value: ethers.utils.parseEther('0.01'),
          gasLimit: 1000000,
        })
        window.location.reload()
        updateLottery()
      }
    } catch (err) {
      console.error(err)
    }
  }

  // connect to the lottery contract
  const initLotteryContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const lotteryContract = new ethers.Contract(ADDRESS, CONTRACT_API, signer)
    setContract(lotteryContract)
  }

  const updateLottery = async () => {
    if (contract) {
      const lotteryBalance = await contract.getLotteryBalance()

      setBalance(ethers.utils.formatEther(lotteryBalance.toString()) + ' ETH') // set contract balance
      // get Lottery Id
      const lottery_Id = await contract.lotteryId()
      setLotteryId(lottery_Id.toString())
      // get Players
      const playerList = await contract.getPlayers()
      setPlayers(playerList)
    }
  }
  const pickWinner = async () => {
    if (contract) {
      try {
        await contract.pickedWinner({
          from: account,
          gasLimit: 1000000,
        })
        window.location.reload()
      } catch (err) {
        console.error(err.message)
      }
    }
  }
  useEffect(() => {
    // isWallectConnected()

    updateLottery()
  }, [contract])
  return (
    <LotteryContext.Provider
      value={{
        connectWallet,
        account,
        enterLottery,
        balance,
        lotteryId,
        players,
        pickWinner,
      }}
    >
      {children}
    </LotteryContext.Provider>
  )
}

// use context
export const useLottery = () => {
  return useContext(LotteryContext)
}

export default LotteryProvider
