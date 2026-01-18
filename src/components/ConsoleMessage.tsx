"use client";
import { useEffect } from "react";

export default function ConsoleMessage() {
  useEffect(() => {
    // Modern gradient colors
    const primaryColor = "#00d4ff";
    const secondaryColor = "#00ff88";
    const accentColor = "#ff6b35";
    const textColor = "#e5e7eb";

    // Compact modern styles
    const titleStyle = [
      `background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
      "color: #000",
      "font-size: 11px",
      "font-weight: 800",
      "padding: 6px 12px",
      "border-radius: 6px",
      "letter-spacing: 0.5px",
      "text-transform: uppercase",
      "display: inline-block",
    ].join(";");

    const subtitleStyle = [
      `color: ${secondaryColor}`,
      "font-size: 10px",
      "font-weight: 600",
      "letter-spacing: 0.3px",
    ].join(";");

    const textStyle = [
      `color: ${textColor}`,
      "font-size: 10px",
      "line-height: 1.5",
    ].join(";");

    const linkStyle = [
      `color: ${primaryColor}`,
      "font-size: 10px",
      "text-decoration: none",
      "font-weight: 600",
    ].join(";");

    const sectionHeaderStyle = [
      `color: ${accentColor}`,
      "font-size: 10px",
      "font-weight: 700",
      "text-transform: uppercase",
      "letter-spacing: 0.5px",
    ].join(";");

    // Compact modern layout
    console.log(
      `%c LUIS LOZOYA %c\n%cFull Stack Developer\n`,
      titleStyle,
      "",
      subtitleStyle
    );

    console.log(
      `%cTECH%c React • Next.js • TypeScript • AWS • Python • AI Integration`,
      sectionHeaderStyle,
      textStyle
    );

    console.log(
      `%cEXPERIENCE%c 5+ years building scalable web apps & AI solutions`,
      sectionHeaderStyle,
      textStyle
    );

    console.log(
      `%cCONNECT%c LinkedIn: %chttps://linkedin.com/in/luisjlozoya%c | GitHub: %chttps://github.com/Javierlozo`,
      sectionHeaderStyle,
      textStyle,
      linkStyle,
      textStyle,
      linkStyle
    );

    console.log(
      `%c💡 Let's build something amazing together!`,
      `color: ${secondaryColor}; font-size: 10px; font-weight: 600; font-style: italic;`
    );

    console.log(
      `%c⚡ Next.js 14 • React 19 • TypeScript`,
      `color: ${primaryColor}; font-size: 9px; opacity: 0.7;`
    );
  }, []);

  return null;
}


