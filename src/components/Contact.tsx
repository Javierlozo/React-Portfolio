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
      <h3 className="text-3xl text-center dark:text-white">Get in Touch</h3>
      <form className="max-w-md mx-auto mt-5" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="from_name" className="block mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="from_name"
            id="from_name"
            value={formData.from_name}
            onChange={(e) =>
              setFormData({ ...formData, from_name: e.target.value })
            }
            required
            className="w-full p-2 mb-4 border rounded"
          />
        </div>
        <div className="field">
          <label htmlFor="reply_to" className="block mb-2">
            Your Email
          </label>
          <input
            type="email"
            name="reply_to"
            id="reply_to"
            value={formData.reply_to}
            onChange={(e) =>
              setFormData({ ...formData, reply_to: e.target.value })
            }
            required
            className="w-full p-2 mb-4 border rounded"
          />
        </div>
        <div className="field">
          <label htmlFor="message" className="block mb-2">
            Message
          </label>
          <textarea
            name="message"
            id="message"
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
