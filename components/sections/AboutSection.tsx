import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="relative bg-beige px-6 py-20 md:px-12 md:py-28">
      <div className="grid grid-cols-12 items-start gap-4 md:gap-8">
        <div className="col-span-12 md:col-start-1 md:col-span-6 md:mt-8 lg:col-start-1 lg:col-span-5">
          <div className="relative">
            <Image
              src="/images/portrait-frame.webp"
              alt="Retrato de Rona Rangel"
              width={1400}
              height={1621}
              sizes="(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw"
              className="h-auto w-full object-cover"
            />
            <div className="animate-gentle-float absolute bottom-6 right-2 z-10 max-w-[250px] md:-right-4 md:bottom-10 md:max-w-[320px] lg:-right-8">
              <div className="relative rounded-2xl rounded-br-sm bg-wine px-5 py-4 text-beige shadow-lg shadow-wine/20 md:px-6 md:py-5">
                <div className="space-y-2 text-xs font-light leading-snug md:text-sm">
                  <p className="text-sm md:text-base">
                    <span className="italic-accent text-peach">Hola, soy Rona.</span>
                  </p>
                  <p>
                    Me gusta involucrarme en las ideas, hacer preguntas y
                    encontrar posibilidades donde todavía hay cosas por definir.
                  </p>
                  <p>Y sí, soy de las que se fija hasta en el último detalle.</p>
                </div>
                <span
                  className="absolute -bottom-2 right-8 h-4 w-4 bg-wine"
                  style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 mt-10 md:col-start-7 md:col-span-6 md:mt-0 lg:col-start-7 lg:col-span-6">
          <div className="editorial-eyebrow mb-6 text-wine">Sobre mí</div>
          <h2 className="display-mag mb-8 text-[10vw] leading-[0.92] md:text-[5vw] lg:text-[4vw]">
            Diseño con
            <br />
            <span className="display-mag-bold">intención.</span>
            <br />
            <span className="italic-accent">Imagen</span> con memoria.
          </h2>
          <div className="max-w-lg space-y-5 text-base font-light leading-relaxed text-ink-soft md:text-lg">
            <p>Soy Rona Rangel, comunicadora, diseñadora y directora creativa.</p>
            <p>
              Mi formación comenzó en el periodismo, entre historias, preguntas
              y esa curiosidad por entender lo que ocurre detrás de las cosas.
              Con el tiempo, esa manera de observar encontró otros espacios en
              la fotografía, el diseño y la comunicación visual.
            </p>
            <p>
              Siempre he sido muy visual. Me interesan las imágenes, las
              composiciones, las atmósferas y esos pequeños detalles capaces de
              cambiar por completo la manera en que percibimos algo.
            </p>
            <p>
              Hoy disfruto llevar esa sensibilidad a mi trabajo con marcas y
              proyectos. Me gusta conocer a las personas detrás de una idea,
              entender qué quieren comunicar y participar en el proceso de
              convertirlo en algo real.
            </p>
            <p>
              Me involucro tanto en el concepto como en la ejecución. Me importa
              cómo se presenta una marca, cómo se relacionan sus elementos y qué
              experiencia tiene alguien al encontrarse con ella.
            </p>
            <p className="text-ink">
              Creo en el trabajo bien pensado, en las buenas conversaciones y en
              las colaboraciones donde hay espacio para proponer, experimentar y
              construir algo que se sienta verdaderamente propio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
