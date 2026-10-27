"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const firstMobileLink = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeDesktopMenu = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
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
  const solid = scrolled || menuOpen;
  const navColor = solid ? "var(--ink)" : "oklch(0.92 0.018 95)";

  return (
    <nav
      className={`site-nav fixed inset-x-0 top-0 z-50 transition-colors duration-500${
        menuOpen ? " is-menu-open" : ""
      }`}
      style={{
        backgroundColor: solid
          ? "color-mix(in oklab, var(--cream) 88%, transparent)"
          : "transparent",
        backdropFilter: solid ? "blur(10px)" : "none",
        WebkitBackdropFilter: solid ? "blur(10px)" : "none",
        borderBottom: solid
          ? "1px solid color-mix(in oklab, var(--ink) 8%, transparent)"
          : "1px solid transparent"
      }}
    >
      <div
        className="relative z-[2] flex items-center justify-between px-6 py-5 md:px-10"
      >
        <a
          href="#top"
          className="flex items-center"
          aria-label="Rona Rangel"
          onClick={closeMenu}
        >
          <Image
            src="/images/brand/logo.webp"
            alt="Rona Rangel"
            width={680}
            height={383}
            priority
            sizes="(min-width: 1024px) 170px, (min-width: 768px) 140px, 100px"
            className="h-14 w-auto transition-[filter] duration-500 md:h-20 lg:h-24"
            style={{ filter: solid ? "invert(1) brightness(0.15)" : "none" }}
          />
        </a>

        <div
          className="editorial-eyebrow hidden gap-8 transition-colors duration-500 md:flex"
          style={{ color: navColor }}
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-opacity hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#contacto"
            className="editorial-eyebrow hidden px-4 py-2 transition-colors duration-500 sm:block"
            style={{
              backgroundColor: solid ? "var(--ink)" : "var(--cream)",
              color: solid ? "var(--cream)" : "var(--ink)"
            }}
            onClick={closeMenu}
          >
            Hablemos →
          </a>

          <button
            type="button"
            className="site-nav__toggle md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((current) => !current)}
            style={{ color: navColor }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className="mobile-navigation md:hidden"
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
