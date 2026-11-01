"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const firstMobileLink = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <nav
      className={`site-nav fixed inset-x-0 top-0 z-50 text-cream transition-colors duration-500${
        menuOpen ? " is-menu-open" : ""
      }`}
      style={{
        backgroundColor:
          scrolled && !menuOpen
            ? "color-mix(in oklab, var(--ink) 88%, transparent)"
            : "transparent",
        backdropFilter: scrolled && !menuOpen ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled && !menuOpen ? "blur(10px)" : "none"
      }}
    >
      <div
        className={`relative z-[2] grid grid-cols-[1fr_auto] items-center px-6 transition-[padding] duration-500 md:px-12 lg:grid-cols-[1fr_auto_1fr] lg:px-20 ${
          scrolled ? "py-4" : "py-6 md:py-10"
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
            sizes="(min-width: 768px) 190px, 140px"
            className="h-7 w-auto md:h-9"
            style={menuOpen ? { filter: "invert(1) brightness(0.15)" } : undefined}
          />
        </a>

        <div className="hidden items-center gap-7 font-display text-[1.3rem] font-normal tracking-[-0.02em] lg:flex xl:gap-8 xl:text-[1.6rem]">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-opacity hover:opacity-60"
            >
              {item.label.toLowerCase()}.
            </a>
          ))}
        </div>

        <div className="flex items-center justify-self-end gap-2">
          <a
            href="#contacto"
            className="hidden rounded-full border border-cream/80 px-10 py-3 font-display text-lg font-extralight tracking-[-0.01em] transition-colors hover:bg-cream hover:text-ink sm:block xl:px-20 xl:text-xl"
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
            style={{ color: menuOpen ? "var(--ink)" : "var(--cream)" }}
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
              <span>{item.number}</span>
              {item.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="mobile-navigation__cta"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        >
          Cuéntame sobre tu proyecto <span aria-hidden="true">→</span>
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
