"use client";
import Image from "next/image";
import Head from "next/head";
import { BsFillMoonFill, BsFillBrightnessHighFill } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import photo from "../../public/pictures/Photo-127.jpg";
import design from "../../public/others/react-js-4642758.png";
import code from "../../public/others/4521476.png";
import consulting from "../../public/others/web-development-5171264-4316413.png";
import cyber from "../../public/others/4159897.png";
import web1 from "../../public/pictures/rental.png";
import web2 from "../../public/pictures/weather.png";
import web3 from "../../public/pictures/langchain.png";
import web4 from "../../public/pictures/Screenshot (117).png";
import certification1 from "../../public/certifications/System Adm.png";
import certification2 from "../../public/certifications/THM-LJHNPB9YI3.png";
import certification3 from "../../public/certifications/THM-TGJRJ0ZZXT.png";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
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
              <button
                className="btn--download bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8 hover:opacity-50"
                onClick={() =>
                  window.open(
                    `https://github.com/Javierlozo/React-Portfolio/blob/main/Resume.pdf`,
                    "_blank"
                  )
                }
              >
                Resume
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
            <FaLinkedinIn
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
          <div className="relative mx-auto rounded-full w-36 h-36 mt-10 overflow-hidden md:h-30 md:w-30 mb-28">
            <Image src={photo} alt="" />
          </div>
        </section>
        {/* End of Section 1 - Description, Resume, Picture */}

        {/* Section 2 - Services */}
        <section>
          <hr />
          <div className="text-center">
            <h3 className="text-3xl pt-7 dark:text-white">Skills & Tools</h3>
            <p className="text-md py-5 leading-8 dark:text-white">
              Some of my skills and tools
            </p>
          </div>
          <div className="bg-gray-200 shadow-lg p-10 rounded-xl my-10 dark:bg-white">
            <div className="grid grid-cols-2 gap-4 content-normal lg:grid-cols-4">
              <div className="text-center">
                <Image
                  className="relative mx-auto"
                  src={design}
                  alt=""
                  width={100}
                  height={100}
                />
                <h3 className="text-sm font-medium pt-8 pb-2 text-teal-600 md:text-lg">
                  Front End
                </h3>
                <div className="border-2 border-teal-900 mb-3"></div>
                <p className="text-gray-800 py-1 text-sm">JavaScript</p>
                <p className="text-gray-800 py-1 text-sm">TypeScript</p>
                <p className="text-gray-800 py-1 text-sm">React</p>
                <p className="text-gray-800 py-1 text-sm">Angular</p>
                <p className="text-gray-800 py-1 text-sm">Python</p>
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
                <h3 className="text-sm font-medium pt-8 pb-2 text-teal-600 md:text-lg">
                  Back End
                </h3>
                <div className="border-2 border-teal-900 mb-3"></div>
                <p className="text-gray-800 py-1 text-sm">NodeJS</p>
                <p className="text-gray-800 py-1 text-sm">NextJS</p>
                <p className="text-gray-800 py-1 text-sm">NestJS</p>
                <p className="text-gray-800 py-1 text-sm">Express</p>
                <p className="text-gray-800 py-1 text-sm">MongoDB</p>
                <p className="text-gray-800 py-1 text-sm">CosmosDB</p>
                <p className="text-gray-800 py-1 text-sm">MySQL</p>
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
                <h3 className="text-sm font-medium pt-8 pb-2 text-teal-600 md:text-lg">
                  Tools
                </h3>
                <div className="border-2 border-teal-900 mb-3"></div>
                <p className="text-gray-800 py-1 text-sm">Github</p>
                <p className="text-gray-800 py-1 text-sm">Git</p>
                <p className="text-gray-800 py-1 text-sm">Figma</p>
                <p className="text-gray-800 py-1 text-sm">Rest API</p>
                <p className="text-gray-800 py-1 text-sm">Tailwind</p>
                <p className="text-gray-800 py-1 text-sm">Boostrap</p>
                <p className="text-gray-800 py-1 text-sm">Azure</p>
                <p className="text-gray-800 py-1 text-sm">AWS</p>
                <p className="text-gray-800 py-1 text-sm">Linux</p>
                <p className="text-gray-800 py-1 text-sm">Cypress</p>
              </div>
              <div className="text-center">
                <Image
                  className="relative mx-auto"
                  src={cyber}
                  alt=""
                  width={100}
                  height={100}
                />
                <h3 className="text-sm font-medium pt-8 pb-2 text-teal-600 md:text-lg">
                  Cyber
                </h3>
                <div className="border-2 border-teal-900 mb-3"></div>
                <p className="text-gray-800 py-1 text-sm">Metasploit</p>
                <p className="text-gray-800 py-1 text-sm">Burp Suite</p>
                <p className="text-gray-800 py-1 text-sm">BeEF</p>
                <p className="text-gray-800 py-1 text-sm">Nikto</p>
                <p className="text-gray-800 py-1 text-sm">WMAP</p>
                <p className="text-gray-800 py-1 text-sm">John the Ripper</p>
                <p className="text-gray-800 py-1 text-sm">Nmap/Zenmap</p>
                <p className="text-gray-800 py-1 text-sm">Masscan</p>
                <p className="text-gray-800 py-1 text-sm">Wireshark</p>
                <p className="text-gray-800 py-1 text-sm">tcpdump</p>
                <p className="text-gray-800 py-1 text-sm">OpenVAS</p>
                <p className="text-gray-800 py-1 text-sm">ICMP</p>
                <p className="text-gray-800 py-1 text-sm">Shodan</p>
              </div>
            </div>
          </div>
        </section>
        {/* End of Section 2 - Services */}
        {/* Section 3 - Portfolio */}
        <section>
          <hr />
          <div className="text-center">
            <h3 className="text-3xl pt-7 dark:text-white">Portfolio</h3>
            <div className="text-md pt-5 dark:text-white">
              Some of the projects that I have worked on
            </div>
            <div className="text-sm pb-7 dark:text-white">
              (Hover over any project to learn more, this portfolio page was
              also built with React, NextJS, TailwindCSS, and deployed on
              Vercel)
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 place-items-center pb-7">
            <div className="group">
              <div className="relative overflow-hidden">
                <div className="text-white px-3 rounded-2xl absolute h-full w-full bg-black/90 place-items-center text-center opacity-0 group-hover:bottom-0 group-hover:opacity-100 group-hover:rounded-br-2xl">
                  <div className="mt-20 text-2xl">Rental App</div>
                  <div className="pt-5">
                    A sport equipment rental application in Charleston, SC area.
                  </div>
                  <div className="pt-5 place-items-center">
                    <span className="bg-white text-black text-xs font-medium mr-2 px-3 py-1 rounded-2xl">
                      React
                    </span>
                    <span className="bg-white text-black text-xs font-medium mr-2 px-3 py-1 rounded-2xl">
                      Node.js
                    </span>
                    <span className="bg-white text-black text-xs font-medium mr-2 px-3 py-1 rounded-2xl">
                      AWS
                    </span>
                  </div>
                  <div className="pt-5">
                    <button
                      className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-1 rounded-md hover:opacity-70 mr-4"
                      onClick={() =>
                        window.open(
                          `https://javierlozo.github.io/Rental-App/`,
                          "_blank"
                        )
                      }
                    >
                      LIVE
                    </button>
                    <button
                      className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-1 rounded-md hover:opacity-70"
                      onClick={() =>
                        window.open(
                          `https://github.com/Javierlozo/Rental-App`,
                          "_blank"
                        )
                      }
                    >
                      CODE
                    </button>
                  </div>
                </div>
                <Image
                  src={web1}
                  className="image rounded-2xl w-60 md:w-64 lg:w-72 xl:w-96 cursor-pointer"
                  alt=""
                />
              </div>
            </div>
            <div className="group">
              <div className="relative overflow-hidden">
                <div className="text-white px-3 rounded-2xl absolute h-full w-full bg-black/90 place-items-center text-center opacity-0 group-hover:bottom-0 group-hover:opacity-100 group-hover:rounded-br-2xl">
                  <div className="mt-20 text-2xl">Weather App</div>
                  <div className="pt-5">
                    An application to check the weather in different cities in
                    the world.
                  </div>
                  <div className="pt-5 place-items-center">
                    <span className="bg-white text-black text-xs font-medium mr-2 px-3 py-1 rounded-2xl">
                      React
                    </span>
                    <span className="bg-white text-black text-xs font-medium mr-2 px-3 py-1 rounded-2xl">
                      REST API
                    </span>
                  </div>
                  <div className="pt-5">
                    <button
                      className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-1 rounded-md hover:opacity-70 mr-4"
                      onClick={() =>
                        window.open(
                          `https://javierlozo.github.io/WeatherCheck-API/`,
                          "_blank"
                        )
                      }
                    >
                      LIVE
                    </button>
                    <button
                      className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-1 rounded-md hover:opacity-70"
                      onClick={() =>
                        window.open(
                          `https://github.com/Javierlozo/WeatherCheck-API`,
                          "_blank"
                        )
                      }
                    >
                      CODE
                    </button>
                  </div>
                </div>
                <Image
                  src={web2}
                  className="image rounded-2xl w-60 md:w-64 lg:w-72 xl:w-96 cursor-pointer"
                  alt=""
                />
              </div>
            </div>
            <div className="group">
              <div className="relative overflow-hidden">
                <div className="text-white px-3 rounded-2xl absolute h-full w-full bg-black/90 place-items-center text-center opacity-0 group-hover:bottom-0 group-hover:opacity-100 group-hover:rounded-br-2xl">
                  <div className="mt-20 text-2xl">Youtube GPT Creator</div>
                  <div className="pt-5">An AutoGPT App.</div>
                  <div className="pt-5 place-items-center">
                    <span className="bg-white text-black text-xs font-medium mr-2 px-3 py-1 rounded-2xl">
                      Python
                    </span>
                    <span className="bg-white text-black text-xs font-medium mr-2 px-3 py-1 rounded-2xl">
                      LangChain
                    </span>
                  </div>
                  <div className="pt-5">
                    <button
                      className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-1 rounded-md hover:opacity-70"
                      onClick={() =>
                        window.open(
                          `https://github.com/Javierlozo/langchain-autogpt`,
                          "_blank"
                        )
                      }
                    >
                      CODE
                    </button>
                  </div>
                </div>
                <Image
                  src={web3}
                  className="image rounded-2xl w-60 md:w-64 lg:w-72 xl:w-96 cursor-pointer"
                  alt=""
                />
              </div>
            </div>
            <div className="group">
              <div className="relative overflow-hidden">
                <div className="text-white px-3 rounded-2xl absolute h-full w-full bg-black/90 place-items-center text-center opacity-0 group-hover:bottom-0 group-hover:opacity-100 group-hover:rounded-br-2xl">
                  <div className="mt-20 text-2xl">Old Portfolio Page</div>
                  <div className="pt-5">
                    Showcase of my projects and skills.
                  </div>
                  <div className="pt-5 place-items-center">
                    <span className="bg-white text-black text-xs font-medium mr-2 px-3 py-1 rounded-2xl">
                      React
                    </span>
                    <span className="bg-white text-black text-xs font-medium mr-2 px-3 py-1 rounded-2xl">
                      Node.js
                    </span>
                  </div>
                  <div className="pt-5">
                    <button
                      className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-1 rounded-md hover:opacity-70 mr-4"
                      onClick={() =>
                        window.open(
                          `https://javierlozo.github.io/portfolio/`,
                          "_blank"
                        )
                      }
                    >
                      LIVE
                    </button>
                    <button
                      className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-1 rounded-md hover:opacity-70"
                      onClick={() =>
                        window.open(
                          `https://github.com/Javierlozo/portfolio`,
                          "_blank"
                        )
                      }
                    >
                      CODE
                    </button>
                  </div>
                </div>
                <Image
                  src={web4}
                  className="image rounded-2xl w-60 md:w-64 lg:w-72 xl:w-96 cursor-pointer"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        {/* End of Section 3 - Portfolio */}
        {/* Section 4 - Certifications */}
        <section>
          <hr />
          <div className="text-center">
            <h3 className="text-3xl pt-7 dark:text-white">Certifications</h3>
            <p className="text-md py-5 leading-8 dark:text-white">
              Some of the certifications that I have obtained
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 place-items-center pb-7">
            <div className="py-3">
              <Image
                src={certification1}
                className="rounded-2xl w-80 hover:opacity-50 cursor-pointer"
                alt=""
                onClick={() =>
                  window.open(
                    `https://github.com/Javierlozo/React-Portfolio/blob/main/System%20Adm%203p.pdf`,
                    "_blank"
                  )
                }
              />
            </div>
            <div className="py-3">
              <Image
                src={certification2}
                className="rounded-2xl w-96 h-64 hover:opacity-50 cursor-pointer"
                alt=""
                onClick={() =>
                  window.open(
                    `https://github.com/Javierlozo/React-Portfolio/blob/main/THM-LJHNPB9YI3.png`,
                    "_blank"
                  )
                }
              />
            </div>
            <div className="py-3">
              <Image
                src={certification3}
                className="rounded-2xl w-96 h-64 hover:opacity-50 cursor-pointer"
                alt=""
                onClick={() =>
                  window.open(
                    `https://github.com/Javierlozo/React-Portfolio/blob/main/THM-TGJRJ0ZZXT.png`,
                    "_blank"
                  )
                }
              />
            </div>
          </div>
        </section>
        {/* End of Section 4 - Certifications */}
        <section>
          <hr />
          <div className="pt-7 text-3xl flex justify-center gap-3 text-gray-600">
            <FaLinkedinIn
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
          <div className="text-sm pt-3 pb-5 flex justify-center leading-8 dark:text-white">
            Developed and Designed by Luis Lozoya
          </div>
        </section>
      </main>
    </div>
  );
}
