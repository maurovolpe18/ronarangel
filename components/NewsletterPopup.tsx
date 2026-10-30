"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  NEWSLETTER_SUCCESS_MESSAGE,
  markNewsletterPopupDismissed,
  markNewsletterSubscribed,
  shouldShowNewsletterPopup,
  subscribeToNewsletter
} from "@/lib/newsletter";

const SHOW_AFTER_MS = 35_000;
const SHOW_AFTER_SCROLL_RATIO = 0.5;
const CLOSE_AFTER_SUBMIT_MS = 6_000;

function isNewsletterSectionVisible() {
  const section = document.getElementById("newsletter");
  if (!section) return false;
  const { top, bottom } = section.getBoundingClientRect();
  return top < window.innerHeight && bottom > 0;
}

/**
 * Panel no bloqueante en la esquina inferior. Aparece tras 35 s o cuando el
 * scroll se detiene pasada la mitad de la página, salvo que la sección de
 * newsletter ya esté a la vista; si aparece y luego se llega a esa sección, se
 * oculta. Suscribirse lo oculta para siempre y cerrarlo con la X, por una
 * semana; cerrarlo tocando afuera o con Esc solo lo cierra en esta visita.
 */
export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Vista previa: «?newsletter» en la URL lo abre ignorando las reglas.
    if (new URLSearchParams(window.location.search).has("newsletter")) {
      const timer = window.setTimeout(() => setOpen(true), 0);
      return () => window.clearTimeout(timer);
    }
    if (!shouldShowNewsletterPopup()) return;

    let settled = false;
    let idleTimer: number | undefined;
    const cleanups: (() => void)[] = [];
    const settle = () => {
      settled = true;
      window.clearTimeout(idleTimer);
      cleanups.forEach((cleanup) => cleanup());
    };
    const show = () => {
      if (settled) return;
      settle();
      setOpen(true);
    };
    // Si la persona ya está viendo la sección de newsletter, no se le repite
    // con el popup en esta visita.
    const evaluate = (force: boolean) => {
      if (isNewsletterSectionVisible()) {
        settle();
        return;
      }
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const pastHalf =
        scrollable > 0 && window.scrollY / scrollable >= SHOW_AFTER_SCROLL_RATIO;
      if (force || pastHalf) show();
    };

    const timer = window.setTimeout(() => evaluate(true), SHOW_AFTER_MS);
    cleanups.push(() => window.clearTimeout(timer));

    // Se evalúa cuando el scroll se detiene: un salto con scroll suave (por
    // ejemplo, el enlace a Contacto) pasa por la mitad sin quedarse ahí.
    const onScroll = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => evaluate(false), 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    return settle;
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const closeWithButton = useCallback(() => {
    setOpen(false);
    if (!submitted) markNewsletterPopupDismissed();
  }, [submitted]);

  useEffect(() => {
    if (!open) return;

    const section = document.getElementById("newsletter");
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) close();
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [open, close]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) close();
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, close]);

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => setOpen(false), CLOSE_AFTER_SUBMIT_MS);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    const email = String(new FormData(event.currentTarget).get("email") ?? "");

    setSending(true);
    setError("");
    const result = await subscribeToNewsletter(email);
    setSending(false);
    if (result.ok) {
      markNewsletterSubscribed();
      setSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="newsletter-popup-title"
      className="animate-panel-in fixed inset-x-4 bottom-4 z-40 bg-wine p-6 text-cream shadow-2xl shadow-black/30 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[25rem] md:p-8"
    >
      <button
        type="button"
        aria-label="Cerrar"
        onClick={closeWithButton}
        className="absolute right-3 top-3 grid h-10 w-10 cursor-pointer place-items-center text-cream/70 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-cream"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M1 1L13 13M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="square"
          />
        </svg>
      </button>

      <div className="editorial-eyebrow mb-4 flex items-center gap-3 text-cream/75">
        <span aria-hidden="true" className="h-px w-8 bg-cream/60" />
        Newsletter
      </div>
      <h2
        id="newsletter-popup-title"
        className="display-mag pr-6 text-3xl leading-[0.95] text-cream md:text-4xl"
      >
        Únete al club de{" "}
        <span className="italic-accent text-peach">las almas creativas</span>
      </h2>

      {submitted ? (
        <p
          className="mt-5 text-sm font-light leading-relaxed text-cream/85"
          aria-live="polite"
        >
          {NEWSLETTER_SUCCESS_MESSAGE}
        </p>
      ) : (
        <>
          <p className="mt-4 text-sm font-light leading-relaxed text-cream/85">
            Una carta semanal llena de ideas, reflexiones y hallazgos para nutrir tu creatividad, despertar tu curiosidad e inspirarte a mirar el mundo de otra manera.
          </p>
          <form onSubmit={handleSubmit} className="mt-6">
            <label htmlFor="newsletter-popup-email" className="sr-only">
              Tu email
            </label>
            <div className="flex flex-col gap-3">
              <input
                id="newsletter-popup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Tu email"
                className="h-12 w-full min-w-0 border border-cream/50 bg-transparent px-4 font-light text-cream transition-colors placeholder:text-cream/55 focus:border-cream focus:outline-none"
              />
              <button
                type="submit"
                disabled={sending}
                className="editorial-eyebrow h-12 w-full cursor-pointer bg-cream px-4 text-ink transition-colors hover:bg-peach focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream disabled:opacity-60"
              >
                Quiero ser parte del club <span aria-hidden="true">🏹</span>
              </button>
            </div>
            <p
              className="mt-3 min-h-[1.25rem] text-sm font-light leading-relaxed text-cream/80"
              aria-live="polite"
            >
              {error}
            </p>
          </form>
        </>
      )}
    </div>
  );
}
