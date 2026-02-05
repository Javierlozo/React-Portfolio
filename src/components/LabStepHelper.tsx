"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../contexts/ThemeContext";

export interface StepHelperItem {
  title: string;
  command?: string;
  commandBreakdown?: string;
}

interface LabStepHelperProps {
  steps: StepHelperItem[];
  activeStepIndex: number;
  onStepClick: (index: number) => void;
  title?: string;
  className?: string;
}

export default function LabStepHelper({
  steps,
  activeStepIndex,
  onStepClick,
  title = "Step helper",
  className = "",
}: LabStepHelperProps) {
  const { theme } = useTheme();
  const activeStep = steps[activeStepIndex];

  return (
    <aside
      className={`hidden lg:block w-72 shrink-0 sticky top-24 self-start rounded-xl border-2 p-4 ${className} ${
        theme === "dark"
          ? "bg-gray-800/80 border-gray-700"
          : "bg-white/90 border-gray-200"
      }`}
    >
      <h4 className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-3 ${
        theme === "dark" ? "text-amber-400" : "text-amber-700"
      }`}>
        <FontAwesomeIcon icon={faBookOpen} />
        {title}
      </h4>
      <nav className="space-y-1 mb-4">
        {steps.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onStepClick(idx)}
            className={`block w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
              idx === activeStepIndex
                ? theme === "dark"
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-amber-100 text-amber-800"
                : theme === "dark"
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {idx + 1}. {s.title}
          </button>
        ))}
      </nav>
      {activeStep && (
        <div className={`pt-3 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
          <p className={`text-xs font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            {activeStep.title}
          </p>
          {activeStep.command && (
            <pre className={`p-2 rounded text-[10px] overflow-x-auto mb-2 ${
              theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-800"
            }`}>
              <code>{activeStep.command.split("\n")[0]}</code>
            </pre>
          )}
          {activeStep.commandBreakdown && (
            <p className={`text-[11px] leading-relaxed ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
              {activeStep.commandBreakdown.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
          )}
        </div>
      )}
    </aside>
  );
}
