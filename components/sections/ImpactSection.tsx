import Image from "next/image";

export function ImpactSection() {
  return (
    <section className="relative h-[80vh] overflow-hidden bg-ink md:h-screen">
      <Image
        src="/images/impact-background.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/20" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center md:px-16">
        <div className="flex flex-wrap items-baseline justify-center gap-3 md:gap-6">
          <span className="display-mag-bold text-[24vw] leading-none text-white md:text-[18vw] lg:text-[16vw]">
            +100
          </span>
          <span className="display-mag max-w-[280px] text-left text-2xl leading-tight text-white md:max-w-[420px] md:text-4xl lg:text-5xl">
            marcas
            <br />
            <span className="font-light italic text-white">documentadas.</span>
          </span>
        </div>
        <p className="mt-8 max-w-md text-sm font-light leading-relaxed text-white/85 md:text-base">
          Una década dirigiendo identidad e imagen para marcas que entienden el
          valor de comunicar con intención.
        </p>
      </div>
    </section>
  );
}
