// Numero WhatsApp globale
const WHATSAPP_NUMBER = "393475602560";

// Imposta automaticamente l'href dell'icona WhatsApp
document.addEventListener("DOMContentLoaded", () => {
  const link = document.getElementById("whatsapp-link");
  if(link) {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  }
});