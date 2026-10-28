export const navigation = [
  { href: "#about", label: "Sobre mí", number: "01" },
  { href: "#proyectos", label: "Portafolio", number: "02" },
  { href: "#contacto", label: "Contacto", number: "03" },
] as const;

export type DisciplineId =
  | "estrategia"
  | "direccion-creativa"
  | "fotografia"
  | "branding"
  | "diagnostico-visual";

type Discipline = {
  id: DisciplineId;
  number: string;
  word: string;
  title: string;
  copy: string;
  /** Página propia con proyectos y casos; sin ella el bloque no enlaza. */
  href?: string;
};

export const disciplines: readonly Discipline[] = [
  {
    id: "estrategia",
    number: "01",
    word: "Pensar",
    title: "Estrategia",
    copy: "Definir el propósito, el mensaje y la dirección de una marca para construir una identidad coherente y con intención.",
  },
  {
    id: "direccion-creativa",
    number: "02",
    word: "Conceptualizar",
    title: "Dirección creativa",
    copy: "Transformar ideas en conceptos visuales que conecten estética, narrativa y personalidad.",
  },
  {
    id: "fotografia",
    number: "03",
    word: "Capturar",
    title: "Fotografía",
    copy: "Crear imágenes que transmitan emociones, construyan historias y expresen la esencia de cada proyecto.",
  },
  {
    id: "branding",
    number: "04",
    word: "Construir",
    title: "Branding",
    copy: "Desarrollar identidades visuales con personalidad, coherencia y capacidad de perdurar.",
  },
  {
    id: "diagnostico-visual",
    number: "05",
    word: "Analizar",
    title: "Diagnóstico visual",
    copy: "Evaluar cómo comunica una marca, detectar oportunidades de mejora y definir hacia dónde evolucionar.",
  },
];

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

type Project = {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  service: string;
  /** Disciplinas en las que aparece el proyecto al filtrar la galería. */
  disciplines: readonly DisciplineId[];
};

// PROVISORIO: las disciplinas de cada proyecto se asignaron a partir de su
// etiqueta de servicio y deben revisarse con los proyectos reales.
export const projects: readonly Project[] = [
  {
    src: "/images/projects/criterion.jpg",
    width: 1200,
    height: 1500,
    alt: "Estudio de identidad — Cíterion",
    title: "Cíterion",
    service: "Identidad · Papelería",
    disciplines: ["branding"],
  },
  {
    src: "/images/projects/florario.jpg",
    width: 1200,
    height: 1500,
    alt: "Still life floral",
    title: "Florario",
    service: "Dirección de imagen",
    disciplines: ["direccion-creativa", "fotografia"],
  },
  {
    src: "/images/projects/editorial.jpg",
    width: 1500,
    height: 1100,
    alt: "Editorial spread",
    title: "Editorial",
    service: "Diseño · Maquetación",
    disciplines: ["direccion-creativa"],
  },
  {
    src: "/images/projects/linen.jpg",
    width: 1200,
    height: 1500,
    alt: "Linen still life",
    title: "Lino",
    service: "Fotografía",
    disciplines: ["fotografia"],
  },
  {
    src: "/images/projects/travel-stories.jpg",
    width: 1000,
    height: 1300,
    alt: "Colección de fotografías instantáneas",
    title: "Archivo Solar",
    service: "Concepto · Fotografía",
    disciplines: ["direccion-creativa", "fotografia"],
  },
  {
    src: "/images/projects/typography-study.jpg",
    width: 1000,
    height: 1200,
    alt: "Composición editorial con tipografía roja",
    title: "Tipo Vivo",
    service: "Editorial · Tipografía",
    disciplines: ["branding"],
  },
  {
    src: "/images/projects/silk-study.jpg",
    width: 1100,
    height: 1100,
    alt: "Estudio fotográfico de tela de seda",
    title: "Seda",
    service: "Dirección de imagen · Demo",
    disciplines: ["direccion-creativa", "fotografia"],
  },
];

type CaseImage = { src: string; alt: string };

type CaseStudy = {
  title: string;
  /** Proporción de las imágenes: 16:9 por defecto, o 5:4 para fotografía. */
  aspect?: "wide" | "classic";
  service: string;
  /** Disciplinas en las que se enmarca el proyecto. */
  disciplines: readonly DisciplineId[];
  /** Portada en 16:9 si la primera imagen no lo es; por defecto, la primera. */
  cover?: string;
  /** Cuatro imágenes; la primera hace de portada. */
  images: readonly [CaseImage, CaseImage, CaseImage, CaseImage];
};

// Imágenes en public/images/work/ (1600×900, o 1600×1280 con aspect "classic") y ya comprimidas.
export const caseStudies: readonly CaseStudy[] = [
  {
    title: "EWZ Belleza",
    service: "Identidad de marca · Brand guidelines",
    disciplines: ["branding"],
    images: [
      {
        src: "/images/work/ewz-belleza-1.jpg",
        alt: "Logotipo de EWZ Belleza en blanco sobre una tela verde oliva",
      },
      {
        src: "/images/work/ewz-belleza-2.jpg",
        alt: "Página de las guías de marca de EWZ Belleza con el retrato de una mujer sobre fondo durazno",
      },
      {
        src: "/images/work/ewz-belleza-3.jpg",
        alt: "Letrero con el logotipo EWZ junto a tarjetas de la marca en verde y bordó",
      },
      {
        src: "/images/work/ewz-belleza-4.jpg",
        alt: "Patrón repetido del monograma EWZ en verde oliva",
      },
    ],
  },
  {
    title: "Vestria",
    service: "Identidad de marca · Estudio digital",
    disciplines: ["branding"],
    images: [
      {
        src: "/images/work/vestria-1.jpg",
        alt: "Logotipo de Vestria, Brand & Digital Studio, en gris claro sobre una textura negra",
      },
      {
        src: "/images/work/vestria-2.jpg",
        alt: "Página de presentación de Vestria con el nombre de la marca en grande, en tono sobre tono, sobre fondo gris verdoso",
      },
      {
        src: "/images/work/vestria-3.jpg",
        alt: "Pieza de Vestria con el logotipo en vertical sobre fondo azul claro y un texto de posicionamiento",
      },
      {
        src: "/images/work/vestria-4.jpg",
        alt: "Tarjeta blanca con el logotipo y el lema de Vestria sobre una fotografía desenfocada de una cafetería",
      },
    ],
  },
  {
    title: "Macundal",
    service: "Identidad de marca · Brand guidelines",
    disciplines: ["branding"],
    images: [
      {
        src: "/images/work/macundal-2.jpg",
        alt: "Logotipo de Macundal en relieve sobre cuero bordó",
      },
      {
        src: "/images/work/macundal-1.jpg",
        alt: "Logotipo manuscrito de Macundal en blanco sobre fondo verde bosque",
      },

      {
        src: "/images/work/macundal-3.jpg",
        alt: "Tarjetas y etiqueta con el logotipo de Macundal sobre fondo naranja",
      },
      {
        src: "/images/work/macundal-4.jpg",
        alt: "Libreta de cuero con sello de lacre junto a una pieza gráfica rosa de Macundal",
      },
    ],
  },
  {
    title: "Teacher Mandy",
    service: "Identidad de marca · Redes sociales",
    disciplines: ["branding"],
    images: [
      {
        src: "/images/work/teacher-mandy-1.jpg",
        alt: "Logotipo de teacher MANDY en amarillo limón sobre fondo bordó, con estrellas rosa y naranja",
      },
      {
        src: "/images/work/teacher-mandy-2.jpg",
        alt: "Logotipo de teacher MANDY en naranja sobre fondo amarillo limón, junto al sello circular tM sobre fondo rosa",
      },
      {
        src: "/images/work/teacher-mandy-3.jpg",
        alt: "Piezas para redes de teacher MANDY: un cuaderno con espiral sobre preparación de exámenes y una pieza rosa con el texto Summer is over",
      },
      {
        src: "/images/work/teacher-mandy-4.jpg",
        alt: "Piezas de teacher MANDY: afiche naranja de inscripciones abiertas con una profesora sonriente y una pieza blanca sobre un sobre rosa con el texto Your english. Your goal. Your certification.",
      },
    ],
  },
  {
    title: "Elite Dental",
    service: "Identidad de marca · Sitio web",
    disciplines: ["branding"],
    images: [
      {
        src: "/images/work/elite-dental-1.jpg",
        alt: "Logotipo de Elite Dental junto a una odontóloga con chaleco blanco apoyada en un sillón dental",
      },
      {
        src: "/images/work/elite-dental-2.jpg",
        alt: "Logotipo de Elite Dental en gris oscuro y beige sobre fondo crema",
      },
      {
        src: "/images/work/elite-dental-3.jpg",
        alt: "Publicaciones para redes de Elite Dental: el Día internacional del odontólogo y un diseño de sonrisa con fotos de antes y después",
      },
      {
        src: "/images/work/elite-dental-4.jpg",
        alt: "Sitio web de Elite Dental en una laptop, con el titular Salud y estética en perfecta armonía",
      },
    ],
  },
  {
    title: "Books",
    aspect: "classic",
    cover: "/images/work/books-cover.jpg",
    service: "Fotografía · Retrato",
    disciplines: ["fotografia"],
    images: [
      {
        src: "/images/work/books-1.jpg",
        alt: "Retrato de un hombre de cabello oscuro y barba, con aros en la oreja, y la palabra BOOKS sobre la imagen",
      },
      {
        src: "/images/work/books-2.jpg",
        alt: "Dos retratos de una mujer de cabello rizado con body negro transparente y botas, sentada y en cuclillas",
      },
      {
        src: "/images/work/books-3.jpg",
        alt: "Dos retratos en blanco y negro de un hombre: uno con los ojos cerrados y la mano en el rostro, otro haciendo una mueca con las manos",
      },
      {
        src: "/images/work/books-4.jpg",
        alt: "Dos fotografías de una joven con mono beige, escribiendo en un escritorio y sentada en el suelo junto a un sillón verde, con un skate y papeles de colores",
      },
    ],
  },
];

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
