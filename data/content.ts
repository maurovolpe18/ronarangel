export const navigation = [
  { href: "#about", label: "Sobre mí", number: "01" },
  { href: "#enfoque", label: "Servicios", number: "02" },
  { href: "#proyectos", label: "Proyectos", number: "03" },
  { href: "#contacto", label: "Contacto", number: "04" },
] as const;

export const services = [
  {
    number: "01",
    title: "Diseño",
    copy: "Identidad, sistemas visuales y aplicaciones digitales. Construcción de marcas que sostienen un lenguaje propio en cada superficie.",
  },
  {
    number: "02",
    title: "Estrategia",
    copy: "Construcción de marcas con propósito, claridad y coherencia. Definición de concepto, mensaje y dirección creativa.",
  },
  {
    number: "03",
    title: "Fotografía",
    copy: "Narrativa visual, contenido y dirección de imagen. Cada pieza pensada para sostener la voz de la marca.",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    copy: "Conversamos. Entendemos contexto, intención y dirección. Definimos el lenguaje del proyecto.",
    offset: "md:mt-6",
    delay: "0ms",
  },
  {
    number: "02",
    title: "Visual Direction",
    copy: "Construimos un universo visual: referencias, paleta, tipografía y atmósfera fotográfica.",
    offset: "md:mt-16",
    delay: "120ms",
  },
  {
    number: "03",
    title: "Capture & Delivery",
    copy: "Producción, captura y entrega de un sistema completo, listo para vivir en cada superficie.",
    offset: "md:mt-6",
    delay: "240ms",
  },
] as const;

export const projects = [
  {
    src: "/images/projects/criterion.jpg",
    width: 1200,
    height: 1500,
    alt: "Estudio de identidad — Cíterion",
    title: "Cíterion",
    service: "Identidad · Papelería",
  },
  {
    src: "/images/projects/florario.jpg",
    width: 1200,
    height: 1500,
    alt: "Still life floral",
    title: "Florario",
    service: "Dirección de imagen",
  },
  {
    src: "/images/projects/editorial.jpg",
    width: 1500,
    height: 1100,
    alt: "Editorial spread",
    title: "Editorial",
    service: "Diseño · Maquetación",
  },
  {
    src: "/images/projects/linen.jpg",
    width: 1200,
    height: 1500,
    alt: "Linen still life",
    title: "Lino",
    service: "Fotografía",
  },
  {
    src: "/images/projects/travel-stories.jpg",
    width: 1000,
    height: 1300,
    alt: "Colección de fotografías instantáneas",
    title: "Archivo Solar",
    service: "Concepto · Fotografía",
  },
  {
    src: "/images/projects/typography-study.jpg",
    width: 1000,
    height: 1200,
    alt: "Composición editorial con tipografía roja",
    title: "Tipo Vivo",
    service: "Editorial · Tipografía",
  },
  {
    src: "/images/projects/silk-study.jpg",
    width: 1100,
    height: 1100,
    alt: "Estudio fotográfico de tela de seda",
    title: "Seda",
    service: "Dirección de imagen · Demo",
  },
] as const;

export const testimonials = [
  {
    title: "Sensibilidad",
    quote:
      "Rona entiende lo que aún no sabemos decir. Su trabajo le dio voz a la marca de una forma que no esperábamos.",
    name: "Lucía M.",
    role: "Fundadora, Atelier Sur",
  },
  {
    title: "Intención",
    quote:
      "Trabajar con ella es entrar en un proceso pensado. Cada imagen y cada decisión tiene intención.",
    name: "Camila P.",
    role: "Founder, Casa Lino",
  },
  {
    title: "Honestidad",
    quote:
      "Logró capturar una sensibilidad que no habíamos visto en otros portafolios. El resultado fue una identidad honesta.",
    name: "Mariana V.",
    role: "Directora Creativa",
  },
  {
    title: "Mirada",
    quote:
      "La fotografía de Rona convierte un producto en una historia. Su mirada cambia la forma de ver una marca.",
    name: "Andrés V.",
    role: "Brand Manager",
  },
  {
    title: "Calma",
    quote:
      "Hay una calma muy particular en cómo trabaja. Cada entrega se siente cuidada hasta el último detalle.",
    name: "Sofía L.",
    role: "Directora, Estudio Norte",
  },
  {
    title: "Claridad",
    quote:
      "Convirtió una idea difusa en una identidad clara. Pocas personas logran ese tipo de claridad visual.",
    name: "Tomás R.",
    role: "Founder, Marca Lenta",
  },
] as const;
