import Link from 'next/link'
import { AiFillWallet } from 'react-icons/ai'
import { shortenAddress } from '../constants'
import { useLottery } from '../context/Lottery'
export default function Header() {
  const { connectWallet, account } = useLottery()
  return (
    <header className='w-full md:py-3 py-2 bg-cyan-50 dark:bg-gray-900 shadow-lg'>
      <nav className='flex justify-between   md:container mx-auto px-5 md:px-0'>
        <Link href='/'>
          <h1 className='text-xl font-bold dark:text-cyan-500 text-cyan-900'>
            Lottery 💰
          </h1>
        </Link>
        {account ? (
          <p className='text-cyan-500 font-medium bg-cyan-200 rounded-full px-3 py-1'>
            👋 Welcome,{' '}
            <span className='text-red-500'>{shortenAddress(account)}</span>
          </p>
        ) : (
          <button
            onClick={() => connectWallet()}
            className='md:text-lg flex items-center text-cyan-800 font-medium bg-gray-200 rounded-full px-3 py-1 transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-cyan-800 outline-none border-none'
          >
            <AiFillWallet className='w-6 h-6 mr-1' /> Connect
          </button>
        )}
      </nav>
    </header>
  )
}
