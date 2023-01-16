import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Helsinki City Bike App</title>
        <meta
          name="description"
          content="Helsinki City Bike App to display usage statistics."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bike-favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
