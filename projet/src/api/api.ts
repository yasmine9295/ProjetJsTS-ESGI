import type { Stock } from "../ui/interface.js"
import type { Price } from "../ui/interface.js"

async function fetchStock(){
  const response = await fetch("./api/bourse.json")

  const stocks: Stock[] = await response.json()

  // return liste des films
  return stocks
}

//récupérer les films et les afficher dans la page HTML
async function displayStocks() {

  //fonction qui récupère les films depuis l’API
  const stocks = await fetchStock()
  console.log(stocks)

  }

// Appel de la fonction
displayStocks()