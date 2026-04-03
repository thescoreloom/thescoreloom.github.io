document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const sendBtn = document.getElementById('SendBtn');
    const successMsg = document.getElementById('successMessage'); // Riferimento al nuovo div

    // 1. RECUPERO PARAMETRI URL (Inalterato)
    const urlParams = new URLSearchParams(window.location.search);
    const fields = ['category', 'message', 'subject'];
    fields.forEach(field => {
        const value = urlParams.get(field);
        const element = document.getElementById(field);
        if (value && element) element.value = value;
    });

    if (!sendBtn || !contactForm) return;

    // 2. GESTIONE INVIO
    sendBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        if (!emailInput.value.trim() || !messageInput.value.trim()) {
            alert("Please fill in your email and message.");
            return;
        }

        // Feedback Iniziale
        sendBtn.innerText = "Sending...";
        sendBtn.style.opacity = "0.6";
        sendBtn.style.pointerEvents = "none";

        const formData = new FormData(contactForm);
        formData.append("access_key", "9d65bfe0-f611-405c-b277-dc82de0deab1");
        formData.append("from_name", "TheScoreLoom Contact");
        formData.append("redirect", ""); 

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            const result = await response.json();

            if (result.success) {
                // 1. Nascondiamo il form per pulizia visiva
                contactForm.style.display = "none"; 
                
                // 2. Mostriamo il messaggio di ringraziamento sotto
                if (successMsg) {
                    successMsg.style.display = "block";
                }
                
                // 3. Modifica del pulsante: cambia SOLO il testo e lo stato
                sendBtn.innerText = "Done ✓"; 
                
                // Reset dell'opacità (nel caso fosse rimasta allo 0.6 del "Sending...")
                sendBtn.style.opacity = "1"; 
                
                // Impedisce click multipli dopo l'invio riuscito
                sendBtn.style.pointerEvents = "none"; 
                
                // NOTA: Non aggiungiamo comandi per backgroundColor o color, 
                // così il pulsante resta identico agli altri (es. il tasto Back)
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Connection error. Please try again later.");
            resetButton(sendBtn, "Send →");
        }
    });
});

// Funzione di utility per resettare il pulsante in caso di errore
function resetButton(btn, text) {
    btn.innerText = text;
    btn.style.opacity = "1";
    btn.style.pointerEvents = "auto";
}