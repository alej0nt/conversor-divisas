import { CurrencyService } from "./services/CurrencyService.js";
const tableHistory = document.getElementById("history-list");
const clearBtn = document.getElementById("clearHistoryBtn");
const service = new CurrencyService();
function renderHistory() {
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
function clearHistory() {
    service.clearHistory();
    renderHistory();
}
clearBtn === null || clearBtn === void 0 ? void 0 : clearBtn.addEventListener("click", () => clearHistory());
renderHistory();
