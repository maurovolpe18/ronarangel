"use client";

import { useState } from "react";

const CONTACT_EMAIL = "ronarangelmartinez@gmail.com";

const fieldClass =
  "w-full bg-transparent border-b border-cream/30 py-2 text-cream font-light focus:outline-none focus:border-cream transition-colors";
const labelClass = "editorial-eyebrow text-cream/70 block mb-3";

export function ContactForm() {
  const [opened, setOpened] = useState(false);

  // El sitio es estático: en lugar de simular un envío, se arma el correo con
  // los datos del formulario y se abre en la aplicación de correo del visitante.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = `Consulta desde la web — ${name}`;
    const body = `${message}\n\n${name}\n${email}`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="col-span-12 md:col-span-5 md:col-start-8 md:mt-20 space-y-8"
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
          rows={4}
          required
          className={`${fieldClass} resize-none`}
        />
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <button
          type="submit"
          className="editorial-eyebrow shrink-0 whitespace-nowrap bg-cream text-ink px-6 py-3 hover:bg-rust hover:text-cream transition-colors w-full md:w-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
        >
          Enviar mensaje →
        </button>
        <p className="text-xs font-light leading-relaxed text-cream/60" aria-live="polite">
          {opened
            ? `Se abrió tu aplicación de correo. Si no aparece, escríbeme a ${CONTACT_EMAIL}.`
            : "Se abrirá tu aplicación de correo con el mensaje listo."}
        </p>
      </div>
    </form>
  );
}
