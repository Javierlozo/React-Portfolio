"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

interface SkillOrbitProps {
  skills: string[];
  className?: string;
}

function MagneticChip({
  label,
  index,
  pointer,
  isDark,
}: {
  label: string;
  index: number;
  pointer: { x: number; y: number } | null;
  isDark: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });
  const driftRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const seed = index * 1.37;
    const loop = () => {
      const t = performance.now() / 1000;
      driftRef.current = {
        x: Math.sin(t * 0.6 + seed) * 2.5,
        y: Math.cos(t * 0.5 + seed) * 2.5,
      };

      if (!pointer || !ref.current) {
        x.set(driftRef.current.x);
        y.set(driftRef.current.y);
      } else {
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = pointer.x - cx;
        const dy = pointer.y - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 140;
        const pull = dist < radius ? (1 - dist / radius) * 18 : 0;
        const nx = dist === 0 ? 0 : dx / dist;
        const ny = dist === 0 ? 0 : dy / dist;
        x.set(driftRef.current.x + nx * pull);
        y.set(driftRef.current.y + ny * pull);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pointer, x, y, index]);

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      className={`px-3 py-1.5 text-xs font-light rounded-full border inline-block ${
        isDark
          ? "text-gray-300 border-gray-700 bg-gray-900/40"
          : "text-gray-600 border-gray-300 bg-white/40"
      }`}
    >
      {label}
    </motion.span>
  );
}

export default function SkillOrbit({ skills, className = "" }: SkillOrbitProps) {
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => setPointer({ x: e.clientX, y: e.clientY });
    const onLeave = () => setPointer(null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  if (reduce) {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {skills.map((s) => (
          <span
            key={s}
            className={`px-3 py-1.5 text-xs font-light rounded-full border ${
              theme === "dark" ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {skills.map((s, i) => (
        <MagneticChip
          key={s}
          label={s}
          index={i}
          pointer={pointer}
          isDark={theme === "dark"}
        />
      ))}
    </div>
  );
}
