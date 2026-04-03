const form = document.getElementById('quoteForm');
const minutiInput = document.getElementById('minuti');
const strumentiInput = document.getElementById('strumenti');
const copyrightInput = document.getElementById('copyright');
const totaleOutput = document.getElementById('totale');

const A = 0.5; /* moltiplicatore minuti */
const B = 30; /* minimo strumenti */
const C = 60; /* prezzo copyright */
const MINIMO = 60;
const MARGINE = 0.3; // 30%

function calcolaPreventivo() {
  const minuti = parseFloat(minutiInput.value) || 0;
  const strumenti = parseFloat(strumentiInput.value) || 0;
  const copyright = copyrightInput.checked ? C : 0;

  // Calcolo preventivo base
  const base = Math.max(MINIMO, minuti * A * (B + Math.pow(strumenti, 0.7)) + copyright);

  // Calcolo fascia ±30%
  const minRange = Math.round(base * (1 - MARGINE));
  const maxRange = Math.round(base * (1 + MARGINE));

  totaleOutput.textContent = ` ${minRange} – €${maxRange}`;
}

// Aggiorna in tempo reale
form.addEventListener('input', calcolaPreventivo);
window.addEventListener('load', calcolaPreventivo);