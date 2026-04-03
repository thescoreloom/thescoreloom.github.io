const cimosa = document.getElementById("chapter-title");

if (cimosa) {
  // seleziona tutti gli h2 dentro main
  const chapters = Array.from(document.querySelectorAll("main .chapter h2"));

  // mostra subito il primo titolo
  if (chapters.length) {
    cimosa.textContent = chapters[0].textContent;
  }

  window.addEventListener("scroll", () => {
    let closestTitle = chapters[0];
    let minDistance = Infinity;

    chapters.forEach(title => {
      const rect = title.getBoundingClientRect();
      const distance = Math.abs(rect.top);
      if (distance < minDistance) {
        minDistance = distance;
        closestTitle = title;
      }
    });

    cimosa.textContent = closestTitle.textContent;
  });
}