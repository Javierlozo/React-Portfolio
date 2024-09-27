"use client";
import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="text-center p-20 bg-gray-50 dark:bg-gray-800"
    >
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold dark:text-white">
        About Me
      </h3>
      <p className="text-md md:text-lg lg:text-xl py-5 leading-8 dark:text-gray-300 max-w-6xl mx-auto">
        I am a passionate Full Stack Developer with experience in building web
        applications using modern technologies. I founded IberiaTech Solutions
        in 2023, where I specialize in contract jobs, primarily in the U.S. and
        Spain. I am always eager to learn and take on new challenges, striving
        to deliver efficient and scalable solutions.
      </p>
    </section>
  );
}
