const form = document.getElementById('quoteForm');
const minutiInput = document.getElementById('minuti');
const strumentiInput = document.getElementById('strumenti');
const copyrightInput = document.getElementById('copyright');
const totaleOutput = document.getElementById('totale');

// --- PARAMETRI DI INTERPOLAZIONE RAFFINATI ---
const BASE_FISSA_ARRANGIAMENTO = 40;
const COSTO_MINUTO_BASE = 10;
const COEFFICIENTE_STRUMENTI = 0.6; // Rapporto complessità/tempo
const MARGINE_FORBICE = 0.25;       // Range ±25%

function calcolaPreventivo() {
  const minuti = parseFloat(minutiInput.value) || 0;
  const strumenti = parseFloat(strumentiInput.value) || 0;
  const haCopyright = copyrightInput.checked;

  // 1. CALCOLO ARRANGIAMENTO (Senza Copyright)
  // Formula: Base + (Minuti * 10) + (Strumenti * Minuti * 0.6)
  let baseSenzaCopyright = BASE_FISSA_ARRANGIAMENTO + (minuti * COSTO_MINUTO_BASE) + (strumenti * minuti * COEFFICIENTE_STRUMENTI);

  // 2. CALCOLO COPYRIGHT DINAMICO (Se selezionato)
  // Formula: 5€ fisso + (1.6€ per strumento) + (5€ per minuto di durata)
  let costoCopyright = 0;
  if (haCopyright) {
    costoCopyright = 5 + (strumenti * 1.6) + (minuti * 5);
  }

  // 3. SOMMA TOTALE
  let baseTotale = baseSenzaCopyright + costoCopyright;

  // 4. CONTROLLO MINIMO DIGNITÀ (50€ come da tua indicazione)
  if (baseTotale < 50) baseTotale = 50;

  // 5. CALCOLO RANGE ±25%
  const minRange = Math.round(baseTotale * (1 - MARGINE_FORBICE));
  const maxRange = Math.round(baseTotale * (1 + MARGINE_FORBICE));

  // 6. VISUALIZZAZIONE SUL SITO
  totaleOutput.textContent = `€${minRange} – €${maxRange}`;
}

// Collegamento eventi (Input e Caricamento pagina)
form.addEventListener('input', calcolaPreventivo);
window.addEventListener('load', calcolaPreventivo);