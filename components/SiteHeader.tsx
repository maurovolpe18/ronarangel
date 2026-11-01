"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/content";

const WHATSAPP_URL =
  "https://wa.me/5491156925330?text=Hola%2C%20quiero%20agendar%20una%20llamada";

// Las secciones oscuras se marcan con data-nav="dark"; el resto son claras.
// El navbar toma el tono de la sección que tiene debajo.
function sectionToneUnder(y: number): "dark" | "light" {
  const element = document.elementFromPoint(window.innerWidth / 2, y);
  return element?.closest("[data-nav='dark']") ? "dark" : "light";
}

// Sección activa: la del menú que ocupa el centro de la pantalla, o ninguna.
const navTargets: readonly string[] = navigation.map((item) => item.href);
function activeSectionAt(y: number): string {
  const section = document
    .elementFromPoint(window.innerWidth / 2, y)
    ?.closest("section[id]");
  const href = section ? `#${section.id}` : "";
  return navTargets.includes(href) ? href : "";
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const firstMobileLink = useRef<HTMLAnchorElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Fondo al hacer scroll y tono según la sección que queda debajo.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const barHeight = navRef.current?.offsetHeight ?? 64;
      setScrolled(y > 40);
      setTone(sectionToneUnder(barHeight + 4));
      setActive(activeSectionAt(window.innerHeight / 2));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const closeDesktopMenu = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("resize", closeDesktopMenu);
    window.addEventListener("keydown", closeWithEscape);
    return () => {
      window.removeEventListener("resize", closeDesktopMenu);
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => firstMobileLink.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const light = tone === "light" && !menuOpen;
  const solid = scrolled && !menuOpen;

  return (
    <nav
      ref={navRef}
      className={`site-nav fixed inset-x-0 top-0 z-50 transition-[background-color,color] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        light ? "text-ink" : "text-cream"
      }${menuOpen ? " is-menu-open" : ""}`}
      style={{
        backgroundColor: solid
          ? light
            ? "color-mix(in oklab, var(--paper) 92%, transparent)"
            : "color-mix(in oklab, var(--ink) 85%, transparent)"
          : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        WebkitBackdropFilter: solid ? "blur(12px)" : "none",
        borderBottom: solid
          ? `1px solid color-mix(in oklab, ${light ? "var(--ink)" : "var(--cream)"} 10%, transparent)`
          : "1px solid transparent"
      }}
    >
      <div
        className={`relative z-[2] grid grid-cols-[1fr_auto] items-center px-6 transition-[padding] duration-500 md:px-12 lg:grid-cols-[1fr_auto_1fr] lg:px-20 ${
          scrolled ? "py-3" : "py-5 md:py-8"
        }`}
      >
        <a
          href="#top"
          className="flex items-center justify-self-start"
          aria-label="Rona Rangel"
          onClick={closeMenu}
        >
          <Image
            src="/images/brand/logo-wordmark.webp"
            alt="Rona Rangel"
            width={496}
            height={99}
            priority
            sizes="(min-width: 768px) 160px, 130px"
            className="h-6 w-auto transition-[filter] duration-500 md:h-8"
            style={light ? { filter: "invert(1) brightness(0.15)" } : undefined}
          />
        </a>

        <div className="hidden items-center gap-8 font-display text-lg font-normal tracking-[-0.01em] lg:flex xl:text-xl">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "true" : undefined}
              className="link-underline"
            >
              {item.label.toLowerCase()}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-self-end gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden rounded-full border px-7 py-2 font-display text-base font-light transition-colors sm:block ${
              light
                ? "border-ink/70 hover:bg-ink hover:text-cream"
                : "border-cream/70 hover:bg-cream hover:text-ink"
            }`}
            onClick={closeMenu}
          >
            Hablemos
          </a>

          <button
            type="button"
            className="site-nav__toggle lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className="mobile-navigation lg:hidden"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Navegación móvil">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              ref={index === 0 ? firstMobileLink : undefined}
              href={item.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
            >
              {item.label.toLowerCase()}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-navigation__cta"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        >
          Hablemos <span aria-hidden="true">→</span>
        </a>

        <div className="mobile-navigation__footer">
          <span>Diseño</span>
          <span>Fotografía</span>
          <span>Dirección creativa</span>
        </div>
      </div>
    </nav>
  );
}
