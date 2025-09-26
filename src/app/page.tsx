"use client";
import React from "react";

import Hero from "../components/Hero";
import About from "../components/About";
import SkillsModern from "../components/SkillsModern";
import ExperienceTimeline from "../components/ExperienceTimeline";
import CertificationsShowcase from "../components/CertificationsShowcase";
import PortfolioSlider from "../components/PortfolioSlider";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      <Hero />
      <About />
      <SkillsModern />
      <ExperienceTimeline />
      <CertificationsShowcase />
      <PortfolioSlider />
      <Testimonials />
      <Contact />
    </div>
  );
}
