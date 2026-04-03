const form = document.getElementById('quoteForm');
const minutiInput = document.getElementById('minuti');
const strumentiInput = document.getElementById('strumenti');
const copyrightInput = document.getElementById('copyright');
const totaleOutput = document.getElementById('totale');

// --- PARAMETRI RICALIBRATI PER FORBICE 30% ---
const BASE_FISSA = 35;      // Base di avvio progetto
const MOLT_MINUTI = 28;     // Peso del tempo
const PESO_STRUMENTI = 1.9; // Impatto della compagine orchestrale
const COSTO_COPYRIGHT = 50; // Fisso, come richiesto
const MINIMO_ASSOLUTO = 50; // Mai sotto i 50€
const MARGINE = 0.30;       // Forbice del 30% (±30%)

function calcolaPreventivo() {
  const minuti = parseFloat(minutiInput.value) || 0;
  const strumenti = parseFloat(strumentiInput.value) || 0;
  const copyright = copyrightInput.checked ? COSTO_COPYRIGHT : 0;

  // Calcolo della base: Base Fissa + (Minuti * Costo al Minuto)
  let base = BASE_FISSA + (minuti * MOLT_MINUTI);
  
  // Aggiunta complessità strumenti (crescita non lineare tramite radice quadrata)
  // 1 strumento pesa circa il 45% di 25 strumenti, mantenendo la proporzione richiesta
  base += (Math.sqrt(strumenti) * PESO_STRUMENTI * minuti);
  
  // Aggiunta Copyright
  base += copyright;

  // Applichiamo il minimo assoluto alla base prima del calcolo del range
  if (base < MINIMO_ASSOLUTO) base = MINIMO_ASSOLUTO;

  // Calcolo fascia ±30%
  const minRange = Math.round(base * (1 - MARGINE));
  const maxRange = Math.round(base * (1 + MARGINE));

  // Visualizzazione con simbolo Euro
  totaleOutput.textContent = `€${minRange} – €${maxRange}`;
}

// Event Listeners per aggiornamento real-time
form.addEventListener('input', calcolaPreventivo);
window.addEventListener('load', calcolaPreventivo);