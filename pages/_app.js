import '../styles/globals.css'
import LotteryProvider from '../context/Lottery'
function MyApp({ Component, pageProps }) {
  return (
    <LotteryProvider>
      <Component {...pageProps} />
    </LotteryProvider>
  )
}

export default MyApp
