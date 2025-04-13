import Layout from '@/components/layout/Layout'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" autoClose={5000} />
    </Layout>
  )
}

export default App
