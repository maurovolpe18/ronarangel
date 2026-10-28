"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/data/content";
import { useInView } from "@/lib/useInView";

export function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [sectionRef, inView] = useInView<HTMLElement>("100px");

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

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const pages = Math.max(1, testimonials.length - cardsPerView + 1);

  useEffect(() => {
    if (paused || reducedMotion || !inView) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % pages);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, inView, pages]);

  const slideWidth = 100 / cardsPerView;
  const offset = -(active * slideWidth);

  const previous = () => setActive((current) => (current - 1 + pages) % pages);
  const next = () => setActive((current) => (current + 1) % pages);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-cream px-6 py-20 text-ink md:px-12 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carrusel"
      aria-label="Testimonios"
    >
      <div className="mb-10 grid grid-cols-12 gap-4 md:mb-14">
        <div className="col-span-12 md:col-span-8">
          <div className="editorial-eyebrow mb-6 text-wine">Reseñas</div>
          <h2 className="display-mag text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95]">
            Algunas <span className="italic-accent">palabras</span>
            <br />
            sobre mi trabajo.
          </h2>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:transition-none"
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
                    className={`flex h-full min-h-[300px] flex-col justify-between rounded-[4px] border border-ink/10 bg-cream p-8 transition-all duration-700 motion-reduce:transition-none md:p-10 ${
                      visible ? "opacity-100" : "translate-y-2 opacity-35"
                    }`}
                  >
                    <div>
                      <h3 className="display-mag mb-6 text-[clamp(1.6rem,2.4vw,2.2rem)] font-light leading-none tracking-[-0.03em]">
                        &ldquo;
                        <span className="italic-accent">{testimonial.title}</span>
                        &rdquo;
                      </h3>
                      <p className="text-[0.95rem] font-light leading-[1.7] text-ink/85">
                        {testimonial.quote}
                      </p>
                    </div>
                    <footer className="mt-10 flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="h-px w-[22px] shrink-0 bg-wine"
                      />
                      <div className="flex flex-col">
                        <span className="editorial-eyebrow text-[0.7rem] text-ink">
                          {testimonial.name}
                        </span>
                        <span className="font-display text-[0.72rem] font-light italic text-wine/85">
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

        <div className="mt-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            {Array.from({ length: pages }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ver grupo de testimonios ${index + 1}`}
                aria-current={active === index ? "true" : undefined}
                onClick={() => setActive(index)}
                className={`h-1.5 cursor-pointer rounded-full border-none p-0 transition-all duration-500 ease-out motion-reduce:transition-none ${
                  active === index ? "w-6 bg-wine" : "w-1.5 bg-ink/20"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Testimonios anteriores"
              onClick={previous}
              className="h-11 w-11 cursor-pointer rounded-full border border-ink/20 bg-transparent leading-none text-ink transition-all duration-300 hover:-translate-x-0.5"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Testimonios siguientes"
              onClick={next}
              className="h-11 w-11 cursor-pointer rounded-full border border-ink bg-ink leading-none text-cream transition-all duration-300 hover:translate-x-0.5"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
