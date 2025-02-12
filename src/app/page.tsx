"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Experience from "../components/Experience";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Hero />
      <div data-aos="fade-up">
        <About />
      </div>
      <div data-aos="fade-up">
        <Skills />
      </div>
      <div data-aos="fade-up">
        <Experience />
      </div>
      <div data-aos="fade-up">
        <Portfolio />
      </div>
      <div data-aos="fade-up">
        <Testimonials />
      </div>
      <div data-aos="fade-up">
        <Contact />
      </div>
    </div>
  );
}
