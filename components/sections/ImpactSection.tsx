import Image from "next/image";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";

// Mosaico de retratos de fondo, en tres columnas; la cifra va por delante.
const photos = Array.from({ length: 12 }, (_, index) => `/images/collage/${String(index + 1).padStart(2, "0")}.jpg`);

export function ImpactSection() {
  return (
    <section id="cifras" data-nav="dark" className="relative h-[70svh] min-h-[30rem] overflow-hidden bg-ink md:h-[75svh] md:max-h-[46rem]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-[14%] grid grid-cols-3 gap-3 bg-cream md:-top-[22%] md:gap-5"
      >
        {photos.map((src) => (
          <div key={src} className="relative aspect-[3/5] md:aspect-[16/10]">
            <Image src={src} alt="" fill sizes="33vw" className="object-cover object-top" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black/75" />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <Reveal className="text-cream">
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-8">
            <span className="font-display text-stat font-bold tracking-[-0.05em]">
              <CountUp to={100} prefix="+" />
            </span>
            <div className="font-display">
              <span className="block text-[clamp(2rem,4.2vw,3.75rem)] font-light leading-[0.95] tracking-[-0.02em]">
                MARCAS
              </span>
              <span className="block text-[clamp(1.55rem,3.25vw,2.9rem)] font-bold italic leading-[0.95] tracking-[-0.02em]">
                DOCUMENTADAS
              </span>
              <p className="mt-4 text-lead font-light">
                historias convertidas en <span className="font-normal">identidad visual.</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
