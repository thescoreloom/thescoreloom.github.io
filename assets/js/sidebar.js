async function loadSidebar() {
  try {
    const response = await fetch('assets/sidebar/sidebar.json'); 
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = ''; 

    const accepted = localStorage.getItem('youtubeCookiesAccepted') === 'true';

    data.forEach(item => {
      const chapter = document.createElement('div');
      chapter.className = 'chapter';

      // 1. Logica multimediale
      let mediaHtml = '';
      if (item.youtube && item.youtube.trim() !== "") {
        mediaHtml = accepted
          ? `<iframe src="${item.youtube}" class="youtube-preview" allowfullscreen></iframe>`
          : `<div class="youtube-cookie-banner">
               <p>To view YouTube previews, please accept cookies.</p>
               <button class="btn-accept-cookies">Accept</button>
             </div>`;
      } else if (item.audio && item.audio.trim() !== "") {
        mediaHtml = `
          <audio controls class="mini-audio-player" style="width: 100%;">
            <source src="${item.audio}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>`;
      }

      // 2. Logica Link Partitura (SPOSTATA SOTTO IL PLAYER)
      let scoreLinkHtml = '';
      if (item.scoreLink && item.scoreLink.trim() !== "") {
        scoreLinkHtml = `
          <a href="${item.scoreLink}" target="_blank" class="view-score-btn" title="Buy / View Full Score">
            <span>🛒 View Score</span>
          </a>`;
      }

      // 3. Render: Immagine pulita a sx, Player + Link a dx
      chapter.innerHTML = `
        <div class="vertical-column">
          <h3>${item.title}</h3>

          <div class="chapter">
            <div class="chapter-image">
              <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="chapter-text">
              ${mediaHtml}
              ${scoreLinkHtml}
            </div>
          </div>
        </div>
      `;

      sidebar.appendChild(chapter);
    });

    // --- LOGICA ANTI-SOVRAPPOSIZIONE ---
    sidebar.addEventListener('play', (e) => {
      const allAudios = sidebar.querySelectorAll('audio');
      allAudios.forEach(audio => {
        if (audio !== e.target) {
          audio.pause();
        }
      });
    }, true); 

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

document.addEventListener('DOMContentLoaded', loadSidebar);