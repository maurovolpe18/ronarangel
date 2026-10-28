import { ContactForm } from "@/app/ContactForm";

const ROMAN_NUMERALS: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
];

function toRoman(value: number) {
  let rest = value;
  return ROMAN_NUMERALS.reduce((result, [amount, symbol]) => {
    const times = Math.floor(rest / amount);
    rest -= times * amount;
    return result + symbol.repeat(times);
  }, "");
}

export function ContactSection() {
  return (
    <section
      id="contacto"
      className="relative bg-ink px-6 py-20 text-cream md:px-12 md:py-28"
    >
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-6">
          <div className="editorial-eyebrow mb-6 text-cream/60">
            Trabajemos juntos
          </div>
          <h2 className="display-mag mb-10 text-[12vw] leading-[0.9] text-cream md:text-[6.5vw] lg:text-[5.5vw]">
            Si conectas
            <br />
            con lo que{" "}
            <span className="italic-accent text-rust">
              viste
            </span>
            ,
            <br />
            <span className="display-mag-bold">creemos algo</span>
            <br />
            juntos.
          </h2>
          <div className="mt-10 max-w-md space-y-5">
            <a
              href="https://wa.me/5491156925330?text=Hola%2C%20quiero%20agendar%20una%20llamada"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-cream/20 pb-3"
            >
              <span className="editorial-eyebrow text-cream/70">WhatsApp</span>
              <span className="font-light transition-transform group-hover:translate-x-1">
                Escribir →
              </span>
            </a>
            <a
              href="https://www.instagram.com/ronarangel/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-cream/20 pb-3"
            >
              <span className="editorial-eyebrow text-cream/70">Instagram</span>
              <span className="font-light transition-transform group-hover:translate-x-1">
                @ronarangel →
              </span>
            </a>
            <a
              href="mailto:ronarangelmartinez@gmail.com"
              className="group flex items-center justify-between border-b border-cream/20 pb-3"
            >
              <span className="editorial-eyebrow text-cream/70">Email</span>
              <span className="font-light transition-transform group-hover:translate-x-1">
                ronarangelmartinez@gmail.com →
              </span>
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
      <footer className="editorial-eyebrow mt-16 flex flex-col gap-4 border-t border-cream/15 pt-8 text-cream/60 md:mt-20 md:flex-row md:items-center md:justify-between">
        <span>
          © {toRoman(new Date().getFullYear())} · Rona Rangel · Todos los
          derechos reservados
        </span>
        <span>Diseño &amp; Dirección Editorial — RR Studio</span>
      </footer>
    </section>
  );
}
