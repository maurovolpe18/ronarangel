"use client";

import Image from "next/image";
import { useState } from "react";
import { projects } from "@/data/content";

const FEATURED_PROJECT_COUNT = 4;

type Project = (typeof projects)[number];

function ProjectCaption({
  index,
  project
}: {
  index: number;
  project: Project;
}) {
  return (
    <figcaption className="editorial-eyebrow mt-4 flex flex-col gap-1 text-ink sm:flex-row sm:items-baseline sm:justify-between">
      <span>
        {String(index + 1).padStart(2, "0")} — {project.title}
      </span>
      <span className="text-ink-soft">{project.service}</span>
    </figcaption>
  );
}

export function ProjectGallery() {
  const [expanded, setExpanded] = useState(false);
  const featuredProjects = projects.slice(0, FEATURED_PROJECT_COUNT);
  const additionalProjects = projects.slice(FEATURED_PROJECT_COUNT);
  const hasAdditionalProjects = additionalProjects.length > 0;

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-24 md:pb-24">
        {featuredProjects.map((project, index) => (
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
            <ProjectCaption index={index} project={project} />
          </figure>
        ))}
      </div>

      {hasAdditionalProjects && (
        <div className="mt-16 border-t border-ink/15 pt-8 md:mt-20">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <p className="max-w-md text-sm font-light leading-relaxed text-ink-soft">
              Una selección más amplia de identidades, imágenes y exploraciones
              editoriales.
            </p>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls="additional-projects"
              onClick={() => setExpanded((current) => !current)}
              className="editorial-eyebrow inline-flex items-center gap-4 border border-ink px-5 py-3 text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              {expanded
                ? "Ocultar proyectos"
                : `Ver todos los proyectos (${projects.length})`}
              <span
                aria-hidden="true"
                className={`text-base leading-none transition-transform duration-300 ${
                  expanded ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
          </div>

          {expanded && (
            <div
              id="additional-projects"
              className="mt-12 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            >
              {additionalProjects.map((project, index) => {
                const projectIndex = index + FEATURED_PROJECT_COUNT;

                return (
                  <figure key={project.src} className="group">
                    <div className="aspect-[4/3] overflow-hidden bg-[var(--beige-deep)]">
                      <Image
                        src={project.src}
                        alt={project.alt}
                        width={project.width}
                        height={project.height}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                      />
                    </div>
                    <ProjectCaption
                      index={projectIndex}
                      project={project}
                    />
                  </figure>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
