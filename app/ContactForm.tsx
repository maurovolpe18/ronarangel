"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="col-span-12 md:col-span-5 md:col-start-8 md:mt-20 space-y-8"
    >
      <div>
        <label className="editorial-eyebrow text-cream/60 block mb-3">
          Nombre
        </label>
        <input
          type="text"
          required
          className="w-full bg-transparent border-b border-cream/30 py-2 text-cream font-light focus:outline-none focus:border-cream"
        />
      </div>
      <div>
        <label className="editorial-eyebrow text-cream/60 block mb-3">
          Email
        </label>
        <input
          type="email"
          required
          className="w-full bg-transparent border-b border-cream/30 py-2 text-cream font-light focus:outline-none focus:border-cream"
        />
      </div>
      <div>
        <label className="editorial-eyebrow text-cream/60 block mb-3">
          Mensaje
        </label>
        <textarea
          rows={4}
          required
          className="w-full bg-transparent border-b border-cream/30 py-2 text-cream font-light focus:outline-none focus:border-cream resize-none"
        />
      </div>
      <button
        type="submit"
        className="editorial-eyebrow bg-cream text-ink px-6 py-3 hover:bg-[oklch(0.78_0.13_22)] hover:text-cream transition-colors w-full md:w-auto"
      >
        {sent ? "Mensaje enviado ✓" : "Enviar mensaje →"}
      </button>
    </form>
  );
}
