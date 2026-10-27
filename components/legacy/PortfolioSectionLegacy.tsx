import Image from "next/image";
import { projects } from "@/data/content";

/**
 * Snapshot del diseño escalonado que mostraba todos los proyectos con el mismo
 * peso visual. No se renderiza; se conserva para poder restaurarlo fácilmente.
 */
export function PortfolioSectionLegacy() {
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
      <div className="mb-24 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-24 md:pb-24">
        {projects.map((project, index) => (
          <figure
            key={project.src}
            className="group md:even:translate-y-24"
          >
            <div className="overflow-hidden bg-[var(--beige-deep)]">
              <Image
                src={project.src}
                alt={project.alt}
                width={project.width}
                height={project.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              />
            </div>
            <figcaption className="editorial-eyebrow mt-4 flex flex-col gap-1 text-ink sm:flex-row sm:items-baseline sm:justify-between">
              <span>
                {String(index + 1).padStart(2, "0")} — {project.title}
              </span>
              <span className="text-ink-soft">{project.service}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
