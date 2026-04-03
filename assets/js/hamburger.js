document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const nav = header.querySelector('nav');
  const dotTrigger = document.getElementById('dot-menu-trigger');

  if (!header || !dotTrigger) return;

  const updateDotVisibility = () => {
    // Controlliamo se la nav è visibile nel layout (senza classe active)
    // Su PC/Tablet di solito la nav ha display: flex o block di default
    const isNavVisibleByLayout = window.getComputedStyle(nav).display !== 'none' && !nav.classList.contains('active');
    const isNavOpen = nav.classList.contains('active');
    const isScrollDown = window.scrollY > 150;

    // LOGICA FINALE:
    // Il puntino sparisce SE:
    // 1. La nav è aperta (isNavOpen)
    // 2. Siamo in cima E la nav è già visibile per il layout PC (isNavVisibleByLayout)
    if (isNavOpen || (!isScrollDown && isNavVisibleByLayout)) {
      dotTrigger.classList.remove('active');
    } else {
      dotTrigger.classList.add('active');
    }
  };

  // Esegui subito e al ridimensionamento (per passare da PC a Mobile)
  updateDotVisibility();
  window.addEventListener('resize', updateDotVisibility);

  // 1. GESTIONE SCROLL
  window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
      if (!nav.classList.contains('active')) {
        header.classList.add('nav-hidden');
        header.classList.remove('nav-visible');
      }
    } else {
      header.classList.remove('nav-hidden');
      header.classList.remove('nav-visible');
    }
    updateDotVisibility();
  });

  // 2. CLICK SUL DOT
  dotTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.add('active');
    
    if (window.scrollY > 150) {
      header.classList.add('nav-visible');
      header.classList.remove('nav-hidden');
    }
    updateDotVisibility();
  });

  // 3. CHIUSURA
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && !dotTrigger.contains(e.target)) {
      nav.classList.remove('active');
      if (window.scrollY > 150) {
        header.classList.remove('nav-visible');
        header.classList.add('nav-hidden');
      }
      updateDotVisibility();
    }
  });
});