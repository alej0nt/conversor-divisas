/**
 * Punto de entrada para la interfaz de history.
 * Renderiza la tabla de conversiones y permite limpiar el historial.
 */
import { CurrencyService } from "./services/CurrencyService.js";
import './components/components.js'

/**
 * Tabla donde se muestran las conversiones realizadas.
 */
const tableHistory = document.getElementById("history-list") as HTMLElement;

/**
 * Botón para limpiar el historial de conversiones.
 */
const clearBtn = document.getElementById("clearHistoryBtn") as HTMLButtonElement;

/**
 * Servicio central que maneja tasas, conversiones e historial.
 */
const service : CurrencyService = new CurrencyService();

/**
 * Renderiza en la tabla el historial de conversiones guardado en el servicio.
 * - Limpia el contenido actual 
 * - Recorre el arreglo devuelto por service.getHistory() y por cada Conversion
 *   crea una fila (<tr>) con las celdas correspondientes.
 */
function renderHistory(): void {
  tableHistory.innerHTML = "";
  // Recorre el historial
  service.getHistory().forEach(conversion => {
    // Crea una fila por cada conversión
    const row : HTMLTableRowElement = document.createElement("tr");
    row.innerHTML = `
      <td>${conversion.getDate()}</td>
      <td>${conversion.getFromCurrency().getDisplayName()}</td>
      <td>${conversion.getToCurrency().getDisplayName()}</td>
      <td>${conversion.getAmount().toFixed(2)}</td>
      <td>${conversion.getRate().toFixed(2)}</td>
      <td>${conversion.getResult().toFixed(2)}</td>
    `;
    tableHistory.appendChild(row);
  });
}

/**
 * Limpia el historial en el servicio y vuelve a renderizar la tabla.
 */
function clearHistory(): void {
  service.clearHistory();
  renderHistory();
}

// Listener para botón de limpiar historial
clearBtn?.addEventListener("click", () => clearHistory());

// Inicializa renderizando el historial actual
renderHistory();
