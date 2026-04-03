// --- PARAMETRI TESTATI E CALIBRATI ---
const BASE_FISSA = 15;      
const MOLT_MINUTI = 18;     
const PESO_STRUMENTI = 0.75; // Abbassato a 0.75 per non eccedere sui 10 minuti
const COSTO_COPYRIGHT = 60; 
const MINIMO_ASSOLUTO = 40; 
const MARGINE = 0.35;       

function calcolaPreventivo() {
  const minuti = parseFloat(minutiInput.value) || 0;
  const strumenti = parseFloat(strumentiInput.value) || 0;
  const copyright = copyrightInput.checked ? COSTO_COPYRIGHT : 0;

  // Logica: (strumenti * minuti * 0.75) rende il costo dello strumento dipendente dal tempo
  let base = BASE_FISSA + (minuti * MOLT_MINUTI) + (strumenti * minuti * PESO_STRUMENTI) + copyright;

  if (base < MINIMO_ASSOLUTO) base = MINIMO_ASSOLUTO;

  const minRange = Math.round(base * (1 - MARGINE));
  const maxRange = Math.round(base * (1 + MARGINE));

  totaleOutput.textContent = `€${minRange} – €${maxRange}`;
}
