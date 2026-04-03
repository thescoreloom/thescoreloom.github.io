// -------------------------------
// SIDEBAR DINAMICA: INTEGRAZIONE AUDIO/VIDEO
// -------------------------------
async function loadSidebar() {
  try {
    // Carica il JSON dalla cartella assets/sidebar/
    const response = await fetch('assets/sidebar/sidebar.json'); 
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = ''; 

    // Controlla se l'utente ha accettato i cookie YouTube
    const accepted = localStorage.getItem('youtubeCookiesAccepted') === 'true';

    data.forEach(item => {
      const chapter = document.createElement('div');
      chapter.className = 'chapter';

      // Logica multimediale: prioritizza YouTube, altrimenti mostra Audio
      let mediaHtml = '';
      
      if (item.youtube && item.youtube.trim() !== "") {
        // Caso VIDEO
        mediaHtml = accepted
          ? `<iframe src="${item.youtube}" class="youtube-preview" allowfullscreen></iframe>`
          : `<div class="youtube-cookie-banner">
               <p>To view YouTube previews, please accept cookies.</p>
               <button class="btn-accept-cookies">Accept</button>
             </div>`;
      } else if (item.audio && item.audio.trim() !== "") {
        // Caso AUDIO (Mini Player)
        mediaHtml = `
          <audio controls class="mini-audio-player" style="width: 100%; height: 32px;">
            <source src="${item.audio}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>`;
      }

      // Utilizzo ESATTO delle tue classi originali
      chapter.innerHTML = `
        <div class="vertical-column">
          <h3>${item.title}</h3>

          <div class="chapter">
            <div class="chapter-image">
              <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="chapter-text">
              ${mediaHtml}
            </div>
          </div>
        </div>
      `;

      sidebar.appendChild(chapter);
    });

    // Listener per i pulsanti "Accept" (rimane invariato)
    sidebar.querySelectorAll('.btn-accept-cookies').forEach(btn => {
      btn.addEventListener('click', () => {
        localStorage.setItem('youtubeCookiesAccepted', 'true');
        loadSidebar(); 
      });
    });

  } catch (error) {
    console.error('Errore caricamento sidebar:', error);
  }
}

// Avvia al caricamento della pagina
document.addEventListener('DOMContentLoaded', loadSidebar);