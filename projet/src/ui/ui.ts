import { fetchStock } from "../api/api.js"
import { graphChart } from "../charts/chart.js"
import type { Stock } from "../models/stock.js"

export async function initUI() {

  // récupérer les données de l'API
  const stocks: Stock[] = await fetchStock()

  // récupérer les éléments du DOM
  const name1 = document.getElementById("name1") as HTMLSelectElement
  const name2 = document.getElementById("name2") as HTMLSelectElement
  const typeChart = document.getElementById("typeChart") as HTMLSelectElement
  const periode = document.getElementById("periode") as HTMLSelectElement

  // remplir les select avec les actions
  stocks.forEach(stock => {
    const option = document.createElement("option")
    option.value = stock.symbol
    option.textContent = stock.name

    name1.appendChild(option.cloneNode(true))
    name2.appendChild(option.cloneNode(true))
  })

  // valeurs par défaut
  name1.value = stocks[0].symbol
  name2.value = stocks[1].symbol

  // fonction pour filtrer les données
  function filter(stock: Stock, periode: string): Stock {
    return {
      ...stock,
      history:
        periode === "1jour" ? stock.history.slice(-1) :
        periode === "semaine" ? stock.history.slice(-7) :
        periode === "mois" ? stock.history.slice(-30) :
        periode === "an" ? stock.history.slice(-365) :
        stock.history
    }
  }

  // fonction qui met à jour le graphique
  function update() {

    const stock1 = stocks.find(s => s.symbol === name1.value)
    const stock2 = stocks.find(s => s.symbol === name2.value)

    if (!stock1 || !stock2) return

    const s1 = filter(stock1, periode.value)
    const s2 = filter(stock2, periode.value)

    graphChart(s1, s2, typeChart.value as "line" | "bar")
  }

  name1.addEventListener("change", update)
  name2.addEventListener("change", update)
  typeChart.addEventListener("change", update)
  periode.addEventListener("change", update)

  update()
}