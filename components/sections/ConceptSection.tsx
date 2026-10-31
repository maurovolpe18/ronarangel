export function ConceptSection() {
  return (
    <section
      id="concepto"
      className="relative overflow-hidden bg-cream px-6 pb-14 pt-8 md:px-12 md:pb-20 md:pt-10"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="display-mag-bold text-balance text-[9.5vw] md:text-[5vw]">
          Una <span className="italic-accent font-light">idea</span> antes
          <br />
          que una imagen.
        </h2>
        <p className="mt-5 text-lg font-medium tracking-[-0.01em] text-wine md:text-xl">
          Construir una marca va más allá de lo visual.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-6 text-base font-light leading-relaxed text-ink-soft md:mt-12 md:grid-cols-3 md:gap-10">
        <p>
          Detrás de una identidad hay decisiones, preguntas, conversaciones y
          muchas posibilidades por explorar.
        </p>
        <p>
          Me interesa entender qué hace diferente a cada proyecto y encontrar la
          manera de expresarlo con claridad, personalidad y una dirección visual
          que tenga sentido.
        </p>
        <p>
          Es una de las partes que más disfruto de mi trabajo: ese momento en el
          que las ideas empiezan a encontrar su lugar.
        </p>
      </div>
    </section>
  );
}
