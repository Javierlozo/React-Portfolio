"use client";
import React from "react";
import dynamic from "next/dynamic";

import Hero from "../components/Hero";
import About from "../components/About";

const TechStackVisual = dynamic(() => import("../components/TechStackVisual"));
const ExperienceTimeline = dynamic(() => import("../components/ExperienceTimeline"));
const SkillsAssessment = dynamic(() => import("../components/SkillsAssessment"));
const CertificationsShowcase = dynamic(() => import("../components/CertificationsShowcase"));
const CybersecurityLabs = dynamic(() => import("../components/CybersecurityLabs"));
const PortfolioSlider = dynamic(() => import("../components/PortfolioSlider"));
const FitAssessment = dynamic(() => import("../components/FitAssessment"));
const Testimonials = dynamic(() => import("../components/Testimonials"));
const Contact = dynamic(() => import("../components/Contact"));

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Hero />
      <About />
      <TechStackVisual />
      <ExperienceTimeline />
      <SkillsAssessment />
      <CertificationsShowcase />
      <CybersecurityLabs />
      <PortfolioSlider />
      <FitAssessment />
      <Testimonials />
      <Contact />
    </div>
  );
}
