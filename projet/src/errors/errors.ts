//fonction qui affiche un message d'erreur
//recupere avec getElementById et on lui met le message en texte
export function showError(message: string): void {
  const errorDiv = document.getElementById("errorMessage")
  if (errorDiv) {
    errorDiv.textContent = message 
    errorDiv.style.display = "block" // on affiche la div
  }
}

//fonction efface le message d'erreur et cache la div
export function clearError(): void {
  const errorDiv = document.getElementById("errorMessage")
  if (errorDiv) {
    errorDiv.textContent = "" //vide texte
    errorDiv.style.display = "none"
  }
}
