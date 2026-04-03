// --- PARAMETRI TESTATI ---
const BASE_FISSA = 15;      
const MOLT_MINUTI = 18;     
const PESO_STRUMENTI = 0.75; 
const COSTO_COPYRIGHT = 60; 
const MINIMO_ASSOLUTO = 40; 
const MARGINE = 0.35;       

function calcolaPreventivo() {
  // Assicuriamoci che siano numeri puri
  const minuti = parseFloat(minutiInput.value) || 0;
  const strumenti = parseFloat(strumentiInput.value) || 0;
  const copyright = copyrightInput.checked ? COSTO_COPYRIGHT : 0;

  // DEBUG: Decommenta la riga sotto se vuoi vedere i valori in console (F12)
  // console.log(`Minuti: ${minuti}, Strumenti: ${strumenti}, Copyright: ${copyright}`);

  // Formula Dinamica
  let calcoloBase = BASE_FISSA + (minuti * MOLT_MINUTI) + (strumenti * minuti * PESO_STRUMENTI) + copyright;

  // Se il calcolo fallisce o è troppo basso, usa il minimo
  if (isNaN(calcoloBase) || calcoloBase < MINIMO_ASSOLUTO) {
      calcoloBase = MINIMO_ASSOLUTO;
  }

  const minRange = Math.round(calcoloBase * (1 - MARGINE));
  const maxRange = Math.round(calcoloBase * (1 + MARGINE));

  // AGGIORNAMENTO UI
  totaleOutput.textContent = `€${minRange} – €${maxRange}`;
}

// Assicurati che gli eventi siano collegati correttamente
form.addEventListener('input', calcolaPreventivo);
