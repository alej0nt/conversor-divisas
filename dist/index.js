/**
 * Punto de entrada para la interfaz del conversor.
 * Este archivo solo maneja el DOM (llenar selects, convertir, cambio). La lógica de negocio
 *   está delegada en CurrencyService.
 */
var _a, _b;
import { Currency } from "./models/Currency.js";
import { CurrencyService } from "./services/CurrencyService.js";
/** Elemento input donde el usuario escribe la cantidad a convertir.*/
const amount = document.getElementById("amount");
/** Select donde el usuario elige la moneda origen (código ISO). */
const fromCurrency = document.getElementById("from-currency");
/**
 * Select donde el usuario elige la moneda destino (código ISO).
 */
const toCurrency = document.getElementById("to-currency");
/**
 * Contenedor donde se mostrará el resultado formateado.
 */
const convertedAmount = document.getElementById("converted-amount");
/**
 * Contenedor donde se mostrará el resultado formateado.
 */
const exchangeRateCustom = document.getElementById("exchange-rate-custom");
/**
 * Servicio central que contiene tasas y historial, se encarga de logica.
 */
const service = new CurrencyService();
/**
 * Rellena los selects (origen/destino) con las monedas disponibles que provee el servicio.
 * Cada opción muestra el displayName de la moneda (símbolo + nombre + código).
 */
function fillCurrencySelectors() {
    // Recorre las monedas disponibles
    service.getAvailableCurrencies().forEach(currency => {
        // Creamos la opción para la moneda origen
        const optionFrom = document.createElement("option");
        optionFrom.value = currency.getCode();
        optionFrom.textContent = currency.getDisplayName();
        fromCurrency.appendChild(optionFrom);
        // Creamos la opción para la moneda destino
        const optionTo = document.createElement("option");
        optionTo.value = currency.getCode();
        optionTo.textContent = currency.getDisplayName();
        toCurrency.appendChild(optionTo);
    });
}
/**
 * Toma la cantidad del input, valida los valores y realiza la conversión usando el servicio.
 * - Valida que la cantidad sea un número > 0.
 * - Valida que las monedas seleccionadas no sean iguales.
 * - Pinta el resultado en el DOM.
 */
function convertCurrency() {
    console.log(exchangeRateCustom.value);
    const amountNumber = parseFloat(amount.value);
    // Obtenemos las monedas seleccionadas segun su código ISO
    const from = service.getAvailableCurrencies().find(c => c.getCode() === fromCurrency.value); //uso de `!` en las búsquedas (find) fuerza que exista la moneda
    const to = service.getAvailableCurrencies().find(c => c.getCode() === toCurrency.value);
    if (isNaN(amountNumber) || amountNumber <= 0) {
        alert("Por favor, introduce una cantidad válida.");
        return;
    }
    if (from.isEqual(to)) {
        alert("Las divisas deben ser diferentes.");
        return;
    }
    const conversion = service.convert(from, to, amountNumber, parseFloat(exchangeRateCustom.value));
    convertedAmount.textContent = `${to.getSymbol()} ${conversion.getResult().toFixed(2)}`;
}
/**
 * Intercambia los select (de <-> a) y vuelve a calcular la conversión.
 */
function changeCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
}
// Listeners: vinculamos botones a las funciones correspondientes.
(_a = document.getElementById("convertBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => convertCurrency());
(_b = document.getElementById("swapBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => changeCurrencies());
// Inicializamos la UI llenando los selects
fillCurrencySelectors();
