import { Chart } from "chart.js/auto"
import type { Stock } from "../models/stock.js"
import { showError } from "../errors/errors.js"

let chart: Chart

// affiche 2 actions differentes
export function graphChart(name1: Stock, name2: Stock, chartType: "line" | "bar") {
  try{

    //recupere le canvas du dom
    const canvas = document.getElementById("lineCanvas") as HTMLCanvasElement

    // remet le canvas apres selection
    if (chart) {
      chart.destroy()
    }

    // nouveau graph apres selection
    chart = new Chart(canvas, {
      type: chartType,
      data: { // la date de l'axe x et le prix de l'axe y
        labels: name1.history.map((item) => item.date),
        datasets: [
          { // action 1
            label: name1.name,
            data: name1.history.map((item) => item.price)
          },
          { // action 2
            label: name2.name,
            data: name2.history.map((item) => item.price)
          }
        ]
      }
    })
  } catch (error: unknown) {
    console.error("Erreur graphChart :", error)
    if (error instanceof Error) {
      showError(error.message)
    } else {
      showError("Erreur inconnue dans le graphique")
    }
  }
}
