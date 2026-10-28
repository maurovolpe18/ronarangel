import { Reveal } from "@/components/Reveal";
import { WorkGallery } from "@/components/WorkGallery";

export function WorkSection() {
  return (
    <section
      id="trabajos"
      aria-labelledby="trabajos-title"
      className="paper-grain relative overflow-hidden bg-beige px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mb-12 grid grid-cols-12 gap-4 md:mb-16">
        <div className="col-span-12 md:col-span-6">
          <div className="editorial-eyebrow mb-6 text-wine">
            Trabajos seleccionados
          </div>
          <h2
            id="trabajos-title"
            className="display-mag text-[14vw] leading-[0.9] md:text-[7vw] lg:text-[6vw]"
          >
            <span className="display-mag-bold">Portafolio.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-start-8 md:col-span-5 md:mt-10">
          <p className="max-w-md text-base font-light leading-relaxed text-ink-soft md:text-lg">
            Trabajos donde cada marca y cada imagen responden a una intención.
            Una composición editorial entre el diseño y la fotografía.
          </p>
        </div>
      </div>

      <WorkGallery />

      <Reveal className="mt-16 grid grid-cols-12 gap-x-6 gap-y-8 border-t border-ink/15 pt-12 md:mt-20 md:pt-16">
        <h3 className="display-mag col-span-12 text-4xl md:col-span-6 md:text-5xl lg:text-6xl">
          ¿Tienes una idea <span className="italic-accent">en mente?</span>
        </h3>
        <div className="col-span-12 md:col-start-8 md:col-span-5">
          <p className="max-w-sm text-base font-light leading-relaxed text-ink-soft">
            Me encantaría conocer tu proyecto y explorar cómo podemos darle
            forma.
          </p>
          <a
            href="#contacto"
            className="editorial-eyebrow group mt-8 inline-flex items-center gap-4 border border-ink px-5 py-3 text-ink transition-colors hover:bg-ink hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
          >
            Hablemos de tu proyecto
            <span
              aria-hidden="true"
              className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
