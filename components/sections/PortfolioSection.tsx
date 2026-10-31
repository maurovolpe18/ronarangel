import { DisciplineAccordion } from "@/components/DisciplineAccordion";

export function PortfolioSection() {
  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="relative bg-cream px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-12 gap-4 md:mb-16">
          <div className="col-span-12 md:col-span-6">
            <div className="editorial-eyebrow mb-6 text-wine">
              Explora mi trabajo
            </div>
            <h2
              id="proyectos-title"
              className="display-mag text-[13vw] leading-[0.9] md:text-[6vw] lg:text-[5.5vw]"
            >
              De la idea
              <br />
              <span className="display-mag-bold">a la imagen.</span>
            </h2>
          </div>
          <div className="col-span-12 flex items-end md:col-start-8 md:col-span-5">
            <p className="max-w-md text-base font-light leading-relaxed text-ink-soft md:text-lg">
              Hay proyectos que necesitan encontrar su identidad desde cero. Otros
              necesitan una nueva dirección, una campaña, piezas gráficas o
              simplemente una perspectiva diferente.
              <br />
              <br />
              Trabajo en distintas etapas del proceso creativo, desde el análisis
              y la conceptualización hasta el diseño y el desarrollo visual.
            </p>
          </div>
        </div>

        <DisciplineAccordion />
      </div>
    </section>
  );
}
