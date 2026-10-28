// Estado de la newsletter guardado en el navegador del visitante. Vale por
// navegador y dispositivo: si se borran los datos del sitio, se empieza de cero.

const SUBSCRIBED_KEY = "rr-newsletter-subscribed";
const DISMISSED_AT_KEY = "rr-newsletter-popup-dismissed-at";

/** Tiempo que el popup permanece oculto después de cerrarlo con la X. */
const POPUP_HIDDEN_FOR_MS = 7 * 24 * 60 * 60 * 1000;

// Mientras no haya un servicio conectado, ningún formulario guarda el email.
export const NEWSLETTER_PENDING_MESSAGE =
  "Gracias por tu interés. La newsletter todavía no está activa: muy pronto podrás suscribirte.";

// localStorage puede no estar disponible (modo privado, almacenamiento
// bloqueado); en ese caso se actúa como si no hubiera nada guardado.
function read(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Sin almacenamiento el popup volverá a aparecer en la próxima visita.
  }
}

export function markNewsletterSubscribed() {
  write(SUBSCRIBED_KEY, "1");
}

export function markNewsletterPopupDismissed() {
  write(DISMISSED_AT_KEY, String(Date.now()));
}

export function shouldShowNewsletterPopup() {
  if (read(SUBSCRIBED_KEY)) return false;
  const dismissedAt = Number(read(DISMISSED_AT_KEY));
  return !dismissedAt || Date.now() - dismissedAt >= POPUP_HIDDEN_FOR_MS;
}
