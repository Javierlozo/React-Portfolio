"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";

interface FormData {
  from_name: string;
  reply_to: string;
  message: string;
}

export default function Contact() {
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
        formData,
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
      className="py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="container mx-auto px-4">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-white mb-12 animate-fade-in">
          Get in Touch
        </h3>

        <div className="max-w-4xl mx-auto">
          <p
            className="text-center text-lg text-gray-300 mb-12 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Feel free to reach out through the form below or connect with me on{" "}
            <a
              href="https://www.linkedin.com/in/luisjlozoya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 hover:opacity-80 transition-opacity"
            >
              LinkedIn
            </a>
            .
          </p>

          <form
            className="space-y-6 animate-fade-in"
            onSubmit={handleSubmit}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="glass-morphism p-8 rounded-2xl space-y-6">
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
                className="w-full p-4 bg-white/5 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors disabled:opacity-50"
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
                className="w-full p-4 bg-white/5 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors disabled:opacity-50"
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
                className="w-full p-4 bg-white/5 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors resize-none disabled:opacity-50"
              ></textarea>
            </div>

            {submitStatus.message && (
              <div
                className={`text-center p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity animate-float disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
