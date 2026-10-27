import Image from "next/image";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--ink)]"
    >
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/hero-desktop.jpg"
          alt="Rona Rangel"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />
      </div>
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/hero-mobile.jpg"
          alt="Rona Rangel"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-32 md:pb-24">
        <div className="grid grid-cols-12 gap-4 px-6 md:px-12 lg:px-16">
          <div className="editorial-eyebrow absolute left-6 top-28 text-cream/70 md:left-12 md:top-36 md:text-cream">
            Diseño · Fotografía · Dirección Creativa
          </div>
          <div className="col-span-12 mt-8 text-cream md:col-span-7 md:mt-10 lg:col-span-6">
            <div className="rule-thin mb-6 w-12 bg-current opacity-60" />
            <p className="display-mag max-w-xl text-3xl font-light leading-[1.05] md:text-5xl lg:text-6xl">
              Construyo marcas desde la{" "}
              <span className="italic-accent" style={{ color: "#b54d25" }}>
                sensibilidad
              </span>
              , la estética y la intención.
            </p>
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed opacity-85 md:text-base">
              A través del diseño, la fotografía y una forma
              <br />
              de comunicar que conecta.
            </p>
            <a
              href="#proyectos"
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
