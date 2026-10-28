"use client";

import dynamic from "next/dynamic";

// El popup solo aparece tras 35 s o a mitad de la página, así que su código se
// carga aparte, sin bloquear el arranque.
const NewsletterPopup = dynamic(
  () => import("@/components/NewsletterPopup").then((m) => m.NewsletterPopup),
  { ssr: false }
);

export function LazyNewsletterPopup() {
  return <NewsletterPopup />;
}
