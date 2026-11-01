import { DisciplineAccordion } from "@/components/DisciplineAccordion";
import { Reveal } from "@/components/Reveal";

export function PortfolioSection() {
  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="relative bg-paper px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 grid grid-cols-12 gap-4 md:mb-12">
          <div className="col-span-12 md:col-span-6">
            <h2
              id="proyectos-title"
              className="font-display text-title font-extralight tracking-[-0.045em]"
            >
              De la idea
              <br />
              <span className="font-semibold">a la imagen.</span>
            </h2>
          </div>
          <div className="col-span-12 flex items-end md:col-start-8 md:col-span-5">
            <p className="max-w-lg font-display text-lead font-light text-ink-soft">
              Hay proyectos que necesitan encontrar su identidad desde cero. Otros
              necesitan una nueva dirección, una campaña, piezas gráficas o
              simplemente una perspectiva diferente.
              <br />
              <br />
              Trabajo en distintas etapas del proceso creativo, desde el análisis
              y la conceptualización hasta el diseño y el desarrollo visual.
            </p>
          </div>
        </Reveal>

        <DisciplineAccordion />
      </div>
    </section>
  );
}
