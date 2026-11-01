import { Reveal } from "@/components/Reveal";

export function ConceptSection() {
  return (
    <section
      id="concepto"
      className="flex min-h-[70vh] items-center bg-[#fffeea] px-6 py-24 md:h-screen md:min-h-[36rem] md:py-0 md:pl-[14.2vw] md:pr-12"
    >
      <Reveal className="w-full md:translate-y-[4.5vh]">
        <h2 className="font-display text-[9vw] font-normal leading-[1.08] tracking-[-0.04em] text-[#5e2129] md:text-[4.72vw] md:leading-[1.19]">
          Detrás de cada proyecto{" "}
          <span className="font-semibold">
            hay
            <br className="hidden md:block" /> historias, preguntas y
            posibilidades.
          </span>
        </h2>
        {/* Siempre en dos líneas: cada una sin cortes, con el tamaño ligado al ancho. */}
        <p className="mt-8 font-display text-[3.55vw] font-light leading-snug tracking-[-0.02em] text-black md:mt-[2.6vw] md:text-[2.3vw] md:leading-[1.3]">
          <span className="block whitespace-nowrap">
            Me gusta entender qué lo hace diferente y encontrar
          </span>
          <span className="block whitespace-nowrap">
            la mejor manera de expresarlo visualmente.
          </span>
        </p>
      </Reveal>
    </section>
  );
}
