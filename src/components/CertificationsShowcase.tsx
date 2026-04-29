"use client";
import React, { useRef, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import gsec from "@/src/assets/certifications/GSEC.png";
import gfact from "@/src/assets/certifications/GFACT.png";
import coursera from "@/src/assets/certifications/Coursera.png";
import systemAdm from "@/src/assets/certifications/System Adm.png";

interface Cert {
  title: string;
  issuer: string;
  date: string;
  image: StaticImageData;
  verifyLink?: string;
}

const CERTS: Cert[] = [
  {
    title: "GIAC GSEC",
    issuer: "SANS Institute",
    date: "Apr 2026",
    image: gsec,
    verifyLink: "https://www.credly.com/badges/a2483986-24fe-47ec-8c33-b4350fef966f",
  },
  {
    title: "GIAC GFACT",
    issuer: "SANS Institute",
    date: "Jan 2026",
    image: gfact,
    verifyLink: "https://www.credly.com/badges/e82ec125-f253-430a-9daa-b0146f3b056b",
  },
  {
    title: "Cybersecurity / SysAdmin",
    issuer: "Purdue / Ivy Tech",
    date: "2023",
    image: systemAdm,
  },
  {
    title: "Intro to AI",
    issuer: "Google (Coursera)",
    date: "2025",
    image: coursera,
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

export default function CertificationsShowcase() {
  const { ref, visible } = useReveal();

  return (
    <section
      id="certifications"
      className="py-12 sm:py-16 md:py-20 bg-[#FAFAF9] dark:bg-[#0B1220]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-thin mb-3 pb-2 border-b w-fit mx-auto text-gray-900 border-gray-200 dark:text-white dark:border-gray-700">
            Certifications
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {CERTS.map((cert, i) => {
            const card = (
              <div
                className="group flex flex-col h-full rounded-xl border bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-800/50 dark:border-gray-700/60 dark:hover:border-gray-600 overflow-hidden"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 600ms ease-out, transform 600ms ease-out",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="relative aspect-[4/3] bg-gray-50 dark:bg-gray-900/50">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} certification`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-3 sm:p-4 flex-1 flex flex-col">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                    {cert.title}
                  </h3>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {cert.issuer} · {cert.date}
                  </div>
                  {cert.verifyLink && (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px]" />
                      Verify
                    </span>
                  )}
                </div>
              </div>
            );
            return cert.verifyLink ? (
              <a
                key={cert.title}
                href={cert.verifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {card}
              </a>
            ) : (
              <div key={cert.title}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
