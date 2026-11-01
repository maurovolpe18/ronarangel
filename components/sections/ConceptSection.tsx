import { Reveal } from "@/components/Reveal";

export function ConceptSection() {
  return (
    <section
      id="concepto"
      className="flex items-center bg-paper px-6 py-20 md:min-h-[72vh] md:py-24 md:pl-[14.2vw] md:pr-12"
    >
      <Reveal className="w-full">
        <h2 className="font-display text-title font-normal leading-[1.12] tracking-[-0.04em] text-[#5e2129]">
          Detrás de cada proyecto{" "}
          <span className="font-semibold">
            hay
            <br className="hidden md:block" /> historias, preguntas y
            posibilidades.
          </span>
        </h2>
        {/* Siempre en dos líneas: cada una sin cortes, con el tamaño ligado al ancho. */}
        <p className="mt-8 font-display text-[3.55vw] font-light leading-snug tracking-[-0.02em] text-black md:mt-8 md:text-lead">
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
