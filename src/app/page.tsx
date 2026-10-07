"use client";
import React from "react";
import dynamic from "next/dynamic";

import Hero from "../components/Hero";
import About from "../components/About";

const LlmAuditFeature = dynamic(() => import("../components/LlmAuditFeature"));
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
      {/* Same order as the navbar, left to right: Work, About, Credentials,
          Labs, Writing, Fit Check, Contact. Keep them in step, so the active
          link moves steadily right as you scroll. */}
      <LlmAuditFeature />
      <PortfolioSlider />
      <ExperienceTimeline />
      <About />
      <CertificationsShowcase />
      <CybersecurityLabs />
      <FitAssessment />
      <Contact />
    </div>
  );
}
