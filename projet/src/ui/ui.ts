import { fetchStock } from "../api/api.js";
import { graphChart } from "../charts/chart.js";
import type { Stock } from "../models/stock.js";
import { showError, clearError } from "../errors/errors.js";
import { exportCSV } from "./exportcsv.js";

export async function initUI() {
  try {
    clearError();

    // données api
    const stocks: Stock[] = await fetchStock();

    // récupérer les éléments du DOM
    const name1 = document.getElementById("name1") as HTMLSelectElement;
    const name2 = document.getElementById("name2") as HTMLSelectElement;
    const typeChart = document.getElementById("typeChart") as HTMLSelectElement;
    const periode = document.getElementById("periode") as HTMLSelectElement;

    // remplir les select avec les actions
    stocks.forEach((stock) => {
      const option = document.createElement("option");
      option.value = stock.symbol;
      option.textContent = stock.name;

      name1.appendChild(option.cloneNode(true));
      name2.appendChild(option.cloneNode(true));
    });

    name1.value = localStorage.getItem("name1") || stocks[0].symbol;
    name2.value = localStorage.getItem("name2") || stocks[1].symbol;
    typeChart.value = localStorage.getItem("typeChart") || "line";
    periode.value = localStorage.getItem("periode") || "all";

    // fonction pour filtrer les données
    function filter(stock: Stock, periode: string): Stock {
      return {
        ...stock,
        history:
          periode === "1jour"
            ? stock.history.slice(-1)
            : periode === "semaine"
              ? stock.history.slice(-7)
              : periode === "mois"
                ? stock.history.slice(-30)
                : periode === "an"
                  ? stock.history.slice(-365)
                  : stock.history,
      };
    }

    //faut stocker les actions affichées pour l'export
    let currentStock1: Stock | undefined;
    let currentStock2: Stock | undefined;

    // fonction qui met à jour le graphique
    function update() {
      try {
        clearError(); // efface les erreurs à chaque update

        const stock1 = stocks.find((s) => s.symbol === name1.value);
        const stock2 = stocks.find((s) => s.symbol === name2.value);

        if (!stock1 || !stock2) {
          throw new Error("Sélection invalide");
        }

        const s1 = filter(stock1, periode.value);
        const s2 = filter(stock2, periode.value);

        graphChart(s1, s2, typeChart.value as "line" | "bar");
        // on sauvegarde les actions filtrées pour l'export
        currentStock1 = s1;
        currentStock2 = s2;
        // on sauvegarde les préférences à chaque changement
        localStorage.setItem("name1", name1.value);
        localStorage.setItem("name2", name2.value);
        localStorage.setItem("typeChart", typeChart.value);
        localStorage.setItem("periode", periode.value);
      } catch (error: unknown) {
        console.error("Erreur update :", error);
        if (error instanceof Error) {
          showError(error.message);
        } else {
          showError("Erreur inconnue");
        }
      }
    }

    // bouton export
    const exportBtn = document.getElementById("exportBtn") as HTMLButtonElement;
    exportBtn.addEventListener("click", () => {
      if (currentStock1 && currentStock2) {
        exportCSV(currentStock1, currentStock2);
      }
    });

    name1.addEventListener("change", update);
    name2.addEventListener("change", update);
    typeChart.addEventListener("change", update);
    periode.addEventListener("change", update);

    update();
  } catch (error: unknown) {
    console.error("Erreur initUI :", error);
    if (error instanceof Error) {
      showError(error.message);
    } else {
      showError("Erreur lors de l'initialisation");
    }
  }
}
