"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/data/content";

// Escritorio: la línea se dibuja de izquierda a derecha, los puntos aparecen y
// los pasos suben uno tras otro cuando el bloque entra en pantalla.
// Mobile: la línea es vertical y avanza con el scroll; cada punto aparece
// cuando la línea llega a su paso.
export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const mobile = window.matchMedia("(max-width: 767px)");

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!mobile.matches) return;
      const rect = node.getBoundingClientRect();
      // 0 cuando el bloque asoma por el 70% de la pantalla; 1 cuando su final
      // llega a ese mismo punto.
      const anchor = window.innerHeight * 0.7;
      const progress = (anchor - rect.top) / rect.height;
      setLineProgress(Math.min(1, Math.max(0, progress)));
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
      {/* Mobile: la línea es vertical y se dibuja a medida que se baja. */}
      <div
        aria-hidden="true"
        className="absolute bottom-2 left-[calc(1.5rem+6px)] top-2 w-px origin-top bg-cream/70 motion-reduce:![scale:1] md:hidden"
        style={{ scale: `1 ${lineProgress}` }}
      />
      <div className="grid grid-cols-1 gap-12 px-6 md:grid-cols-3 md:gap-8 md:px-[8vw]">
        {processSteps.map((step, index) => (
          <div
            key={step.number}
            className="relative pl-10 transition-all duration-700 ease-out motion-reduce:transition-none md:pl-0"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: step.delay
            }}
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-2 h-[13px] w-[13px] rounded-full bg-cream transition-[scale] duration-500 motion-reduce:![scale:1] md:hidden"
              style={{
                scale: lineProgress >= index / processSteps.length ? "1" : "0"
              }}
            />
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
