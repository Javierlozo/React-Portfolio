"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const [formData, setFormData] = useState({
    from_name: "",
    to_name: "Luis Lozoya", // Assuming you're sending to yourself
    message: "",
    reply_to: "",
  });

  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Use the required serviceID, templateID, and userID
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setStatusMessage("Message sent successfully!");
      })
      .catch((err) => {
        console.log("FAILED...", err);
        setStatusMessage("Failed to send the message.");
      });

    // Clear the form after submission
    setFormData({
      from_name: "",
      to_name: "Luis Lozoya",
      message: "",
      reply_to: "",
    });
  };

  return (
    <section id="contact" className="py-10">
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center dark:text-white">
        Get in Touch
      </h3>

      {/* LinkedIn Call-to-Action */}
      <p className="text-center text-lg py-5 dark:text-gray-400">
        Feel free to reach out through the form below or connect with me on{" "}
        <a
          href="https://www.linkedin.com/in/luisjlozoya"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 hover:underline"
        >
          LinkedIn
        </a>
        .
      </p>

      <form className="max-w-md mx-auto mt-5" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name="from_name"
            id="from_name"
            placeholder="Name" // Placeholder added
            value={formData.from_name}
            onChange={(e) =>
              setFormData({ ...formData, from_name: e.target.value })
            }
            required
            className="w-full p-2 mb-4 border rounded"
          />
        </div>
        <div className="field">
          <input
            type="email"
            name="reply_to"
            id="reply_to"
            placeholder="Email"
            value={formData.reply_to}
            onChange={(e) =>
              setFormData({ ...formData, reply_to: e.target.value })
            }
            required
            className="w-full p-2 mb-4 border rounded"
          />
        </div>
        <div className="field">
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            className="w-full p-2 mb-4 border rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
        >
          Send Email
        </button>
      </form>
      {statusMessage && (
        <p className="text-center mt-4 text-lg">{statusMessage}</p>
      )}
    </section>
  );
}
