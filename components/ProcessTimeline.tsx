"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/data/content";

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
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-0 right-0 top-0 hidden h-px bg-cream/15 md:block" />
      <div
        className="absolute left-0 top-0 hidden h-px origin-left bg-cream/70 transition-transform duration-700 ease-out motion-reduce:transition-none md:block"
        style={{
          width: "100%",
          transform: visible ? "scaleX(1)" : "scaleX(0)"
        }}
      />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
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
              className="-mt-[5px] mb-10 hidden h-3 w-3 rounded-full bg-cream transition-transform duration-500 motion-reduce:transition-none md:block"
              style={{ transform: visible ? "scale(1)" : "scale(0)" }}
            />
            <div className={step.offset}>
              <div className="editorial-eyebrow mb-3 text-beige/80">
                Etapa {step.number}
              </div>
              <h3 className="display-mag mb-5 text-4xl text-cream md:text-5xl">
                {step.title}
              </h3>
              <p className="max-w-[300px] text-[0.95rem] font-light leading-relaxed text-cream/80">
                {step.copy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
