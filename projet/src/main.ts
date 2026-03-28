import { fetchStock } from "./api/api.js"
import { graphChart } from "./charts/chart.js"
import type { Stock } from "./models/stock.js"

async function init() {

  // recuperation de la function de l'api
  const stocks: Stock[] = await fetchStock()

  // recuperation des id du dom
  const name1Select = document.getElementById("name1") as HTMLSelectElement
  const name2Select = document.getElementById("name2") as HTMLSelectElement
  const chartTypeSelect = document.getElementById("typeChart") as HTMLSelectElement

  // liste deroute du dom avec les donne de l'api
  stocks.forEach(stock => {
    const option1 = document.createElement("option")
    option1.value = stock.symbol
    option1.textContent = stock.name
    name1Select.appendChild(option1)

    const option2 = document.createElement("option")
    option2.value = stock.symbol
    option2.textContent = stock.name
    name2Select.appendChild(option2)
  })


  // valeurs de base
  name1Select.value = stocks[0].symbol
  name2Select.value = stocks[1].symbol

  // functiob pour update les selection
  function updateChart() {
    const type1 = stocks.find(s => s.symbol === name1Select.value)
    const type2 = stocks.find(s => s.symbol === name2Select.value)
    const chartType = chartTypeSelect.value as "line" | "bar"

    if (!type1 || !type2) return

    graphChart(type1, type2, chartType)
  }

  // update apres selection pour nom et type
  name1Select.addEventListener("change", updateChart)
  name2Select.addEventListener("change", updateChart)
  chartTypeSelect.addEventListener("change", updateChart)

  updateChart()
}

init()