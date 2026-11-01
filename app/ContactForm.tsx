"use client";

import { useState } from "react";

const CONTACT_EMAIL = "ronarangelmartinez@gmail.com";

const fieldClass =
  "w-full bg-transparent border-b border-cream/80 py-2 font-display text-lg text-cream font-light focus:outline-none focus:border-cream transition-colors";
const labelClass = "block font-display text-lg font-light text-cream md:text-[1.45vw]";

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
      className="col-span-12 space-y-10 rounded-[2.5rem] bg-[var(--wine-deep)] p-8 md:col-span-6 md:p-12 md:pt-20"
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
          rows={5}
          required
          className={`${fieldClass} resize-none`}
        />
      </div>
      <div className="flex flex-col items-end gap-3 pt-4">
        <button
          type="submit"
          className="w-full whitespace-nowrap rounded-full border border-cream/70 px-14 py-3 font-display text-xl font-extralight text-cream transition-colors hover:bg-cream hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream md:w-auto md:text-[1.7vw]"
        >
          Enviar mensaje
        </button>
        <p className="text-right text-xs font-light leading-relaxed text-cream/60" aria-live="polite">
          {opened
            ? `Se abrió tu aplicación de correo. Si no aparece, escríbeme a ${CONTACT_EMAIL}.`
            : "Se abrirá tu aplicación de correo con el mensaje listo."}
        </p>
      </div>
    </form>
  );
}
