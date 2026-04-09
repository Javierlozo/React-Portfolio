"use client";
import React, { useState, useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import { useTheme } from "../contexts/ThemeContext";

interface FormData {
  from_name: string;
  reply_to: string;
  message: string;
}

function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function Contact() {
  const { theme } = useTheme();
  const { ref: formRef, visible: formVisible } = useReveal<HTMLFormElement>(0.1);
  const [formData, setFormData] = useState<FormData>({
    from_name: "",
    reply_to: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitTime < 60_000) {
      setSubmitStatus({ type: "error", message: "Please wait a minute before sending another message." });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formData as unknown as Record<string, unknown>,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
      setLastSubmitTime(Date.now());
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully!",
      });
      setFormData({ from_name: "", reply_to: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={`py-12 sm:py-16 md:py-20 ${theme === 'dark' ? 'bg-[#0B1220]' : 'bg-[#FAFAF9]'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
        {/* Minimalist Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
            theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
          }`}>
            Contact
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Let&apos;s discuss your next project. Reach out via the form below or connect on{" "}
            <a
              href="https://www.linkedin.com/in/luisjlozoya"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors font-light ${
                theme === 'dark' 
                  ? 'text-white hover:text-gray-300' 
                  : 'text-gray-900 hover:text-gray-600'
              }`}
            >
              LinkedIn
            </a>
          </p>
        </div>

        <form
          ref={formRef}
          className="max-w-2xl mx-auto space-y-5 sm:space-y-6 md:space-y-8 transition-all duration-700 ease-out"
          onSubmit={handleSubmit}
          style={{
            opacity: formVisible ? 1 : 0,
            transform: formVisible ? "translateY(0)" : "translateY(32px)",
          }}
        >
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div>
                <label htmlFor="from_name" className="sr-only">Your Name</label>
                <input
                  id="from_name"
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  value={formData.from_name}
                  onChange={(e) =>
                    setFormData({ ...formData, from_name: e.target.value })
                  }
                  required
                  disabled={isSubmitting}
                  className={`w-full p-3 sm:p-4 text-base border-b transition-colors disabled:opacity-50 bg-transparent min-h-[44px] ${
                    theme === 'dark'
                      ? 'border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-white'
                      : 'border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900'
                  }`}
                />
              </div>
              <div>
                <label htmlFor="reply_to" className="sr-only">Your Email</label>
                <input
                  id="reply_to"
                  type="email"
                  name="reply_to"
                  placeholder="Your Email"
                  value={formData.reply_to}
                  onChange={(e) =>
                    setFormData({ ...formData, reply_to: e.target.value })
                  }
                  required
                  disabled={isSubmitting}
                  className={`w-full p-3 sm:p-4 text-base border-b transition-colors disabled:opacity-50 bg-transparent min-h-[44px] ${
                    theme === 'dark'
                      ? 'border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-white'
                      : 'border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900'
                  }`}
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  disabled={isSubmitting}
                  rows={6}
                  className={`w-full p-3 sm:p-4 text-base border-b transition-colors resize-none disabled:opacity-50 bg-transparent min-h-[120px] ${
                    theme === 'dark'
                      ? 'border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-white'
                      : 'border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900'
                  }`}
                ></textarea>
              </div>
            </div>

            {submitStatus.message && (
              <div
                role="status"
                aria-live="polite"
                className={`text-center p-4 rounded-lg border ${
                  submitStatus.type === "success"
                    ? theme === 'dark'
                      ? "bg-green-900/20 text-green-400 border-green-500/20"
                      : "bg-green-50 text-green-600 border-green-200"
                    : theme === 'dark'
                      ? "bg-red-900/20 text-red-400 border-red-500/20"
                      : "bg-red-50 text-red-600 border-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 sm:py-4 px-6 sm:px-8 text-xs sm:text-sm font-light tracking-widest uppercase border transition-all duration-300 disabled:opacity-50 ${
              theme === 'dark'
                ? 'border-gray-600 text-gray-300 hover:border-white hover:text-white'
                : 'border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900'
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
