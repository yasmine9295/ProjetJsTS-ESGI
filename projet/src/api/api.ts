import type { Stock } from "../models/stock.ts"

export async function fetchStock(): Promise<Stock[]> {
  try {

    const response = await fetch("/stocks.json")
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des données")
    }

    const stocks: Stock[] = await response.json()

    return stocks

  } catch (error) {
  
    console.error("Erreur fetchStock :", error)
    return []
  }
}

async function displayStocks(): Promise<void> {
  try {

    const stocks = await fetchStock()
    console.log(stocks)

  } catch (error) {
    console.error("Impossible d'afficher les actions :", error)
  }
}

displayStocks()