"use client";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function About() {
  const { theme } = useTheme();
  
  return (
    <section
      id="about"
      className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl sm:text-5xl font-bold text-center mb-12 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          About Me
        </h2>
        <div className={`max-w-4xl mx-auto p-8 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <p className={`text-lg leading-relaxed mb-6 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            I&apos;m a{" "}
            <strong className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
              Full Stack Engineer & Web Security Specialist
            </strong>{" "}
            with extensive experience building secure, scalable web applications. I specialize in 
            React, Next.js, TypeScript, and AWS, with a strong focus on implementing security best 
            practices and protecting applications from vulnerabilities.
          </p>
          <p className={`text-lg leading-relaxed mb-8 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            My passion lies in creating robust, secure applications that not only deliver exceptional 
            user experiences but also protect against modern cyber threats. I&apos;m dedicated to 
            staying current with security trends and implementing defense-in-depth strategies.
          </p>
          
          {/* SANS Academy Achievement */}
          <div className={`mt-8 p-6 rounded-lg border ${
            theme === 'dark' 
              ? 'bg-blue-900/20 border-blue-500/20' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <h4 className={`text-lg font-semibold mb-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>Recent Achievement</h4>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              <strong className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Accepted into Fall 2025 SANS Cyber Academy!</strong> 
              {" "}Training with industry experts to enhance my security knowledge and earn GIAC certifications 
              in incident response, threat detection, and cyber defense.
            </p>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-4">
            {['React', 'Next.js', 'TypeScript', 'AWS', 'Web Security', 'Penetration Testing'].map((skill) => (
              <span key={skill} className={`px-3 py-1 rounded-full text-sm ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
