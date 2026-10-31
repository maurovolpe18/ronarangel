const words = [
  "Diseño",
  "Fotografía",
  "Dirección creativa",
  "Branding",
  "Diagnóstico visual"
];

// Cinta continua entre el hero y el resto. Decorativa: el contenido ya está
// en el texto de la página, por eso se oculta a lectores de pantalla.
export function Ticker() {
  const line = words.map((word) => `${word} · `).join("");

  return (
    <div aria-hidden="true" className="overflow-hidden bg-cream pb-2 pt-6 md:pt-8">
      <div className="animate-marquee flex whitespace-nowrap font-display text-3xl font-extralight uppercase tracking-[-0.02em] text-wine/25 md:text-6xl">
        <span className="pr-4">{line}</span>
        <span className="pr-4">{line}</span>
        <span className="pr-4">{line}</span>
        <span className="pr-4">{line}</span>
      </div>
    </div>
  );
}
