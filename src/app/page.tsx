"use client";
import Image from "next/image";
import Head from "next/head";
import { BsFillMoonFill, BsFillBrightnessHighFill } from "react-icons/bs";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import photo from "../../public/pictures/user-002.jpeg";
import design from "../../public/others/react-js-4642758.png";
import code from "../../public/others/4521476.png";
import consulting from "../../public/others/web-development-5171264-4316413.png";
import web1 from "../../public/pictures/rental.png";
import web2 from "../../public/pictures/weather.png";
import web3 from "../../public/pictures/localhost_8501_.png";
import web4 from "../../public/pictures/Screenshot (117).png";
import { useState } from "react";
import resume from "../../public/pictures/picture1.jpg";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const toggle = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Luis Lozoya Portfolio Page</title>
        <meta name="description" content="Portfolio Page"></meta>
        <link rel="icon" href="/favicon.cio"></link>
      </Head>

      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
        {/* Section 1 - Description, Resume, Picture */}
        <section>
          <nav className="p-10 mb-12 flex justify-between">
            <button onClick={toggle}>
              {darkMode ? (
                <BsFillBrightnessHighFill className="text-white" width={20} />
              ) : (
                <BsFillMoonFill />
              )}
            </button>
            <div className="flex items-center">
              <button className="btn--download bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8 hover:opacity-50">
                <a download={resume}>Resume</a>
              </button>
            </div>
          </nav>
          <div className="text-center p-10">
            <h2 className="text-4xl text-teal-600 font-medium md:text-5xl">
              Luis Lozoya
            </h2>
            <h3 className="text-2xl pt-5 sm:text-3xl md:text-5xl dark:text-white">
              Full Stack Developer
            </h3>
            <p className="text-md pt-2 leading-8 md:text-xl max-w-xl mx-auto dark:text-white">
              React | Angular | NextJS | NestJS
            </p>
          </div>
          <div className="text-3xl flex justify-center gap-6 text-gray-600">
            <AiFillLinkedin
              className="dark:text-white hover:opacity-50 cursor-pointer"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/in/luisjlozoya/`,
                  "_blank"
                )
              }
            />
            <AiFillGithub
              className="dark:text-white hover:opacity-50 cursor-pointer"
              onClick={() =>
                window.open(`https://github.com/Javierlozo`, "_blank")
              }
            />
          </div>
          <div className="relative mx-auto bg-gradient-to-b from-teal-500 rounded-full w-28 h-28 mt-10 overflow-hidden md:h-30 md:w-30">
            <Image src={photo} alt="" />
          </div>
        </section>
        {/* End of Section 1 - Description, Resume, Picture */}

        {/* Section 2 - Services */}
        <section>
          <div className="text-center">
            <h3 className="text-3xl pt-20 dark:text-white">Skills</h3>
            <p className="text-md py-5 leading-8 dark:text-white">
              Some of my skills
            </p>
          </div>
          <div className="bg-gray-200 shadow-lg p-10 rounded-xl my-10 dark:bg-white">
            <div className="grid grid-cols-3 gap-4 content-normal">
              <div className="text-center">
                <Image
                  className="relative mx-auto"
                  src={design}
                  alt=""
                  width={100}
                  height={100}
                />
                <h3 className="text-base font-medium pt-8 pb-2 text-teal-600 md:text-lg">
                  Front End
                </h3>
                <div className="border-2 border-teal-900 mb-3"></div>
                <p className="text-gray-800 py-1">JavaScript</p>
                <p className="text-gray-800 py-1">TypeScript</p>
                <p className="text-gray-800 py-1">React</p>
                <p className="text-gray-800 py-1">Angular</p>
              </div>
              {/* <div className="border border-teal-900 mx-10"></div> */}
              <div className="text-center">
                <Image
                  className="relative mx-auto"
                  src={code}
                  alt=""
                  width={100}
                  height={100}
                />
                <h3 className="text-base font-medium pt-8 pb-2 text-teal-600 md:text-lg">
                  Back End
                </h3>
                <div className="border-2 border-teal-900 mb-3"></div>
                <p className="text-gray-800 py-1">NodeJS</p>
                <p className="text-gray-800 py-1">NextJS</p>
                <p className="text-gray-800 py-1">NestJS</p>
                <p className="text-gray-800 py-1">Express</p>
                <p className="text-gray-800 py-1">MongoDB</p>
                <p className="text-gray-800 py-1">CosmosDB</p>
                <p className="text-gray-800 py-1">MySQL</p>
              </div>
              {/* <div className="border border-teal-900 mx-10"></div> */}
              <div className="text-center">
                <Image
                  className="relative mx-auto"
                  src={consulting}
                  alt=""
                  width={100}
                  height={100}
                />
                <h3 className="text-base font-medium pt-8 pb-2 text-teal-600 md:text-lg">
                  Tools
                </h3>
                <div className="border-2 border-teal-900 mb-3"></div>
                <p className="text-gray-800 py-1">Github</p>
                <p className="text-gray-800 py-1">Git</p>
                <p className="text-gray-800 py-1">Figma Design</p>
                <p className="text-gray-800 py-1">Rest API</p>
                <p className="text-gray-800 py-1">Tailwind</p>
                <p className="text-gray-800 py-1">Boostrap</p>
                <p className="text-gray-800 py-1">Azure</p>
                <p className="text-gray-800 py-1">AWS</p>
                <p className="text-gray-800 py-1">Linux</p>
                <p className="text-gray-800 py-1">Cypress Testing</p>
              </div>
            </div>
          </div>
        </section>
        {/* End of Section 2 - Services */}
        {/* Section 3 - Portfolio */}
        <section>
          <div className="text-center">
            <h3 className="text-3xl pt-12 dark:text-white">Portfolio</h3>
            <p className="text-md py-5 leading-8 dark:text-white">
              Some of the projects that I have worked on
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 place-items-center">
            <div className="py-3">
              <Image
                src={web1}
                className="rounded-2xl w-60 md:w-64 lg:w-72 xl:w-96 hover:opacity-50 cursor-pointer"
                alt=""
                onClick={() =>
                  window.open(
                    `https://javierlozo.github.io/Rental-App/`,
                    "_blank"
                  )
                }
              />
            </div>
            <div className="py-3">
              <Image
                src={web2}
                className="rounded-2xl w-60 md:w-64 lg:w-72 xl:w-96 hover:opacity-50 cursor-pointer"
                title="An application to check the weather in different cities in the world. It was created with React and using a REST API to get all the information for the weather."
                alt=""
                onClick={() =>
                  window.open(
                    `https://javierlozo.github.io/WeatherCheck-API/`,
                    "_blank"
                  )
                }
              />
            </div>
            <div className="py-3">
              <Image
                src={web3}
                className="rounded-2xl w-60 md:w-64 lg:w-72 xl:w-96 hover:opacity-50 cursor-pointer"
                alt=""
                onClick={() =>
                  window.open(
                    `https://javierlozo.github.io/WeatherCheck-API/`,
                    "_blank"
                  )
                }
              />
            </div>
            <div className="py-3">
              <Image
                src={web4}
                className="rounded-2xl w-60 md:w-64 lg:w-72 xl:w-96 hover:opacity-50 cursor-pointer"
                alt=""
                onClick={() =>
                  window.open(
                    `https://javierlozo.github.io/portfolio/`,
                    "_blank"
                  )
                }
              />
            </div>
          </div>
        </section>
        {/* End of Section 3 - Portfolio */}
      </main>
    </div>
  );
}
