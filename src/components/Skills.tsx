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
    <section
      id="skills"
      className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-10"
    >
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
          Skills & Tools
        </h3>
        <p className="text-md md:text-lg lg:text-xl py-5 leading-8 text-gray-700 dark:text-gray-300">
          Some of my skills and tools
        </p>
      </div>
      <div className="shadow-lg p-10 rounded-xl my-10 bg-gray-50 dark:bg-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Front End Skills */}
          <div className="p-4 text-center">
            <h4 className="text-lg md:text-xl font-semibold text-teal-600 dark:text-teal-400">
              Front End
            </h4>
            <div className="border-2 border-teal-900 dark:border-teal-400 mb-3 mx-auto w-24"></div>
            <ul className="space-y-4">
              <li className="flex flex-col items-center">
                <p className="mt-2">JavaScript</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">React</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Angular</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">TypeScript</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Python</p>
              </li>
            </ul>
          </div>
          {/* Back End Skills */}
          <div className="p-4 text-center">
            <h4 className="text-lg md:text-xl font-semibold text-teal-600 dark:text-teal-400">
              Back End
            </h4>
            <div className="border-2 border-teal-900 dark:border-teal-400 mb-3 mx-auto w-24"></div>
            <ul className="space-y-4">
              <li className="flex flex-col items-center">
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
                <p className="mt-2">MongoDB</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">MySQL</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">CosmosDB</p>
              </li>
            </ul>
          </div>
          {/* Tools */}
          <div className="p-4 text-center">
            <h4 className="text-lg md:text-xl font-semibold text-teal-600 dark:text-teal-400">
              Cloud & DevOps
            </h4>
            <div className="border-2 border-teal-900 dark:border-teal-400 mb-3 mx-auto w-40"></div>
            <ul className="space-y-4">
              <li className="flex flex-col items-center">
                <p className="mt-2">Git</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">GitHub</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Figma</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Tailwind</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Bootstrap</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">AWS</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Azure</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Linux</p>
              </li>
            </ul>
          </div>
          {/* Cybersecurity */}
          <div className="p-4 text-center">
            <h4 className="text-lg md:text-xl font-semibold text-teal-600 dark:text-teal-400">
              Cybersecurity Tools
            </h4>
            <div className="border-2 border-teal-900 dark:border-teal-400 mb-3 mx-auto w-52"></div>
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
          {/* Testing */}
          <div className="p-4 text-center">
            <h4 className="text-lg md:text-xl font-semibold text-teal-600 dark:text-teal-400">
              Testing & API Development
            </h4>
            <div className="border-2 border-teal-900 dark:border-teal-400 mb-3 mx-auto w-72"></div>
            <ul className="space-y-4">
              <li className="flex flex-col items-center">
                <p className="mt-2">Cypress</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">REST APIs</p>
              </li>
              <li className="flex flex-col items-center">
                <p className="mt-2">Axios</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
