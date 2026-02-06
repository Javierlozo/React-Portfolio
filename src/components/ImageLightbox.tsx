"use client";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ImageLightboxProps {
  src: string;
  alt?: string;
  caption?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({ src, alt, caption, isOpen, onClose }: ImageLightboxProps) {

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image zoom"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors"
        aria-label="Close"
      >
        <FontAwesomeIcon icon={faTimes} className="text-xl" />
      </button>
      <div
        className="flex flex-col items-center max-w-[95vw] max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt ?? "Zoomed image"}
          className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
        />
        {caption && (
          <p className="mt-3 text-sm text-center text-gray-300">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
