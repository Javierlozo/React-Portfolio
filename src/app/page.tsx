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
    <div className="relative min-h-screen">
      {/* Modern Background with Gradient Mesh */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-black dark:via-gray-950 dark:to-blue-950 transition-colors duration-500" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)]" />
      </div>
      
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
