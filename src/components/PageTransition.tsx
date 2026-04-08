"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    // Skip animation on first mount
    if (!rendered) {
      setRendered(true);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(false);
    const timeout = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timeout);
  }, [pathname, rendered]);

  return (
    <div
      className="transition-opacity duration-300 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {children}
    </div>
  );
}
