import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-white px-6 py-20 md:px-12 md:py-24">
      <div className="relative mx-auto max-w-[84rem]">
        {/* El titular queda por delante de la foto: "Rona" la cruza. */}
        <h2 className="relative z-10 text-center font-display text-[17vw] font-extralight leading-[0.85] tracking-[-0.05em] text-ink md:text-[12.8vw]">
          Hi, i´m <span className="font-normal">Rona</span>
        </h2>

        <div className="relative -mt-[6vw] grid grid-cols-12 md:-mt-[4.2vw]">
          <p className="order-3 col-span-12 mt-8 font-display text-xl font-light leading-snug text-ink md:order-1 md:col-span-4 md:mt-0 md:self-end md:pr-6 md:text-right md:text-[1.75vw]">
            Comunicadora, diseñadora
            <br />y directora creativa.
          </p>

          <div className="relative order-1 col-span-12 aspect-square w-full md:order-2 md:col-span-4">
            <Image
              src="/images/about-portrait.jpg"
              alt="Retrato de Rona Rangel frente a una pared terracota"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="relative z-10 order-2 col-span-12 -mt-10 mx-4 border border-ink bg-cream p-7 font-display text-lg font-light leading-snug text-ink md:order-3 md:col-span-4 md:mx-0 md:-ml-[6vw] md:mt-[9vw] md:self-start md:p-10 md:pr-8 md:text-[1.6vw] md:w-[calc(100%+6vw)]">
            <p>
              Vengo del periodismo, de hacer preguntas, observar y contar
              historias. Con el tiempo encontré en el diseño otra manera de
              hacerlo.
            </p>
            <p className="mt-[1em]">
              Me apasiona crear identidades, desarrollar conceptos y acompañar
              proyectos desde las primeras ideas hasta los últimos detalles.
              Disfruto tanto pensar una dirección como verla cobrar vida.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
