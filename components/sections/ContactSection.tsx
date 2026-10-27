import { ContactForm } from "@/app/ContactForm";

export function ContactSection() {
  return (
    <section
      id="contacto"
      className="relative bg-ink px-6 py-28 text-cream md:px-12 md:py-40"
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
            <span className="italic-accent" style={{ color: "#b54d25" }}>
              viste
            </span>
            ,
            <br />
            <span className="display-mag-bold">creemos algo</span>
            <br />
            juntos.
          </h2>
          <div className="mt-12 max-w-md space-y-5">
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
      <footer className="editorial-eyebrow mt-24 flex flex-col gap-4 border-t border-cream/15 pt-8 text-cream/50 md:mt-32 md:flex-row md:items-center md:justify-between">
        <span>© MMXXV · Rona Rangel · Todos los derechos reservados</span>
        <span>Diseño &amp; Dirección Editorial — RR Studio</span>
      </footer>
    </section>
  );
}
