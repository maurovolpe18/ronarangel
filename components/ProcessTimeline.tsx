"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/data/content";

// La línea se dibuja de izquierda a derecha, los puntos aparecen y los pasos
// suben uno tras otro cuando el bloque entra en pantalla.
export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        className="absolute left-0 top-[11px] hidden h-px w-full origin-left bg-cream/80 transition-transform duration-1000 ease-out motion-reduce:transition-none md:block"
        style={{ transform: visible ? "scaleX(1)" : "scaleX(0)" }}
      />
      <div className="grid grid-cols-1 gap-12 px-6 md:grid-cols-3 md:gap-8 md:px-[8vw]">
        {processSteps.map((step) => (
          <div
            key={step.number}
            className="transition-all duration-700 ease-out motion-reduce:transition-none"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: step.delay
            }}
          >
            <div
              className="mb-8 hidden h-[26px] w-[26px] -translate-y-px rounded-full bg-cream transition-transform duration-500 motion-reduce:transition-none md:block"
              style={{
                transform: visible ? "scale(1)" : "scale(0)",
                transitionDelay: step.delay
              }}
            />
            <div className="font-display text-number font-bold tracking-[-0.03em] text-white">
              {step.number}
            </div>
            <h3 className="mt-3 font-display text-subtitle font-semibold tracking-[-0.02em] text-white md:mt-4">
              {step.title}
            </h3>
            <p className="mt-4 max-w-[19rem] font-display text-base font-light leading-relaxed text-white/90">
              {step.copy}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
