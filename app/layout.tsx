import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Solo el subconjunto latino (cubre el español). Antes se cargaba el CSS completo
// de cada familia, con @font-face de cirílico, griego y vietnamita.
const inter = localFont({
  src: [
    {
      path: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal"
    },
    {
      path: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-italic.woff2",
      weight: "100 900",
      style: "italic"
    }
  ],
  variable: "--font-inter",
  display: "swap",
  preload: false,
  adjustFontFallback: "Arial"
});

const montserrat = localFont({
  src: [
    {
      path: "../node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal"
    }
  ],
  variable: "--font-montserrat",
  display: "swap",
  preload: false,
  adjustFontFallback: "Arial"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ronarangel.com"),
  title: "Rona Rangel — Diseño, Fotografía y Dirección Creativa",
  description:
    "Portafolio editorial de Rona Rangel. Construyo marcas desde la sensibilidad, la estética y la intención.",
  openGraph: {
    title: "Rona Rangel — Portafolio Editorial",
    description: "Diseño, fotografía y dirección creativa con propósito.",
    images: ["/images/hero-desktop.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
