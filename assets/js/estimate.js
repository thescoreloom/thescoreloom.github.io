const form = document.getElementById('quoteForm');
const minutiInput = document.getElementById('minuti');
const strumentiInput = document.getElementById('strumenti');
const copyrightInput = document.getElementById('copyright');
const totaleOutput = document.getElementById('totale');

// --- PARAMETRI RICALIBRATI (Copyright 60€) ---
const BASE_FISSA = 20;      // Leggermente abbassata per compensare il copyright più alto
const MOLT_MINUTI = 23;     
const PESO_STRUMENTI = 18.5; 
const COSTO_COPYRIGHT = 65; // AGGIORNATO A 60€
const MINIMO_ASSOLUTO = 50; 
const MARGINE = 0.35;       // Forbice 35%

function calcolaPreventivo() {
  const minuti = parseFloat(minutiInput.value) || 0;
  const strumenti = parseFloat(strumentiInput.value) || 0;
  const copyright = copyrightInput.checked ? COSTO_COPYRIGHT : 0;

  // Formula base
  let base = BASE_FISSA + (minuti * MOLT_MINUTI);
  base += (Math.pow(strumenti, 0.6) * PESO_STRUMENTI * (minuti * 0.75));
  base += copyright;

  // Controllo minimo dignità
  if (base < MINIMO_ASSOLUTO) base = MINIMO_ASSOLUTO;

  // Calcolo fascia ±35%
  const minRange = Math.round(base * (1 - MARGINE));
  const maxRange = Math.round(base * (1 + MARGINE));

  // Visualizzazione (usa l'ID che preferisci, qui totaleOutput)
  totaleOutput.textContent = `€${minRange} – €${maxRange}`;
}

form.addEventListener('input', calcolaPreventivo);
window.addEventListener('load', calcolaPreventivo);