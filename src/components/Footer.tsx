// src/components/Footer.tsx

"use client";
import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} Luis Lozoya. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-4 text-2xl">
          <FaLinkedinIn
            className="hover:text-teal-500 cursor-pointer transition-colors duration-300"
            onClick={() =>
              window.open("https://www.linkedin.com/in/luisjlozoya/", "_blank")
            }
          />
          <AiFillGithub
            className="hover:text-teal-500 cursor-pointer transition-colors duration-300"
            onClick={() =>
              window.open("https://github.com/Javierlozo", "_blank")
            }
          />
        </div>
      </div>
    </footer>
  );
}
