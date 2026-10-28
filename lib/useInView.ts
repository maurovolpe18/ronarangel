import { useEffect, useRef, useState } from "react";

/**
 * Indica si un elemento está (casi) en pantalla. Se usa para que los carruseles
 * con avance automático no hagan trabajo mientras nadie los ve.
 */
export function useInView<T extends Element>(rootMargin = "0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}
