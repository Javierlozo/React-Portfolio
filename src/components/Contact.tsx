"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useTheme } from "../contexts/ThemeContext";

interface FormData {
  from_name: string;
  reply_to: string;
  message: string;
}

export default function Contact() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    from_name: "",
    reply_to: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formData as unknown as Record<string, unknown>,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
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
      className={`py-24 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Minimalist Section Header */}
        <div className="text-center mb-20">
          <h2 className={`text-3xl sm:text-4xl font-light tracking-tight mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Contact
          </h2>
          <div className={`w-16 h-px mx-auto mb-6 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Let&apos;s discuss your next project. Reach out via the form below or connect on{" "}
            <a
              href="https://www.linkedin.com/in/luisjlozoya"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
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
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div className={`p-8 border border-gray-200 dark:border-gray-700 rounded-lg space-y-6 ${
            theme === 'dark' ? 'bg-gray-900/30' : 'bg-gray-50'
          }`}>
              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                value={formData.from_name}
                onChange={(e) =>
                  setFormData({ ...formData, from_name: e.target.value })
                }
                required
                disabled={isSubmitting}
                className={`w-full p-4 rounded-lg border transition-colors disabled:opacity-50 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white'
                    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900'
                }`}
              />
              <input
                type="email"
                name="reply_to"
                placeholder="Your Email"
                value={formData.reply_to}
                onChange={(e) =>
                  setFormData({ ...formData, reply_to: e.target.value })
                }
                required
                disabled={isSubmitting}
                className={`w-full p-4 rounded-lg border transition-colors disabled:opacity-50 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white'
                    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900'
                }`}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                disabled={isSubmitting}
                rows={6}
                className={`w-full p-4 rounded-lg border transition-colors resize-none disabled:opacity-50 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white'
                    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900'
                }`}
              ></textarea>
            </div>

            {submitStatus.message && (
              <div
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
            className={`w-full py-4 px-8 text-sm font-medium tracking-wider uppercase border-2 transition-all duration-300 disabled:opacity-50 ${
              theme === 'dark'
                ? 'border-white text-white hover:bg-white hover:text-black'
                : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
