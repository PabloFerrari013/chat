import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SessionProvider from '@/contexts/sessionContext'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <ToastContainer />

        <Head>
          <title>MyChat_</title>
        </Head>

        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}
