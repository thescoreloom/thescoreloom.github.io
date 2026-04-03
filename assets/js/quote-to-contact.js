// JS per pulsante "Ask for →" su estimate.html
const btnContact = document.getElementById('requestScoreBtn');

btnContact.addEventListener('click', (e) => {
  e.preventDefault();

  // valori dal form
  const minuti = document.getElementById('minuti')?.value || 3;
  const strumenti = document.getElementById('strumenti')?.value || 1;
  const copyright = document.getElementById('copyright')?.checked;

  // testo messaggio
  const message = `I would like to arrange a ${copyright ? 'copyrighted' : 'non-copyrighted'} piece for ${strumenti} instruments, lasting ${minuti} minutes.`;

  // subject predefinito
  const subject = 'Quote request for tailored score';

  // costruisci URL contact.html con query string
  const url = `contact.html?category=tailored&message=${encodeURIComponent(message)}&subject=${encodeURIComponent(subject)}`;

  // reindirizza
  window.location.href = url;
});