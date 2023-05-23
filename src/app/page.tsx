import Image from 'next/image'
import Head from 'next/head'
import {BsFillMoonStarsFill} from 'react-icons/bs'
import {AiFillLinkedin} from 'react-icons/ai'

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
          <nav className='p-10 mb-12 flex justify-between'>
            <h1 className='text-xl font-burtons uppercase'>Portfolio Page</h1>
            <ul className='flex items-center'>
              <li>
                <BsFillMoonStarsFill className='cursor-pointer text-2xl'/>
              </li>
              <li>
                <a className='bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8' href="#">Resume</a>
              </li>
            </ul>
          </nav>
          <div className='text-center p-10'>
            <h2 className='text-5xl py-2 text-teal-600 font-medium'>Luis Lozoya</h2>
            <h3 className='text-2xl py-2'>Developer and designer.</h3>
            <p className='text-md py-5 leading-8'>I am a Full Stack Developer, with experience in front and back end.
              I am originally from Spain where I graduated in 2012 with a bachelor's degree
              in Architectural Engineering. After years of experience in construction and design,
              I enrolled JRS Coding School where I graduated in 2020 as a Software Developer.
            </p>
          </div>
          <div className='text-5xl flex justify-center gap-16 py-3 text-gray-600'>
            <AiFillLinkedin />
          </div>
        </section>
      </main>
    </div>
  )
}
