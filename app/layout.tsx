import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/montserrat";
import "./globals.css";

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
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
