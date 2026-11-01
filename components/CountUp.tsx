"use client";

import { useEffect, useRef, useState } from "react";

// Cuenta hasta el valor final la primera vez que se ve. El HTML inicial ya
// trae el valor final, así que sin JavaScript o con "reducir movimiento" se
// muestra la cifra completa sin animar.
export function CountUp({
  to,
  prefix = "",
  duration = 1600
}: {
  to: number;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const started = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - started) / duration);
          setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = window.requestAnimationFrame(tick);
        };
        frame = window.requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums" aria-label={`${prefix}${to}`}>
      {prefix}
      {value}
    </span>
  );
}
