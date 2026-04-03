// --- PARAMETRI PER RANGE RICHIESTI ---
const BASE_FISSA = 15;      
const MOLT_MINUTI = 22;     
const PESO_STRUMENTI = 1.5; // Bassissimo per gestire 30 strumenti senza picchi
const COSTO_COPYRIGHT = 60; 
const MINIMO_ASSOLUTO = 40; 
const MARGINE = 0.35;       

function calcolaPreventivo() {
  const minuti = parseFloat(minutiInput.value) || 0;
  const strumenti = parseFloat(strumentiInput.value) || 0;
  const copyright = copyrightInput.checked ? COSTO_COPYRIGHT : 0;

  // Formula lineare: ogni pezzo si somma senza moltiplicare gli altri
  let base = BASE_FISSA + (minuti * MOLT_MINUTI) + (strumenti * PESO_STRUMENTI) + copyright;

  if (base < MINIMO_ASSOLUTO) base = MINIMO_ASSOLUTO;

  const minRange = Math.round(base * (1 - MARGINE));
  const maxRange = Math.round(base * (1 + MARGINE));

  totaleOutput.textContent = `€${minRange} – €${maxRange}`;
}
