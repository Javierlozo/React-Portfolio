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
        I am the founder of{" "}
        <a
          href="https://linkedin.com/company/iberiatech"
          style={{ color: "#002F71" }}
        >
          <strong>IberiaTech Solutions</strong>
        </a>
        , a company dedicated to delivering innovative and scalable technology
        solutions for businesses. With years of experience as a full-stack
        software engineer, I specialize in building secure, high-performance web
        applications using modern frameworks like React, Next.js, and AWS. My
        passion for technology drives me to create efficient and user-friendly
        digital experiences that help companies thrive in the digital landscape.
        Whether working on the front-end or back-end, I enjoy pushing the limits
        of technology to create impactful and transformative results.
      </p>
    </section>
  );
}
