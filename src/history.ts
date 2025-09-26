import { CurrencyService } from "./services/CurrencyService.js";

const tableHistory = document.getElementById("history-list") as HTMLElement;
const clearBtn = document.getElementById("clearHistoryBtn") as HTMLButtonElement;

const service = new CurrencyService();

function renderHistory(): void {
  tableHistory.innerHTML = "";
  service.getHistory().forEach(conversion => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${conversion.getDate()}</td>
      <td>${conversion.getFromCurrency()}</td>
      <td>${conversion.getToCurrency()}</td>
      <td>${conversion.getAmount().toFixed(2)}</td>
      <td>${conversion.getResult().toFixed(2)}</td>
    `;
    tableHistory.appendChild(row);
  });
}

function clearHistory(): void {
  service.clearHistory();
  renderHistory();
}

clearBtn?.addEventListener("click", () => clearHistory());

renderHistory();
