export function ConceptSection() {
  return (
    <section
      id="concepto"
      className="relative overflow-hidden bg-cream px-6 py-32 md:px-12 md:py-48"
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-1 col-span-12 md:col-start-2 md:col-span-9 lg:col-start-2 lg:col-span-8">
          <div className="editorial-eyebrow mb-10 text-wine">
            Una idea antes que una imagen
          </div>
          <h2 className="display-mag mb-12 text-[10vw] md:text-[7vw] lg:text-[5.5vw]">
            Construir una marca va{" "}
            <span className="italic-accent">más allá</span>
            <br />
            de lo visual.
          </h2>
        </div>
        <div className="col-start-1 col-span-12 mt-4 md:col-start-6 md:col-span-6">
          <p className="max-w-xl text-lg font-light leading-relaxed text-ink-soft md:text-xl">
            Cada decisión, desde la idea hasta la imagen, nace desde una
            intención.
          </p>
          <div className="rule-thin my-8 w-16 text-wine" />
          <p className="max-w-lg text-base font-light leading-relaxed text-ink md:text-lg">
            Cuando hay <span className="italic-accent">claridad</span> en lo que
            se quiere decir, todo lo demás encuentra su lugar.
          </p>
        </div>
      </div>
    </section>
  );
}
