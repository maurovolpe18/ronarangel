"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/data/content";

export function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const nextCardsPerView = width < 640 ? 1 : width < 1024 ? 2 : 3;
      setCardsPerView(nextCardsPerView);
      setActive((current) =>
        Math.min(current, testimonials.length - nextCardsPerView)
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pages = Math.max(1, testimonials.length - cardsPerView + 1);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % pages);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused, pages]);

  const slideWidth = 100 / cardsPerView;
  const offset = -(active * slideWidth);

  const previous = () => setActive((current) => (current - 1 + pages) % pages);
  const next = () => setActive((current) => (current + 1) % pages);

  return (
    <section
      className="py-28 md:py-40 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "#fffeea", color: "#1b0905" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Testimonios"
    >
      <div className="grid grid-cols-12 gap-4 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-8">
          <div className="editorial-eyebrow mb-6" style={{ color: "#4c050d" }}>
            Reseñas
          </div>
          <h2
            className="display-mag leading-[0.95]"
            style={{
              color: "#1b0905",
              fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)"
            }}
          >
            Algunas{" "}
            <span className="italic-accent" style={{ color: "#4c050d" }}>
              palabras
            </span>
            <br />
            sobre mi trabajo.
          </h2>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
            style={{ transform: `translateX(${offset}%)` }}
          >
            {testimonials.map((testimonial, index) => {
              const visible = index >= active && index < active + cardsPerView;

              return (
              <div
                key={testimonial.title}
                className="shrink-0 px-3 md:px-4"
                style={{ width: `${slideWidth}%` }}
                aria-hidden={!visible}
              >
                <article
                  className="h-full flex flex-col justify-between p-8 md:p-10 transition-all duration-700"
                  style={{
                    backgroundColor: "#fffeea",
                    border: "1px solid rgba(27, 9, 5, 0.08)",
                    borderRadius: 4,
                    minHeight: 360,
                    transform: visible ? "translateY(0)" : "translateY(8px)",
                    opacity: visible ? 1 : 0.35
                  }}
                >
                  <div>
                    <h3
                      className="display-mag mb-6"
                      style={{
                        color: "#1b0905",
                        fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
                        fontWeight: 300,
                        letterSpacing: "-0.03em",
                        lineHeight: 1
                      }}
                    >
                      &ldquo;
                      <span
                        className="italic-accent"
                        style={{ color: "#4c050d" }}
                      >
                        {testimonial.title}
                      </span>
                      &rdquo;
                    </h3>
                    <p
                      className="font-light"
                      style={{
                        color: "#1b0905",
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        opacity: 0.85
                      }}
                    >
                      {testimonial.quote}
                    </p>
                  </div>
                  <footer className="mt-10 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      style={{
                        width: 22,
                        height: 1,
                        backgroundColor: "#4c050d",
                        flexShrink: 0
                      }}
                    />
                    <div className="flex flex-col">
                      <span
                        className="editorial-eyebrow"
                        style={{ color: "#1b0905", fontSize: "0.7rem" }}
                      >
                        {testimonial.name}
                      </span>
                      <span
                        className="italic font-light"
                        style={{
                          color: "#4c050d",
                          fontSize: "0.72rem",
                          opacity: 0.85
                        }}
                      >
                        {testimonial.role}
                      </span>
                    </div>
                  </footer>
                </article>
              </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-6">
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Seleccionar testimonio"
          >
            {Array.from({ length: pages }).map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-label={`Ir al grupo ${index + 1}`}
                className="transition-all duration-500 ease-out"
                onClick={() => setActive(index)}
                style={{
                  width: active === index ? 24 : 6,
                  height: 6,
                  borderRadius: 999,
                  backgroundColor: active === index ? "#4c050d" : "#1b0905",
                  opacity: active === index ? 1 : 0.2,
                  border: "none",
                  cursor: "pointer",
                  padding: 0
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Anterior"
              onClick={previous}
              className="transition-all duration-300 hover:-translate-x-0.5"
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                border: "1px solid rgba(27,9,5,0.2)",
                backgroundColor: "transparent",
                color: "#1b0905",
                cursor: "pointer",
                fontSize: "1rem",
                lineHeight: 1
              }}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={next}
              className="transition-all duration-300 hover:translate-x-0.5"
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                border: "1px solid #1b0905",
                backgroundColor: "#1b0905",
                color: "#fffeea",
                cursor: "pointer",
                fontSize: "1rem",
                lineHeight: 1
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
