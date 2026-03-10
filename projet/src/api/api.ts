import type { Stock } from "../ui/interface.js"
import type { Price } from "../ui/interface.js"

async function fetchFilms(){
  const response = await fetch("./api/bourse.json")

  const films: Stock[] = await response.json()

  // return liste des films
  return films
}

//récupérer les films et les afficher dans la page HTML
async function displayFilms() {

  //fonction qui récupère les films depuis l’API
  const films = await fetchFilms()
  console.log(films)

  }

// Appel de la fonction
displayFilms()