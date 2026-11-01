import Image from "next/image";

// Mosaico de retratos de fondo, en tres columnas; la cifra va por delante.
const photos = Array.from({ length: 12 }, (_, index) => `/images/collage/${String(index + 1).padStart(2, "0")}.jpg`);

export function ImpactSection() {
  return (
    <section id="cifras" className="relative h-[80svh] min-h-[32rem] overflow-hidden bg-ink md:h-[100svh] md:max-h-[60rem]">
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
        <div className="text-cream">
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-8">
            <span className="font-display text-[26vw] font-bold leading-[0.8] tracking-[-0.05em] md:text-[11vw]">
              +100
            </span>
            <span className="font-display leading-[0.95]">
              <span className="block text-[11vw] font-light tracking-[-0.02em] md:text-[5vw]">
                MARCAS
              </span>
              <span className="block text-[8.6vw] font-bold italic tracking-[-0.02em] md:text-[3.85vw]">
                DOCUMENTADAS
              </span>
            </span>
          </div>
          <p className="mt-6 font-display text-lg font-light tracking-[0.01em] md:ml-[calc(11vw*2.2+2rem)] md:mt-4 md:text-[1.6vw]">
            historias convertidas en <span className="font-normal">identidad visual.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
