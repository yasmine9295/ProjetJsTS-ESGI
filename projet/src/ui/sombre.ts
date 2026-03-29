export function initDarkMode(): void {
  const btn = document.getElementById("btnsombre") as HTMLButtonElement;

  //au cas ouutilisateur avait deja activé le mode sombre on le remet
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    btn.textContent = "Mode clair";
  }

  //pour le clic
  btn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    //on change le texte du bouton selon le mode
    btn.textContent = isDark ? "Mode clair" : "Mode sombre";

    //preference dans le localStorage
    localStorage.setItem("darkMode", String(isDark));
  });
}
