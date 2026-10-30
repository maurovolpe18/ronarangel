"use client";

import Image from "next/image";
import { useState } from "react";
import {
  NEWSLETTER_SUCCESS_MESSAGE,
  markNewsletterSubscribed,
  subscribeToNewsletter
} from "@/lib/newsletter";

export function NewsletterSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "idle") return;
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");

    setStatus("sending");
    setError("");
    const result = await subscribeToNewsletter(email);
    if (result.ok) {
      markNewsletterSubscribed();
      form.reset();
      setStatus("done");
    } else {
      setError(result.message);
      setStatus("idle");
    }
  };

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-title"
      className="relative grid overflow-hidden bg-wine text-cream md:min-h-[90vh] md:grid-cols-2"
    >
      <div className="relative h-[55vh] md:h-auto">
        <Image
          src="/images/newsletter.jpg"
          alt="Mujer con paraguas y botas cruzando una calle lluviosa de la ciudad, en blanco y negro"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-[center_62%]"
        />
      </div>

      <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="editorial-eyebrow mb-8 flex items-center gap-4 text-cream/75">
          <span aria-hidden="true" className="h-px w-10 bg-cream/60" />
          Newsletter
        </div>
        <h2
          id="newsletter-title"
          className="display-mag text-[12vw] leading-[0.92] text-cream md:text-[4.6vw] lg:text-[4.2vw]"
        >
          Únete al club de{" "}
          <span className="display-mag-bold italic-accent text-peach">
            las almas creativas
          </span>
        </h2>
        <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-cream/85">
          Una carta semanal llena de ideas, reflexiones y hallazgos para nutrir
          tu creatividad, despertar tu curiosidad e inspirarte a mirar el mundo
          de otra manera.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-xl">
          <label htmlFor="newsletter-email" className="sr-only">
            Tu email
          </label>
          <div className="flex flex-col gap-3">
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Tu email"
              className="h-14 w-full border border-cream/50 bg-transparent px-5 text-lg font-light text-cream transition-colors placeholder:text-cream/55 focus:border-cream focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="editorial-eyebrow h-14 w-full bg-cream px-7 text-ink transition-colors hover:bg-peach focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream disabled:opacity-60"
            >
              Quiero ser parte del club <span aria-hidden="true">🏹</span>
            </button>
          </div>
          <p
            className="mt-4 min-h-[1.5rem] text-sm font-light leading-relaxed text-cream/80"
            aria-live="polite"
          >
            {status === "done" ? NEWSLETTER_SUCCESS_MESSAGE : error}
          </p>
        </form>
      </div>
    </section>
  );
}
