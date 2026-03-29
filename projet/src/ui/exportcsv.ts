import type { Stock } from "../models/stock.js"


//crée le fichier et on le télécharge automatiquement
export function exportCSV(stock1: Stock, stock2: Stock): void {

  //titre
  let csv = "Date," + stock1.name + "," + stock2.name + "\n"

  stock1.history.forEach((item, index) => {
    const price2 = stock2.history[index] ? stock2.history[index].price : ""
    csv += item.date + "," + item.price + "," + price2 + "\n"
  })

  //lien
  const blob = new Blob([csv], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "export.csv"
  a.click()
}