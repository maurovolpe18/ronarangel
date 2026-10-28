import { ProjectGallery } from "@/components/legacy/ProjectGallery";

/**
 * Portafolio como galería de proyectos (cuatro destacados y el resto
 * desplegable). No se renderiza; se conserva para poder restaurarlo.
 */
export function PortfolioSectionGallery() {
  return (
    <section
      id="proyectos"
      className="paper-grain relative overflow-hidden bg-beige px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mb-16 grid grid-cols-12 gap-4 md:mb-24">
        <div className="col-span-12 md:col-span-6">
          <div className="editorial-eyebrow mb-6 text-wine">Proyecto</div>
          <h2 className="display-mag text-[14vw] leading-[0.9] md:text-[7vw] lg:text-[6vw]">
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
      <ProjectGallery />
    </section>
  );
}
