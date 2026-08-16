"use client";
import { useEffect } from "react";

export default function ConsoleMessage() {
  useEffect(() => {
    const accent = "#22c55e";
    const muted = "#94a3b8";
    const text = "#e5e7eb";

    const titleStyle = `color: ${accent}; font-weight: 700; font-size: 12px; letter-spacing: 0.5px;`;
    const labelStyle = `color: ${accent}; font-weight: 600; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px;`;
    const textStyle = `color: ${text}; font-size: 11px;`;
    const mutedStyle = `color: ${muted}; font-size: 10px; font-style: italic;`;

    console.log(
      "%cLuis Javier Lozoya · Security Engineer · GIAC GCIH + GSEC + GFACT",
      titleStyle
    );
    console.log(
      "%cBUILT  %cllm-audit (npm) · /labs · /ai-playground (red team lab, in progress)",
      labelStyle,
      textStyle
    );
    console.log(
      "%cREACH  %clinkedin.com/in/luisjlozoya · github.com/Javierlozo",
      labelStyle,
      textStyle
    );
    console.log(
      "%c// poking at the headers? curl -sI https://luislozoya.com",
      mutedStyle
    );
  }, []);

  return null;
}
