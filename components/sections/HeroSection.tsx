import { getImageProps } from "next/image";

const heroImage = {
  alt: "Rona Rangel",
  fill: true,
  priority: true,
  sizes: "100vw"
} as const;

export function HeroSection() {
  // Un solo <picture>: el navegador descarga únicamente la imagen que le toca,
  // en vez de las dos versiones (escritorio y mobile).
  const { props: desktop } = getImageProps({ ...heroImage, src: "/images/hero-desktop.jpg" });
  const { props: mobile } = getImageProps({ ...heroImage, src: "/images/hero-mobile.jpg" });

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--ink)]"
    >
      <div className="absolute inset-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktop.src} />
          <img {...mobile} alt={mobile.alt} className="object-cover object-center" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80 md:bg-gradient-to-r md:from-black/50 md:via-black/15 md:to-transparent" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-32 md:pb-24">
        <div className="grid grid-cols-12 gap-4 px-6 md:px-12 lg:px-16">
          <div className="editorial-eyebrow absolute left-6 top-28 text-cream/70 md:left-12 md:top-36 md:text-cream lg:left-16">
            Diseño · Fotografía · Dirección Creativa
          </div>
          <div className="col-span-12 mt-8 text-cream md:col-span-12 md:mt-10">
            <div className="rule-thin mb-6 w-12 bg-current opacity-60" />
            {/* Tres líneas en escritorio; en mobile se equilibra el corte solo. */}
            <h1 className="display-mag text-balance text-4xl font-light md:whitespace-nowrap leading-[1.02] text-cream md:text-5xl lg:text-6xl min-[1400px]:text-7xl">
              Construyo marcas desde la
              <br className="hidden md:block" />{" "}
              <span className="italic-accent text-rust">sensibilidad</span>, la estética
              <br className="hidden md:block" />{" "}
              y la intención.
            </h1>
            <p className="mt-6 max-w-sm text-sm font-light leading-relaxed opacity-85 md:text-base">
              A través del diseño, la fotografía y una forma de comunicar que
              conecta.
            </p>
            <a
              href="#trabajos"
              className="editorial-eyebrow mt-10 inline-flex items-center gap-3 px-5 py-3 transition-all hover:gap-5"
              style={{ backgroundColor: "var(--beige)", color: "var(--ink)" }}
            >
              Ver proyectos <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
