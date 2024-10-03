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
      <p className="text-md md:text-lg lg:text-xl py-5 leading-8 text-gray-700 dark:text-gray-300 max-w-6xl mx-auto">
        I am the founder of{" "}
        <a
          href="https://linkedin.com/company/iberiatech"
          style={{ color: "#002F71" }}
          className="dark:text-blue-400"
        >
          <strong>IberiaTech Solutions</strong>
        </a>
        , a company dedicated to delivering innovative and scalable technology
        solutions for businesses. With years of experience specializing in
        building secure, high-performance web applications, I focus on creating
        user-friendly and efficient digital experiences using modern frameworks
        like React, Next.js, and AWS. My passion for full-stack development
        drives me to design and implement impactful, transformative solutions
        that help companies thrive in the digital landscape.
      </p>
    </section>
  );
}
