document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const nav = header.querySelector('nav');

  // crea hamburger/pallino dinamicamente
  const hamburger = document.createElement('div');
  hamburger.className = 'hamburger';
  hamburger.innerHTML = '<span class="active-dot"></span>'; // pallino arancione
  header.appendChild(hamburger);

  // toggle menu al click sul pallino
  hamburger.addEventListener('click', (e) => {
    nav.classList.toggle('active');
    e.stopPropagation(); // evita che il click chiuda subito il menu
  });

  // chiudi menu cliccando fuori
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active')) {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('active');
      }
    }
  });
});