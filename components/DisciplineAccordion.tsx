"use client";

import { useEffect, useRef, useState } from "react";
import { caseStudies, disciplines } from "@/data/content";

const disciplinesWithWork = new Set(
  caseStudies.flatMap((study) => study.disciplines)
);

// Con mouse se abre al pasar por encima (tras una breve pausa, para no abrir
// filas al cruzarlas) y un clic nunca lo cierra. Con touch o teclado, cada fila
// se abre y se cierra al tocarla. Cada disciplina con trabajos enlaza a la
// sección de portafolio.
const HOVER_DELAY_MS = 120;
// Mientras una fila se abre, las demás se desplazan; se ignoran los eventos de
// puntero hasta que termina la animación para no abrir filas en cadena.
const HOVER_LOCK_MS = 750;

export function DisciplineAccordion() {
  const [active, setActive] = useState<number | null>(0);
  const hoverTimer = useRef<number | undefined>(undefined);
  const locked = useRef(false);
  const lockTimer = useRef<number | undefined>(undefined);
  const pointerType = useRef("");

  useEffect(
    () => () => {
      window.clearTimeout(hoverTimer.current);
      window.clearTimeout(lockTimer.current);
    },
    []
  );

  const open = (index: number) => {
    locked.current = true;
    window.clearTimeout(lockTimer.current);
    lockTimer.current = window.setTimeout(() => {
      locked.current = false;
    }, HOVER_LOCK_MS);
    setActive(index);
  };

  return (
    <div className="border-t border-ink/15">
      {disciplines.map((discipline, index) => {
        const isOpen = active === index;
        const panelId = `disciplina-${discipline.number}`;
        const { href } = discipline;

        return (
          <div
            key={discipline.number}
            className="border-b border-ink/15 transition-colors"
          >
            <h3>
              <button
                type="button"
                className="group grid w-full cursor-pointer grid-cols-12 items-center gap-4 py-8 text-left md:gap-8 md:py-10"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onPointerDown={(event) => {
                  pointerType.current = event.pointerType;
                }}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "mouse" || isOpen) return;
                  window.clearTimeout(hoverTimer.current);
                  hoverTimer.current = window.setTimeout(() => {
                    if (!locked.current) open(index);
                  }, HOVER_DELAY_MS);
                }}
                onPointerLeave={() => window.clearTimeout(hoverTimer.current)}
                onClick={(event) => {
                  // detail 0: activado con el teclado.
                  if (event.detail > 0 && pointerType.current === "mouse") {
                    open(index);
                  } else {
                    setActive(isOpen ? null : index);
                  }
                }}
              >
                <span className="col-span-3 md:col-span-2">
                  <span className="display-mag text-5xl leading-none text-ink tabular-nums md:text-7xl lg:text-8xl">
                    {discipline.number}
                  </span>
                </span>
                <span className="col-span-7 md:col-span-8">
                  <span className="editorial-eyebrow mb-2 block text-wine md:mb-3">
                    {discipline.word}
                  </span>
                  <span className="display-mag block text-4xl font-semibold leading-[0.95] text-ink md:text-6xl lg:text-7xl">
                    {discipline.title}
                  </span>
                </span>
                <span className="col-span-2 flex justify-end">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-rust transition-all duration-500 motion-reduce:transition-none md:h-12 md:w-12 ${
                      isOpen ? "rotate-45 bg-rust text-cream" : "bg-transparent text-rust"
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1V13M1 7H13"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-label={discipline.title}
              className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="grid grid-cols-12 gap-4 pb-10 md:gap-8 md:pb-14">
                  <div className="col-span-12 md:col-start-3 md:col-span-8">
                    <p className="max-w-2xl text-base font-light leading-relaxed text-ink-soft md:text-lg">
                      {discipline.copy}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="editorial-eyebrow mt-6 inline-flex items-center gap-3 text-ink transition-colors hover:text-wine"
                      >
                        Ver proyectos
                        <span aria-hidden="true">→</span>
                      </a>
                    ) : (
                      disciplinesWithWork.has(discipline.id) && (
                        <a
                          href="#trabajos"
                          className="editorial-eyebrow mt-6 inline-flex items-center gap-3 text-ink transition-colors hover:text-wine"
                        >
                          Ver trabajos
                          <span aria-hidden="true">→</span>
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
