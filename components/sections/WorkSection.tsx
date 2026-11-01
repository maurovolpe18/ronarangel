import { Reveal } from "@/components/Reveal";
import { WorkGallery } from "@/components/WorkGallery";

export function WorkSection() {
  return (
    <section
      id="trabajos"
      aria-labelledby="trabajos-title"
      className="relative overflow-hidden bg-white px-6 py-16 md:px-12 md:py-24"
    >
      <Reveal className="mb-8 grid grid-cols-12 items-end gap-4 md:mb-10">
        <div className="col-span-12 md:col-span-6">
          <h2
            id="trabajos-title"
            className="font-display text-title tracking-[-0.045em]"
          >
            <span className="font-semibold">Portafolio.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-start-8 md:col-span-5">
          <p className="max-w-md text-base font-light leading-relaxed text-ink-soft">
            Una selección de proyectos que he tenido la oportunidad de
            conceptualizar, diseñar y desarrollar.
            <br />
            <br />
            Diferentes historias, necesidades y maneras de hacer las cosas. Cada
            proyecto tiene su propio recorrido, y eso es precisamente lo que más
            disfruto: que ninguno se resuelve exactamente igual.
          </p>
        </div>
      </Reveal>

      <WorkGallery />

      <Reveal className="mt-14 grid grid-cols-12 items-center gap-x-6 gap-y-6 rounded-[2rem] bg-ink p-8 text-cream md:mt-20 md:p-14">
        <h3 className="col-span-12 font-display text-[7.4vw] font-light leading-[1.05] tracking-[-0.04em] text-cream md:col-span-6 md:text-title">
          ¿Tienes un proyecto
          <br />
          <span className="font-semibold text-peach">en mente?</span>
        </h3>
        <div className="col-span-12 md:col-start-8 md:col-span-5">
          <p className="max-w-sm text-base font-light leading-relaxed text-cream/80">
            Me encantaría conocerlo. Podemos conversar sobre lo que estás
            creando, lo que necesitas y cómo podría acompañarte.
          </p>
          <a
            href="#contacto"
            className="group mt-6 inline-flex items-center gap-4 rounded-full bg-cream px-7 py-3.5 font-display text-base text-ink transition-colors hover:bg-peach focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
          >
            Hablemos de tu proyecto.
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
