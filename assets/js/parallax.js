(async () => {
  try {
    const response = await fetch('assets/data/background-settings.json');
    const data = await response.json();

    const page = document.body.dataset.page;
    const bgDiv = document.querySelector('.background-parallax');
    if (!bgDiv) return;

    const settings = data[page] || { scale: 5, speed: 5 };
    console.log('Parallax settings:', settings);

    const updateBackgroundSize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // scala proporzionale all'area dello schermo
      const scaleFactor = Math.sqrt(vw * vh) / 100; // puoi calibrare il divisore
      const bgSize = settings.scale * scaleFactor;

      // clamp per evitare dimensioni troppo piccole o troppo grandi
      bgDiv.style.backgroundSize = `${Math.min(Math.max(bgSize, 200), 800)}px auto`;
    };

    // imposta dimensione iniziale
    updateBackgroundSize();

    window.addEventListener('resize', updateBackgroundSize);

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const pos = scrollY * (settings.speed / 100);
      bgDiv.style.backgroundPosition = `0 ${pos}px`;
    });
  } catch (e) {
    console.error('Errore caricamento JSON parallax:', e);
  }
})();