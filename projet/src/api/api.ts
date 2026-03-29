import type { Stock } from "../models/stock.js"
import { showError, clearError } from "../errors/errors.js"

// recupération de la liste actions api
export async function fetchStock(): Promise<Stock[]> {
  try {

    const response = await fetch("/stocks.json")
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des données")
    }

    const stocks: Stock[] = await response.json()

    //données valide sinon erreur 
    if (!Array.isArray(stocks) || stocks.length === 0) {
      throw new Error("Données invalides reçues")
    }

    return stocks

  } catch (error) {
    console.error("Erreur fetchStock :", error)
    throw new Error("Impossible de charger les données")
    return []
  }
}

async function displayStocks(): Promise<void> {
  try {
    clearError()
    const stocks = await fetchStock()
    console.log(stocks)

  } catch (error: unknown) {
    console.error("Impossible d'afficher les actions :", error)
    if (error instanceof Error) {
      showError(error.message)
    } else {
      showError("Erreur")
    }
  }
}

displayStocks()