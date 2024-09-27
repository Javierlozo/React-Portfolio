"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faJs,
  faReact,
  faAngular,
  faNode,
  faAws,
  faPython,
  faGitAlt,
  faGithub,
  faLinux,
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

export default function Skills() {
  return (
    <section id="skills" className="bg-gray-200 dark:bg-white">
      <hr className="my-8" />
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold dark:text-gray-900">
          Skills & Tools
        </h3>
        <p className="text-md md:text-lg lg:text-xl py-5 leading-8 dark:text-gray-700">
          Some of my skills and tools
        </p>
      </div>
      <div className="shadow-lg p-10 rounded-xl my-10">
        <div className="flex flex-wrap justify-center">
          {/* Front End Skills */}
          <div className="w-full sm:w-1/2 lg:w-1/4 p-4 text-center">
            <h4 className="text-lg md:text-xl font-semibold text-teal-600">
              Front End
            </h4>
            <div className="border-2 border-teal-900 mb-3 mx-auto w-16"></div>
            <ul className="space-y-4">
              <li className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faJs}
                  size="2x"
                  className="text-yellow-500"
                />
                <p className="mt-2">JavaScript</p>
              </li>
              <li className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faReact}
                  size="2x"
                  className="text-blue-500"
                />
                <p className="mt-2">React</p>
              </li>
              <li className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faAngular}
                  size="2x"
                  className="text-red-500"
                />
                <p className="mt-2">Angular</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">TypeScript</p>
              </li>
              <li className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faPython}
                  size="2x"
                  className="text-blue-600"
                />
                <p className="mt-2">Python</p>
              </li>
            </ul>
          </div>
          {/* Back End Skills */}
          <div className="w-full sm:w-1/2 lg:w-1/4 p-4 text-center">
            <h4 className="text-lg md:text-xl font-semibold text-teal-600">
              Back End
            </h4>
            <div className="border-2 border-teal-900 mb-3 mx-auto w-16"></div>
            <ul className="space-y-4">
              <li className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faNode}
                  size="2x"
                  className="text-green-500"
                />
                <p className="mt-2">Node.js</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Next.js</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">NestJS</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Express</p>
              </li>
              <li className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faDatabase}
                  size="2x"
                  className="text-gray-800"
                />
                <p className="mt-2">MongoDB</p>
              </li>
              <li className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faDatabase}
                  size="2x"
                  className="text-blue-500"
                />
                <p className="mt-2">MySQL</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">CosmosDB</p>
              </li>
            </ul>
          </div>
          {/* Tools */}
          <div className="w-full sm:w-1/2 lg:w-1/4 p-4 text-center">
            <h4 className="text-lg md:text-xl font-semibold text-teal-600">
              Tools
            </h4>
            <div className="border-2 border-teal-900 mb-3 mx-auto w-16"></div>
            <ul className="space-y-4">
              <li className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faGitAlt}
                  size="2x"
                  className="text-orange-500"
                />
                <p className="mt-2">Git</p>
              </li>
              <li className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faGithub}
                  size="2x"
                  className="text-gray-900"
                />
                <p className="mt-2">GitHub</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Figma</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">REST API</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Tailwind</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Bootstrap</p>
              </li>
              <li className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faAws}
                  size="2x"
                  className="text-orange-500"
                />
                <p className="mt-2">AWS</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Azure</p>
              </li>
              <li className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faLinux}
                  size="2x"
                  className="text-black"
                />
                <p className="mt-2">Linux</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Cypress</p>
              </li>
            </ul>
          </div>
          {/* Cyber Security */}
          <div className="w-full sm:w-1/2 lg:w-1/4 p-4 text-center">
            <h4 className="text-lg md:text-xl font-semibold text-teal-600">
              Cyber
            </h4>
            <div className="border-2 border-teal-900 mb-3 mx-auto w-16"></div>
            <ul className="space-y-4">
              <li className="flex flex-col items-center">
                <p className="mt-2">Metasploit</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Burp Suite</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">BeEF</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Nikto</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">WMAP</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">John the Ripper</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Nmap/Zenmap</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Masscan</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Wireshark</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">tcpdump</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">OpenVAS</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">ICMP</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Shodan</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
