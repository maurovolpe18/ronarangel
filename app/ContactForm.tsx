"use client";

import { useState } from "react";

const CONTACT_EMAIL = "ronarangelmartinez@gmail.com";

const fieldClass =
  "w-full bg-transparent border-b border-cream/80 py-2 font-display text-lg text-cream font-light focus:outline-none focus:border-cream transition-colors";
const labelClass = "block font-display text-lead font-light text-cream";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  // Envía el mensaje a /api/contact (Worker de Cloudflare → Resend).
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? "")
        })
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="col-span-12 space-y-8 rounded-[2rem] bg-[var(--wine-deep)] p-7 md:col-span-6 md:space-y-10 md:rounded-[2.5rem] md:p-12 md:pt-16"
    >
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Nombre
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={3}
          required
          className={`${fieldClass} resize-none`}
        />
      </div>
      <div className="flex flex-col items-end gap-3 pt-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full whitespace-nowrap rounded-full border border-cream/70 px-14 py-3 font-display text-lead font-light text-cream transition-colors hover:bg-cream hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream disabled:opacity-60 md:w-auto"
        >
          {status === "sending" ? "Enviando…" : "Enviar mensaje"}
        </button>
        <p className="min-h-[1.5rem] text-right text-sm font-light leading-relaxed text-cream/60" aria-live="polite">
          {status === "sent" && "¡Gracias! Recibí tu mensaje y te responderé pronto."}
          {status === "error" &&
            `No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbeme a ${CONTACT_EMAIL}.`}
        </p>
      </div>
    </form>
  );
}
