import { FocusAccordion } from "@/components/FocusAccordion";

export function FocusSection() {
  return (
    <section
      id="enfoque"
      className="relative bg-cream px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-12 gap-4 md:mb-24">
          <div className="col-span-12 md:col-span-4">
            <h2 className="display-mag text-[14vw] leading-[0.9] md:text-[5vw]">
              Mi <span className="italic-accent">enfoque.</span>
            </h2>
          </div>
          <div className="col-span-12 flex items-end md:col-start-6 md:col-span-4">
            <p className="max-w-[320px] text-sm font-light leading-relaxed text-ink-soft">
              Tres dimensiones que dialogan entre sí para construir marcas con
              voz propia.
            </p>
          </div>
        </div>
        <FocusAccordion />
      </div>
    </section>
  );
}
