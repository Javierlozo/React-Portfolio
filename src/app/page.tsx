"use client";
import React from "react";

import Hero from "../components/Hero";
import About from "../components/About";
import TechStackVisual from "../components/TechStackVisual";
// import SkillsModern from "../components/SkillsModern"; // uncomment to use scroll cards instead of Tech Stack
import ExperienceTimeline from "../components/ExperienceTimeline";
import CertificationsShowcase from "../components/CertificationsShowcase";
import CybersecurityLabs from "../components/CybersecurityLabs";
import PortfolioSlider from "../components/PortfolioSlider";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Hero />
      <About />
      <TechStackVisual />
      {/* To use Skills & Expertise (scroll cards) instead: uncomment <SkillsModern /> and the SkillsModern import above, then comment out <TechStackVisual /> */}
      {/* <SkillsModern /> */}
      <ExperienceTimeline />
      <CertificationsShowcase />
      <CybersecurityLabs />
      <PortfolioSlider />
      <Testimonials />
      <Contact />
    </div>
  );
}
