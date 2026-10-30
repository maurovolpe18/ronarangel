# Rona Rangel — portafolio editorial

Sitio de una sola página construido con Next.js, React, TypeScript y Tailwind
CSS. Se exporta como sitio estático (`output: "export"`) y se publica en
Cloudflare. Las imágenes de `public/images` se sirven tal cual, sin
optimización en tiempo de ejecución, así que deben subirse ya comprimidas
(JPG para fotos opacas, WebP si necesitan transparencia).

## Desarrollo

Requisitos: Node.js 20 o posterior y npm.

```bash
npm install
npm run dev
```

El sitio queda disponible en `http://localhost:3000`.

## Verificación

```bash
npm run typecheck
npm run lint
npm run build
```

También se pueden ejecutar las tres verificaciones con `npm run check`.

## Despliegue en Cloudflare

`npm run build` genera el sitio completo en `out/`. `wrangler.jsonc` lo publica
como assets estáticos de un Worker y usa `404.html` para las rutas inexistentes.

- **Workers (Workers Builds):** comando de build `npm run build`, comando de
  deploy `npx wrangler deploy`.
- **Pages:** preset "None", comando de build `npm run build`, directorio de
  salida `out`.

La versión de Node se fija en `.node-version` (Next.js 16 requiere Node 20.9 o
posterior).

## Estructura

```text
app/                  Ruta, layout y estilos globales
components/           Componentes interactivos compartidos
components/sections/  Secciones de la página principal
components/legacy/    Versiones anteriores conservadas temporalmente
data/                 Contenido estructurado del sitio
public/images/        Imágenes utilizadas en producción
assets/reference/     Imágenes fuente conservadas, no publicadas
```

Los tokens visuales y las clases editoriales están definidos en
`app/globals.css`. Tailwind genera las utilidades desde los componentes mediante
PostCSS; no se versionan hojas compiladas.

## Contenido

Las disciplinas, los proyectos, testimonios, navegación y pasos del proceso se
editan en `data/content.ts`. Los textos propios de cada sección viven en su
componente correspondiente.

## Rendimiento

- **Caché:** `public/_headers` define las cabeceras que aplica Cloudflare. Los
  archivos de `/_next/static/` llevan hash y se guardan un año; las imágenes de
  `/images/` se guardan un día (no llevan hash: al reemplazar una foto puede
  tardar hasta un día en verse en quien ya la tenía).
- **Fuentes:** `app/layout.tsx` carga solo el subconjunto latino de Inter y
  Montserrat con `next/font/local` (sin precarga, que en conexiones lentas retrasaba el primer pintado, y con métricas de reserva para evitar
  saltos). Los caracteres fuera del latino se dibujan con la fuente del sistema.
- **Imágenes:** el sitio se exporta sin optimizador, así que cada archivo se
  sirve tal cual: subirlas ya redimensionadas al tamaño máximo con el que se
  muestran (1000 px de ancho las de proyectos y el retrato, 900 px el hero
  mobile) y comprimidas. El hero usa un único `<picture>` para que cada
  dispositivo descargue solo su versión.
- **Carga diferida:** el popup de newsletter se carga aparte, y los carruseles
  con avance automático solo se mueven mientras están a la vista.

## Servicios y trabajos

- **Servicios** (`#proyectos`, `components/sections/PortfolioSection.tsx`):
  las cinco disciplinas en un acordeón de texto con el diseño de la antigua
  sección «Mi enfoque» (`components/DisciplineAccordion.tsx`). Con mouse se abre
  al pasar por encima y con touch o teclado al tocarlo. Datos en `disciplines`
  de `data/content.ts`.
- **Trabajos** (`#trabajos`, `components/sections/WorkSection.tsx`): carrusel
  de portadas, una por proyecto (`components/WorkGallery.tsx`). Avanza solo
  cada 4 segundos y vuelve al inicio al llegar al final; se detiene con el
  mouse encima, al tocarlo, con un proyecto abierto o con el botón de pausa, y
  no se mueve si el sistema pide reducir el movimiento. Al hacer clic en una
  portada se abre un diálogo con una grilla de cuatro fotos. Datos en
  `caseStudies`.

- **Agregar un proyecto:** sumar una entrada a `caseStudies` con sus cuatro
  imágenes en 16:9 (1000×563, JPG comprimido) en `public/images/work/`. La
  primera es la portada. Si las fotos no son 16:9 (como en Books), indicar
  `aspect: "classic"` (5:4) para el diálogo y `cover` con una portada propia en
  16:9. Conviene comprimirlas antes: los originales en 4K
  pesan decenas de MB.
- **Página propia de una disciplina:** agregar `href` a la disciplina (por
  ejemplo `"/portafolio/estrategia"`) cuando exista esa página; el acordeón
  mostrará entonces «Ver proyectos» hacia esa página. Mientras no lo tenga,
  muestra «Ver trabajos» (que baja al portafolio) solo en las disciplinas de
  algún proyecto de `caseStudies`.

`projects` conserva los trabajos de muestra anteriores (ya no se muestran) y
solo lo usan las versiones de `components/legacy/`.

Versiones anteriores conservadas en `components/legacy/`, sin renderizarse:

- `PortfolioSectionGallery.tsx` y `ProjectGallery.tsx`: galería con cuatro
  proyectos destacados y el resto desplegable (datos en `projects`).
- `PortfolioSectionLegacy.tsx`: todos los proyectos en formato grande.
- `FocusSection.tsx` y `FocusAccordion.tsx`: la sección «Mi enfoque» original
  (datos en `services`), reemplazada por el acordeón de disciplinas.

Para restaurar una, basta con importarla en `app/page.tsx` en lugar de (o junto
a) `PortfolioSection`, por ejemplo:

```ts
import {
  PortfolioSectionGallery as PortfolioSection
} from "@/components/legacy/PortfolioSectionGallery";
```

## Newsletter

Hay una sección de newsletter (`components/sections/NewsletterSection.tsx`) y un
popup (`components/NewsletterPopup.tsx`). Ambos envían el email a
`POST /api/subscribe`, que atiende el Worker de `worker/index.ts` y lo guarda
como contacto de un segmento de Resend. La API key es un secreto del Worker y
nunca llega al navegador.

Configuración (una vez):

1. En Resend, crear un segmento (Segments) y copiar su ID, y crear una API key
   con permiso *Full access* (API Keys).
2. Producción: `npx wrangler secret put RESEND_API_KEY` y
   `npx wrangler secret put RESEND_SEGMENT_ID`, y luego volver a desplegar.
3. Local: copiar `.dev.vars.example` a `.dev.vars`, completar los valores,
   ejecutar `npm run build` y `npx wrangler dev`. `npm run dev` solo sirve el
   sitio: sin el Worker, `/api/subscribe` no existe.

Las cartas se envían desde el panel de Resend (Broadcasts) a ese segmento.

El popup aparece tras 35 segundos o cuando el scroll se detiene pasada la mitad
de la página, salvo que la sección de newsletter ya esté a la vista; si está
abierto y se llega a esa sección, se oculta. Lo que recuerda se guarda en el
`localStorage` del navegador (`lib/newsletter.ts`):

- Al suscribirse (en el popup o en la sección), no vuelve a aparecer.
- Al cerrarlo con la X, no vuelve a aparecer durante una semana.
- Al cerrarlo tocando afuera o con Esc, vuelve en la próxima visita.

Vale por navegador y dispositivo: si se borran los datos del sitio, vuelve a
aparecer.

Para revisarlo sin esperar, abrir la página con `?newsletter` (por ejemplo
`http://localhost:3000/?newsletter`): se muestra de inmediato, ignorando lo
guardado.

## Formulario

Como el sitio es estático, el formulario no envía nada por sí mismo: al
enviarlo arma un correo con los datos y lo abre en la aplicación de correo del
visitante, dirigido a la dirección de `CONTACT_EMAIL` en `app/ContactForm.tsx`.
Para recibir consultas sin depender de eso, habrá que conectarlo a un servicio
de formularios o a un endpoint propio.
