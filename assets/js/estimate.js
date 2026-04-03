const form = document.getElementById('quoteForm');
const minutiInput = document.getElementById('minuti');
const strumentiInput = document.getElementById('strumenti');
const copyrightInput = document.getElementById('copyright');
const totaleOutput = document.getElementById('totale');

// --- PARAMETRI CALIBRATI SUI TUOI TARGET ---
const BASE_FISSA = 15;      
const MOLT_MINUTI = 18;     
const PESO_STRUMENTI = 0.75; // Fondamentale: strumenti * minuti * 0.75
const COSTO_COPYRIGHT = 60; 
const MINIMO_ASSOLUTO = 40; 
const MARGINE = 0.35;       // Forbice 35%

function calcolaPreventivo() {
  const minuti = parseFloat(minutiInput.value) || 0;
  const strumenti = parseFloat(strumentiInput.value) || 0;
  const copyright = copyrightInput.checked ? COSTO_COPYRIGHT : 0;

  // --- NUOVA FORMULA DINAMICA (Sostituisce la tua vecchia Math.pow) ---
  // Ogni strumento pesa in base a quanto dura il brano, senza esplodere
  let base = BASE_FISSA + (minuti * MOLT_MINUTI) + (strumenti * minuti * PESO_STRUMENTI) + copyright;

  // Controllo minimo dignità
  if (base < MINIMO_ASSOLUTO) base = MINIMO_ASSOLUTO;

  // Calcolo fascia ±35%
  const minRange = Math.round(base * (1 - MARGINE));
  const maxRange = Math.round(base * (1 + MARGINE));

  // Visualizzazione
  totaleOutput.textContent = `€${minRange} – €${maxRange}`;
}

// Eventi (manteniamo i tuoi originali)
form.addEventListener('input', calcolaPreventivo);
window.addEventListener('load', calcolaPreventivo);
