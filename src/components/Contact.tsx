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
      className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl sm:text-5xl font-bold text-center mb-12 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Get in Touch
        </h2>

        <div className="max-w-4xl mx-auto">
          <p
            className={`text-center text-lg mb-12 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Feel free to reach out through the form below or connect with me on{" "}
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
            .
          </p>

          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div className={`p-8 rounded-lg space-y-6 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
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
              className={`w-full py-4 px-8 rounded-lg font-semibold transition-colors disabled:opacity-50 ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
