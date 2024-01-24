import '../scss/globals.css' // Make sure the path is correct
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
