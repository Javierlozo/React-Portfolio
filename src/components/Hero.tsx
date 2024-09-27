// components/Hero.tsx

"use client";
import React from "react";
import Image from "next/image";
import photo from "@/src/public/pictures/Photo-127.jpg";

export default function Hero() {
  const scrollToPortfolio = () => {
    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="text-center p-10 bg-gradient-to-b from-teal-100 to-white dark:from-gray-800 dark:to-gray-900 pt-24"
      id="hero"
    >
      <h2 className="text-4xl text-teal-600 font-bold md:text-5xl">
        Luis Lozoya
      </h2>
      <h3 className="text-2xl pt-5 sm:text-3xl md:text-5xl text-gray-800 dark:text-white">
        Full Stack Developer
      </h3>
      <p className="text-md pt-2 leading-8 md:text-xl max-w-xl mx-auto text-gray-600 dark:text-gray-300">
        React | Angular | NextJS | NestJS
      </p>
      <button
        className="mt-5 bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600"
        onClick={scrollToPortfolio}
      >
        View My Work
      </button>
      <div className="relative mx-auto rounded-full w-36 h-36 mt-10 overflow-hidden md:h-48 md:w-48">
        <Image
          src={photo}
          alt="Portrait of Luis Lozoya"
          width={192}
          height={192}
          className="object-cover"
        />
      </div>
    </section>
  );
}
