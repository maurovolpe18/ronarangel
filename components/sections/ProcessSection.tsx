import { ProcessTimeline } from "@/components/ProcessTimeline";

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--wine-deep)] px-6 py-20 text-cream md:px-12 md:py-28">
      <div className="mb-14 md:mb-20">
        <div className="editorial-eyebrow mb-6 text-cream/70 md:ml-8">
          Proceso
        </div>
        <h2 className="display-mag text-[16vw] leading-[0.85] text-cream md:ml-4 md:text-[9vw] lg:text-[8vw]">
          Work
          <br />
          <span className="display-mag-bold italic text-rust md:ml-24">
            Process.
          </span>
        </h2>
      </div>
      <ProcessTimeline />
      <div className="mt-16 flex flex-col gap-6 border-t border-cream/20 pt-8 md:mt-20 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md font-light leading-relaxed text-cream/80">
          Cada proyecto comienza con una llamada de descubrimiento, donde vemos
          si hay un buen match y cómo puedo acompañarte.
        </p>
        <a
          href="#contacto"
          className="editorial-eyebrow self-start px-5 py-3 transition-opacity hover:opacity-80 md:self-auto"
          style={{ backgroundColor: "var(--beige)", color: "var(--ink)" }}
        >
          Agendar llamada →
        </a>
      </div>
    </section>
  );
}
