import Image from 'next/image'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Luis Lozoya Portfolio Page</title>
        <meta name='description' content='Portfolio Page'></meta>
        <link rel='icon' href='/favicon.cio'></link>
      </Head>
      <main>
        <section className='bg-gray-800 h-screen'>
          <h1>Hello</h1>
        </section>
      </main>
    </div>
  )
}
