import { ContactForm } from "@/app/ContactForm";

const links = [
  {
    label: "Whatsapp",
    value: "Escribir",
    href: "https://wa.me/5491156925330?text=Hola%2C%20quiero%20agendar%20una%20llamada",
    external: true
  },
  {
    label: "Instagram",
    value: "@ronarangel",
    href: "https://www.instagram.com/ronarangel/",
    external: true
  },
  {
    label: "Email",
    value: "ronarangelmartinez@gmail.com",
    href: "mailto:ronarangelmartinez@gmail.com",
    external: false
  }
];

export function ContactSection() {
  return (
    <section
      id="contacto"
      className="relative bg-ink px-6 py-20 text-cream md:px-12 md:py-16 lg:px-20"
    >
      <div className="grid grid-cols-12 items-center gap-y-12 md:gap-x-8">
        <div className="col-span-12 md:col-span-6">
          <h2 className="font-display text-[15vw] font-normal leading-[0.92] tracking-[-0.045em] text-cream md:text-[7.4vw]">
            ¿Te gustaría
            <br />
            crear juntos?
          </h2>
          <p className="mt-6 max-w-sm font-display text-lg font-light leading-snug tracking-[0.01em] text-cream md:text-[1.45vw]">
            Cuéntame tu idea y conversemos sobre cómo podemos trabajar juntos.
          </p>

          <div className="mt-12 max-w-[37rem]">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center justify-between gap-4 border-b border-cream/80 pb-4 pt-8 font-display text-lg font-light md:text-[1.45vw]"
              >
                <span>{link.label}</span>
                <span className="truncate transition-opacity group-hover:opacity-70">
                  {link.value}
                </span>
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>

      <footer className="mt-12 font-display text-sm font-light text-cream md:mt-10 md:text-base">
        Rona Rangel · Todos los derechos reservados
      </footer>
    </section>
  );
}
