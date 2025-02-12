"use client";
import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 sm:py-32 bg-gradient-to-b from-black to-gray-900"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-orb-1 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-orb-2 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-white mb-12 animate-fade-in">
          About Me
        </h3>
        <div
          className="max-w-4xl mx-auto glass-morphism p-8 sm:p-12 rounded-2xl animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <p className="text-md md:text-lg lg:text-xl leading-relaxed text-gray-300">
            I&apos;m a{" "}
            <strong className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              Senior Full Stack Engineer
            </strong>{" "}
            with extensive experience in building secure, high-performance web
            applications for businesses of all sizes. Leveraging modern
            frameworks like React, Next.js, and AWS, I focus on creating
            user-friendly solutions that help companies thrive in today&apos;s
            digital landscape.
          </p>
          <p className="text-md md:text-lg lg:text-xl leading-relaxed text-gray-300 mt-6">
            With a passion for full-stack development, I strive to implement
            impactful, transformative technologies and best practices that drive
            real-world results.
          </p>
        </div>
      </div>
    </section>
  );
}
