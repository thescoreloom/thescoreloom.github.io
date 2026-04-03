document.addEventListener('DOMContentLoaded', () => {
    const cimosa = document.querySelector('.cimosa');
    const nav = document.querySelector('header nav');
    let pressTimer;

    if (!cimosa || !nav) return;

    // Funzione per verificare se l'utente è davvero in fondo
    const isAtBottom = () => {
        const threshold = 100; // tolleranza in pixel
        return (window.innerHeight + window.window.scrollY) >= (document.documentElement.scrollHeight - threshold);
    };

    // Gestione inizio pressione (Mouse e Touch)
    const startPress = (e) => {
        // CONDIZIONE: Nav aperta + Fondo pagina
        if (nav.classList.contains('active') && isAtBottom()) {
            
            // Feedback visivo: la cimosa pulsa leggermente
            cimosa.style.transition = "opacity 2s linear";
            cimosa.style.opacity = "0.4";

            pressTimer = setTimeout(() => {
                window.location.href = 'allievi.html';
            }, 2000); // 2 secondi esatti
        }
    };

    // Gestione interruzione pressione
    const cancelPress = () => {
        clearTimeout(pressTimer);
        cimosa.style.setProperty('transition', 'opacity 0.3s ease');
        cimosa.style.opacity = "1";
    };

    // Eventi Mouse
    cimosa.addEventListener('mousedown', startPress);
    cimosa.addEventListener('mouseup', cancelPress);
    cimosa.addEventListener('mouseleave', cancelPress);

    // Eventi Touch (Mobile)
    cimosa.addEventListener('touchstart', startPress, { passive: true });
    cimosa.addEventListener('touchend', cancelPress);
});