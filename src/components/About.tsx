"use client";
import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="text-center p-20 bg-gray-50 dark:bg-gray-900"
    >
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold dark:text-gray-100">
        About Me
      </h3>
      <p className="text-md md:text-lg lg:text-xl py-5 leading-8 text-gray-700 dark:text-gray-400 max-w-6xl mx-auto">
        I’m a{" "}
        <strong className="text-teal-600" style={{ color: "#0D9488" }}>
          Senior Full Stack Engineer
        </strong>{" "}
        with extensive experience in building secure, high-performance web
        applications for businesses of all sizes. Leveraging modern frameworks
        like React, Next.js, and AWS, I focus on creating user-friendly
        solutions that help companies thrive in today’s digital landscape. With
        a passion for full-stack development, I strive to implement impactful,
        transformative technologies and best practices that drive real-world
        results.
      </p>
    </section>
  );
}
