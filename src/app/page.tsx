"use client";
import React from "react";
import dynamic from "next/dynamic";

import Hero from "../components/Hero";
import About from "../components/About";

const ExperienceTimeline = dynamic(() => import("../components/ExperienceTimeline"));
const CybersecurityLabs = dynamic(() => import("../components/CybersecurityLabs"));
const CertificationsShowcase = dynamic(() => import("../components/CertificationsShowcase"));
const PortfolioSlider = dynamic(() => import("../components/PortfolioSlider"));
const FitAssessment = dynamic(() => import("../components/FitAssessment"));
const Contact = dynamic(() => import("../components/Contact"));

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Hero />
      <About />
      <CybersecurityLabs />
      <ExperienceTimeline />
      <CertificationsShowcase />
      <PortfolioSlider />
      <FitAssessment />
      <Contact />
    </div>
  );
}
