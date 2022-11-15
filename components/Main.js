import { shortenAddress } from '../constants'
import {
  AiOutlineEnter,
  AiFillRocket,
  AiFillWallet,
  AiOutlineDollar,
} from 'react-icons/ai'
import { useLottery } from '../context/Lottery'
import { SpinnerCircular } from 'spinners-react'
import { useState } from 'react'

function Main() {
  const { enterLottery, balance, lotteryId, players, pickWinner } = useLottery()

  return (
    <div className='w-full'>
      <div className='md:w-1/3 w-3/4 mx-auto bg-gray-300 dark:bg-gray-900 mt-10 rounded-lg p-5 drop-shadow-xl'>
        <div className='flex flex-col items-center my-2 '>
          <div className='text-gray-700 dark:text-gray-100 md:text-2xl text-lg font-semibold'>
            Lottery <span className='mx-1 text-cyan-500'>#{lotteryId}</span>
          </div>
          <div className='md:text-lg text-base font-medium text-gray-800 my-2 '>
            Balance 🍯: <span className='text-cyan-600'>{balance}</span>
          </div>
          <div className='md:text-lg font-medium my-2 text-gray-800'>
            🏆Last Winners🏆
          </div>
          <div className='text-base text-cyan-600 font-sans'>
            {shortenAddress('0x80b27ec5c689954d20c4ce314891396622d2f98f')}
          </div>
          <div className='flex items-center my-5'>
            <button
              onClick={enterLottery}
              className='md:text-lg flex items-center  text-cyan-800 font-medium bg-cyan-500 rounded-full px-3 py-1 transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-cyan-800 outline-none border-none mx-2'
            >
              <AiOutlineEnter className='w-5 h-5 mr-1' /> Enter
            </button>
            <button
              onClick={pickWinner}
              className='md:text-lg flex items-center text-cyan-800 font-medium bg-cyan-500 rounded-full px-3 py-1 transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-cyan-800 outline-none border-none mx-2'
            >
              <AiFillRocket className='w-5 h-5 mr-1' /> Pick Winner
            </button>
          </div>
        </div>
      </div>

      <div className='mt-2'>
        <table className='max-w-5xl mx-auto table-auto'>
          <thead className='justify-between'>
            <tr className='bg-cyan-500'>
              <th className='px-16 py-2'>
                <AiFillWallet className='inline' />{' '}
                <span className='ml-1 text-gray-700'>Address</span>
              </th>
              <th className='px-16 py-2'>
                <AiOutlineDollar className='inline' />
                <span className='ml-1 text-gray-700'>Amount</span>
              </th>
            </tr>
          </thead>
          <tbody className='bg-gray-200'>
            {players.map((player, index) => {
              return (
                <tr key={index} className='bg-white border-b-2 border-gray-200'>
                  <td className='px-16 py-2 flex flex-row items-center'>
                    <span className='text-cyan-400 font-semibold'>
                      {' '}
                      {shortenAddress(player)}
                    </span>
                  </td>
                  <td className='text-center'>
                    <span className='text-cyan-700'>+0.01</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Main
