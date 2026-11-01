"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/data/content";
import { useInView } from "@/lib/useInView";

const AUTOPLAY_MS = 3500;
// Tras tocar el carrusel, el avance automático espera este tiempo.
const TOUCH_RESUME_MS = 6000;
// La lista se repite tres veces y el carrusel vive en la copia del medio:
// al acercarse a un extremo salta, sin animación, a la posición equivalente
// de la copia central. Así nunca se llega a un final.
const COPIES = 3;

// Cada proyecto muestra su portada (la primera imagen). Al abrirlo, un diálogo
// nativo (<dialog>: foco atrapado, Esc para cerrar) muestra las cuatro fotos.
export function WorkGallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const settleTimer = useRef<number | undefined>(undefined);
  const [carouselRef, inView] = useInView<HTMLDivElement>("100px");
  const [userPaused, setUserPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const count = caseStudies.length;

  // Distancia entre dos portadas consecutivas y ancho de una copia completa.
  const measure = () => {
    const track = trackRef.current;
    const slides = track?.children;
    if (!track || !slides || slides.length < count + 1) return null;
    const first = slides[0] as HTMLElement;
    const step = (slides[1] as HTMLElement).offsetLeft - first.offsetLeft;
    const setWidth = (slides[count] as HTMLElement).offsetLeft - first.offsetLeft;
    return { track, step, setWidth };
  };

  // Si se salió de la copia central, vuelve a la posición equivalente en ella.
  const recenter = () => {
    const m = measure();
    if (!m) return;
    const { track, setWidth } = m;
    if (track.scrollLeft < setWidth * 0.5) {
      track.scrollLeft += setWidth;
    } else if (track.scrollLeft >= setWidth * 1.5) {
      track.scrollLeft -= setWidth;
    }
  };

  useEffect(() => {
    const start = () => {
      const m = measure();
      if (m) m.track.scrollLeft = m.setWidth;
    };
    start();
    window.addEventListener("resize", start);
    return () => {
      window.removeEventListener("resize", start);
      window.clearTimeout(settleTimer.current);
    };
    // measure solo lee el DOM; se mide de nuevo en cada resize.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Avance automático infinito: se detiene con el mouse encima, al tocar, con
  // un proyecto abierto, con el botón de pausa o si se pidió reducir el movimiento.
  useEffect(() => {
    if (userPaused || interacting || !inView || active !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      const m = measure();
      if (m) m.track.scrollBy({ left: m.step, behavior: "smooth" });
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPaused, interacting, inView, active]);

  const scrollByCard = (direction: 1 | -1) => {
    const m = measure();
    if (!m) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    m.track.scrollBy({
      left: direction * m.step,
      behavior: reduced ? "auto" : "smooth"
    });
  };
  const project = active === null ? null : caseStudies[active];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || active === null) return;

    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  const slides = Array.from({ length: COPIES }, (_, copy) =>
    caseStudies.map((study, index) => ({ study, index, copy }))
  ).flat();

  return (
    <>
      <div
        ref={carouselRef}
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        onTouchStart={() => setInteracting(true)}
        onTouchEnd={() => window.setTimeout(() => setInteracting(false), TOUCH_RESUME_MS)}
      >
      <div className="mb-6 flex justify-end gap-3">
        <button
          type="button"
          aria-label={userPaused ? "Reanudar el movimiento automático" : "Pausar el movimiento automático"}
          aria-pressed={userPaused}
          onClick={() => setUserPaused((current) => !current)}
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            {userPaused ? (
              <path d="M2 1L11 6L2 11Z" />
            ) : (
              <path d="M2 1H4.5V11H2ZM7.5 1H10V11H7.5Z" />
            )}
          </svg>
        </button>
        <button
          type="button"
          aria-label="Proyecto anterior"
          onClick={() => scrollByCard(-1)}
          className="h-11 w-11 cursor-pointer rounded-full border border-ink/25 leading-none text-ink transition-colors hover:border-ink"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Proyecto siguiente"
          onClick={() => scrollByCard(1)}
          className="h-11 w-11 cursor-pointer rounded-full border border-ink bg-ink leading-none text-cream transition-colors hover:bg-wine"
        >
          →
        </button>
      </div>

      <div
        ref={trackRef}
        onScroll={() => {
          // Se recoloca cuando el desplazamiento se detiene, para no cortar
          // la animación ni el gesto con el dedo.
          window.clearTimeout(settleTimer.current);
          settleTimer.current = window.setTimeout(recenter, 140);
        }}
        role="group"
        aria-roledescription="carrusel"
        aria-label="Proyectos"
        className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:-mx-12 md:scroll-px-12 md:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map(({ study, index, copy }) => {
          // Solo la copia central es accesible; las otras son repeticiones visuales.
          const clone = copy !== 1;
          return (
          <button
            key={`${copy}-${study.title}`}
            type="button"
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setActive(index);
            }}
            aria-hidden={clone || undefined}
            tabIndex={clone ? -1 : undefined}
            aria-haspopup="dialog"
            aria-label={`Ver el proyecto ${study.title}`}
            className="group block w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[33%] cursor-pointer text-left"
          >
            <span className="relative block aspect-video overflow-hidden rounded-xl bg-[var(--beige-deep)]">
              <Image
                src={study.cover ?? study.images[0].src}
                alt={clone ? "" : study.images[0].alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.06]"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-display text-sm text-ink opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100"
              >
                Ver proyecto +
              </span>
            </span>
            <span className="mt-4 flex flex-col gap-1">
              <span className="font-display text-lg font-medium tracking-[-0.01em] text-ink">
                {study.title}
              </span>
              <span className="font-display text-sm font-light text-ink-soft">
                {study.service}
              </span>
            </span>
          </button>
          );
        })}
      </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="proyecto-title"
        onClose={() => {
          setActive(null);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          // Un clic en el fondo (fuera del contenido) cierra el diálogo.
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-h-[92dvh] w-[min(72rem,calc(100vw-1.5rem))] overflow-y-auto bg-cream p-0 text-ink backdrop:bg-ink/70 open:animate-panel-in"
      >
        {project && (
          <div className="p-5 md:p-10">
            <div className="mb-6 flex items-start justify-between gap-6 md:mb-8">
              <div>
                <div className="editorial-eyebrow mb-3 text-wine">
                  {project.service}
                </div>
                <h3
                  id="proyecto-title"
                  className="display-mag text-4xl md:text-6xl"
                >
                  {project.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={() => dialogRef.current?.close()}
                className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L13 13M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
              {project.images.map((image) => (
                <div
                  key={image.src}
                  className={`relative overflow-hidden bg-[var(--beige-deep)] ${
                    project.aspect === "classic" ? "aspect-[5/4]" : "aspect-video"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 640px) 36rem, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
