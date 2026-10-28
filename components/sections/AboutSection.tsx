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
            <div className="animate-gentle-float absolute bottom-6 right-2 z-10 max-w-[220px] md:-right-4 md:bottom-10 md:max-w-[260px] lg:-right-8">
              <div className="relative rounded-2xl rounded-br-sm bg-wine px-5 py-4 text-beige shadow-lg shadow-wine/20 md:px-6 md:py-5">
                <p className="text-sm font-light leading-snug md:text-base">
                  <span className="italic-accent text-peach">Hola,</span> yo me encargo de
                  llevar tu marca a{" "}
                  <span className="text-peach">otro nivel.</span>
                </p>
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
            <p>
              Comencé a trabajar en la creación de marcas porque creo en el
              potencial que tienen para conectar con otros a través de su
              comunicación visual.
            </p>
            <p>
              Su construcción, cuando es pensada con intención, puede abrir un
              mundo de posibilidades.
            </p>
            <p>
              Creo en la <span className="italic-accent">fotografía</span> como
              una forma de memoria y conexión: una manera de detener el tiempo y
              darle voz a lo que sentimos, incluso cuando no sabemos cómo
              decirlo.
            </p>
            <p className="text-ink">
              Mi trabajo se mueve entre el diseño, la narrativa y la imagen,
              donde cada elemento cumple un propósito.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
