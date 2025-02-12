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
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black"
      id="hero"
    >
      {/* Modern gradient orbs in background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-orb-1 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-orb-2 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-orb-3 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-blue-400 mb-6 animate-fade-in">
          Luis Lozoya
        </h2>
        <h3
          className="text-2xl sm:text-3xl md:text-5xl text-white mb-8 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Full Stack Developer
        </h3>
        <p
          className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-300 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          React | Angular | NextJS | NestJS
        </p>
        <button
          onClick={scrollToPortfolio}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl animate-fade-in animate-float"
          style={{ animationDelay: "0.6s" }}
        >
          View My Work
        </button>
      </div>

      {/* Profile Image */}
      <div
        className="relative mx-auto mt-12 sm:mt-16 w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 animate-fade-in"
        style={{ animationDelay: "0.8s" }}
      >
        <Image
          src={photo}
          alt="Portrait of Luis Lozoya"
          className="rounded-full border-4 border-white/10 shadow-2xl hover:scale-105 transition-transform duration-300"
          width={224}
          height={224}
          priority
        />
      </div>
    </section>
  );
}
