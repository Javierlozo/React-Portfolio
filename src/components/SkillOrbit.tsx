"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface SkillOrbitProps {
  skills: string[];
  className?: string;
}

type Pointer = { x: number; y: number } | null;

const chipClass =
  "px-3 py-1.5 text-xs font-light rounded-full border inline-block text-gray-600 border-gray-300 bg-white/40 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-900/40";

function MagneticChip({
  label,
  index,
  pointerRef,
  running,
}: {
  label: string;
  index: number;
  pointerRef: MutableRefObject<Pointer>;
  running: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const seed = index * 1.37;
    const loop = () => {
      const t = performance.now() / 1000;
      const driftX = Math.sin(t * 0.6 + seed) * 2.5;
      const driftY = Math.cos(t * 0.5 + seed) * 2.5;
      const pointer = pointerRef.current;

      if (!pointer || !ref.current) {
        x.set(driftX);
        y.set(driftY);
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
        x.set(driftX + nx * pull);
        y.set(driftY + ny * pull);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, index, pointerRef, x, y]);

  return (
    <motion.span ref={ref} style={{ x: sx, y: sy }} className={chipClass}>
      {label}
    </motion.span>
  );
}

export default function SkillOrbit({ skills, className = "" }: SkillOrbitProps) {
  const reduce = useReducedMotion();
  const pointerRef = useRef<Pointer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      pointerRef.current = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const io = new IntersectionObserver(([entry]) => {
      setOnScreen(entry.isIntersecting);
    });
    io.observe(container);
    return () => io.disconnect();
  }, []);

  if (reduce) {
    return (
      <div ref={containerRef} className={`flex flex-wrap gap-2 ${className}`}>
        {skills.map((s) => (
          <span key={s} className={chipClass}>
            {s}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`flex flex-wrap gap-2 ${className}`}>
      {skills.map((s, i) => (
        <MagneticChip
          key={s}
          label={s}
          index={i}
          pointerRef={pointerRef}
          running={onScreen}
        />
      ))}
    </div>
  );
}
