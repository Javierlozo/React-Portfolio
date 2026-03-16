"use client";
import React from "react";
import dynamic from "next/dynamic";

import Hero from "../components/Hero";
import About from "../components/About";
import TechStackVisual from "../components/TechStackVisual";
import ExperienceTimeline from "../components/ExperienceTimeline";
import CertificationsShowcase from "../components/CertificationsShowcase";
import CybersecurityLabs from "../components/CybersecurityLabs";
import SkillsAssessment from "../components/SkillsAssessment";
import FitAssessment from "../components/FitAssessment";

const PortfolioSlider = dynamic(() => import("../components/PortfolioSlider"));
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
