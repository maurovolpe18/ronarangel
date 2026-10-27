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

Los proyectos, testimonios, servicios, navegación y pasos del proceso se editan
en `data/content.ts`. Los textos propios de cada sección viven en su componente
correspondiente.

La portada muestra cuatro proyectos destacados y permite desplegar el resto en
una cuadrícula compacta. La versión anterior, que mostraba todos los proyectos
en formato grande, se conserva temporalmente en
`components/legacy/PortfolioSectionLegacy.tsx`. Para restaurarla basta con
reemplazar el import de `PortfolioSection` en `app/page.tsx` por:

```ts
import {
  PortfolioSectionLegacy as PortfolioSection
} from "@/components/legacy/PortfolioSectionLegacy";
```

## Formulario

El comportamiento existente del formulario se mantiene deliberadamente sin
cambios. Antes de publicar una versión que reciba consultas reales, deberá
conectarse a un servicio o endpoint de correo.
