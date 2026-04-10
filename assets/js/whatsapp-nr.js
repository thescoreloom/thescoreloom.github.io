// Numero WhatsApp globale
const WHATSAPP_NUMBER = "393475602560";

const YOUTUBE_URL = "https://www.youtube.com/@TheScoreLoom";
const INSTAGRAM_URL = "https://www.instagram.com/thescoreloom/";

// Imposta automaticamente l'href dell'icona WhatsApp
document.addEventListener("DOMContentLoaded", () => {
  const link = document.getElementById("whatsapp-link");
  if(link) {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  }

  let container = document.getElementById("social-float-container");
  if(!container) {
    container = document.createElement("div");
    container.id = "social-float-container";

    const youtube = document.createElement("a");
    youtube.id = "youtube-link";
    youtube.className = "social-float social-float-youtube";
    youtube.href = YOUTUBE_URL;
    youtube.target = "_blank";
    youtube.rel = "noopener noreferrer";
    youtube.setAttribute("aria-label", "YouTube TheScoreLoom");
    const ytImg = document.createElement("img");
    ytImg.src = "../assets/images/YouTube.png";
    ytImg.alt = "YouTube";
    youtube.appendChild(ytImg);

    const instagram = document.createElement("a");
    instagram.id = "instagram-link";
    instagram.className = "social-float social-float-instagram";
    instagram.href = INSTAGRAM_URL;
    instagram.target = "_blank";
    instagram.rel = "noopener noreferrer";
    instagram.setAttribute("aria-label", "Instagram TheScoreLoom");
    const igImg = document.createElement("img");
    igImg.src = "../assets/images/Instagram.png";
    igImg.alt = "Instagram";
    instagram.appendChild(igImg);

    container.appendChild(youtube);
    container.appendChild(instagram);
    document.body.appendChild(container);
  } else {
    const youtube = document.getElementById("youtube-link");
    const instagram = document.getElementById("instagram-link");
    if(youtube) {
      youtube.href = YOUTUBE_URL;
    }
    if(instagram) {
      instagram.href = INSTAGRAM_URL;
    }
  }

  // Hide floating icons when footer is visible to avoid duplicated contacts.
  const footer = document.querySelector("footer");
  const floatTargets = [link, container].filter(Boolean);
  if(footer && floatTargets.length) {
    const observer = new IntersectionObserver((entries) => {
      const footerVisible = entries.some((entry) => entry.isIntersecting);
      floatTargets.forEach((el) => {
        el.classList.toggle("is-hidden", footerVisible);
      });
    }, { threshold: 0.05 });

    observer.observe(footer);
  }
});