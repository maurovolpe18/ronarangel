"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  NEWSLETTER_SUCCESS_MESSAGE,
  markNewsletterSubscribed,
  subscribeToNewsletter
} from "@/lib/newsletter";

const stripPhotos = [
  { src: "/images/club/tira-1.jpg", alt: "Edificio antiguo de la ciudad, en blanco y negro" },
  { src: "/images/club/tira-2.jpg", alt: "Mujer fotografiando con una cámara analógica, en blanco y negro" },
  { src: "/images/club/tira-3.jpg", alt: "Auto antiguo estacionado frente a una vidriera, en blanco y negro" }
];

// Collage de la maqueta: sobre abierto, tira de fotos y tarjeta. Las medidas
// salen de la maqueta (405 × 520) y se expresan en porcentajes para escalar;
// el texto de la tarjeta usa unidades del contenedor (cqw) para escalar igual.
function ClubCollage() {
  return (
    <div className="relative mx-auto aspect-[405/520] w-full max-w-[22rem] [container-type:inline-size] md:max-w-[32rem]">
      <div className="absolute left-[6.2%] top-[10.6%] w-[88.9%] rotate-[3deg]">
        <Image
          src="/images/club/sobre.webp"
          alt=""
          width={900}
          height={1151}
          sizes="(min-width: 768px) 26rem, 80vw"
          className="h-auto w-full drop-shadow-[0_18px_30px_rgb(0_0_0/0.35)]"
        />
      </div>

      <div className="absolute left-[19.6%] top-[3.3%] flex h-[85.4%] w-[37.8%] rotate-[20deg] flex-col gap-[3.5%] bg-[#fbfaf3] p-[6%] shadow-[0_14px_30px_-6px_rgb(0_0_0/0.45)]">
        {stripPhotos.map((photo) => (
          <div key={photo.src} className="relative flex-1 overflow-hidden bg-ink">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 10rem, 30vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute left-[47.2%] top-[53.8%] aspect-square w-[37.5%]">
        <Image
          src="/images/club/papel.webp"
          alt=""
          fill
          sizes="(min-width: 768px) 11rem, 35vw"
          className="object-cover drop-shadow-[0_10px_18px_rgb(0_0_0/0.35)]"
        />
        <p className="absolute left-[14%] top-[30%] pr-[8%] font-display text-[4.2cqw] font-normal leading-[1.08] tracking-[-0.02em] text-ink">
          La curiosidad
          <br />
          también es
          <br />
          una forma
          <br />
          de crear.
        </p>
      </div>
    </div>
  );
}

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
      className="bg-paper px-3 py-3 md:px-4 md:py-4"
    >
      <div
        data-nav="dark"
        className="relative overflow-hidden rounded-[1.75rem] bg-[#3a2e27] text-cream md:rounded-[2.25rem]"
      >
        <Image
          src="/images/club/textura.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="relative grid items-center gap-10 px-6 py-14 md:grid-cols-12 md:gap-8 md:px-12 md:py-16 lg:px-16">
          <Reveal className="md:col-span-6">
            <ClubCollage />
          </Reveal>

          <Reveal className="md:col-span-6 md:pl-4 lg:pl-8">
            <h2
              id="newsletter-title"
              className="font-display text-[8.4vw] font-normal leading-[1.02] tracking-[-0.045em] text-cream md:text-title"
            >
              El club de
              <br className="hidden md:block" /> las almas
              <br />
              creativas{" "}
              {/* El emoji de la maqueta como imagen, para que se vea igual en
                  todos los sistemas (Windows y Android dibujan el suyo). */}
              <Image
                src="/images/club/arco-flecha.webp"
                alt=""
                width={256}
                height={256}
                className="ml-[0.15em] inline-block h-[0.85em] w-auto align-[-0.05em]"
              />
            </h2>
            <p className="mt-6 max-w-md font-display text-lead font-light text-cream/90">
              Una carta semanal llena de ideas, reflexiones y hallazgos para
              nutrir tu creatividad, despertar tu curiosidad e inspirarte a mirar
              el mundo de otra manera.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md">
              <label htmlFor="newsletter-email" className="sr-only">
                Tu email
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Tu email"
                  className="h-13 min-w-0 flex-1 rounded-full border border-cream/50 bg-black/15 px-6 py-3.5 font-display text-base font-light text-cream backdrop-blur-sm transition-colors placeholder:text-cream/60 focus:border-cream focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="shrink-0 rounded-full bg-cream px-7 py-3.5 font-display text-base text-ink transition-colors hover:bg-peach focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream disabled:opacity-60"
                >
                  {status === "sending" ? "Enviando…" : "Quiero unirme al club."}
                </button>
              </div>
              <p
                className="mt-3 min-h-[1.5rem] text-sm font-light leading-relaxed text-cream/80"
                aria-live="polite"
              >
                {status === "done" ? NEWSLETTER_SUCCESS_MESSAGE : error}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
