"use client";

import { useState } from "react";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      window.alert("Please fill all fields.");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    window.alert("YOUR QUERY IS SUBMITED OUR TEAM WILL REACH YOU SHORTY");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-semibold">Contact Us</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="mb-3 w-full rounded border px-4 py-2"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="mb-3 w-full rounded border px-4 py-2"
          required
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={4}
          className="mb-4 w-full rounded border px-4 py-2"
          required
        />

        <button type="submit" className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}
