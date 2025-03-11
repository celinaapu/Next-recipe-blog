"use client";

import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating form submission (replace this with actual form submission logic)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStatus("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="bg-mountainBg mx-2 bg-auto rounded-md h-screen">
      <div className="max-w-3xl  mx-auto mt-20 ">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-center mb-6">
          Have a question or want to share your thoughts with us? We'd love to
          hear from you!
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-lg">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full focus:outline-none p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 focus:outline-none border border-gray-300 rounded"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-lg">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border focus:outline-none border-gray-300 rounded"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        {/* Submission Status */}
        {submissionStatus && (
          <div className="mt-4 text-center text-green-500">
            {submissionStatus}
          </div>
        )}

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <p className="mt-2">
            You can also reach us through the following methods:
          </p>

          <div className="mt-4">
            <p className="text-lg">
              Email:
              <a
                href="mailto:contact@salfordandco.com"
                className="text-blue-500"
              >
                contact@salfordandco.com
              </a>
            </p>
            <p className="text-lg">Social Media:</p>
            <div className="space-x-4 mt-2">
              <a href="https://twitter.com" className="text-blue-500">
                Twitter
              </a>
              <a href="https://facebook.com" className="text-blue-500">
                Facebook
              </a>
              <a href="https://instagram.com" className="text-blue-500">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
