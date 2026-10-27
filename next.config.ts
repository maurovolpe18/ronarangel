import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática para Cloudflare: `next build` genera el sitio en out/.
  output: "export",
  // Sin servidor no hay optimizador de imágenes; se sirven los archivos de
  // public/images tal cual, por eso ya están comprimidos.
  images: { unoptimized: true }
};

export default nextConfig;
