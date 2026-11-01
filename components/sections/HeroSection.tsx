import Image from "next/image";

export function HeroSection() {
  return (
    <section
      id="top"
      data-nav="dark"
      className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-ink"
    >
      {/* Retrato recortado, centrado y atenuado; se corta en el borde inferior y
          el titular pasa por delante. */}
      <div className="pointer-events-none absolute left-1/2 top-[11%] w-[62vw] max-w-[22rem] -translate-x-[38%] md:top-[15%] md:w-[24vw] md:max-w-none md:-translate-x-1/2">
        <Image
          src="/images/hero-cutout.webp"
          alt="Rona Rangel"
          width={506}
          height={1500}
          priority
          sizes="(min-width: 768px) 24vw, 62vw"
          className="hero-fade h-auto w-full opacity-40"
        />
      </div>

      <div className="relative z-10 px-6 pb-24 pt-40 text-cream md:px-12 md:pb-[17vh] lg:px-14">
        {/* Todo se mide en vw para que titular y párrafo escalen juntos: el
            párrafo se ancla a la base de "identidad", no a la pantalla. */}
        <div className="relative">
          <h1 className="font-display text-cream">
            <span className="block">
              <span
                className="hero-from-left block whitespace-nowrap text-[19vw] font-extralight leading-[0.9] tracking-[-0.045em] md:text-[12.4vw]"
                style={{ animationDelay: "150ms" }}
              >
                ideas con
              </span>
            </span>
            <span className="block md:mt-[1vw] md:pl-[36vw]">
              <span
                className="hero-from-right block text-right text-[20vw] font-normal leading-[0.85] tracking-[-0.05em] md:text-left md:text-[13.6vw]"
                style={{ animationDelay: "320ms" }}
              >
                identidad
              </span>
            </span>
          </h1>

          <p
            className="hero-fade mt-8 max-w-[20rem] font-display text-lg font-light leading-snug md:absolute md:bottom-[1.4vw] md:left-0 md:mt-0 md:w-[32vw] md:max-w-none md:text-[clamp(1.05rem,1.75vw,1.6rem)]"
            style={{ animationDelay: "700ms" }}
          >
            Diseño y dirección creativa para dar forma a ideas, explorar
            posibilidades y construir marcas con personalidad.
          </p>
        </div>
      </div>
    </section>
  );
}
