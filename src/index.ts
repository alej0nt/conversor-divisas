/**
 * Punto de entrada para la interfaz del conversor.
 * Este archivo solo maneja el DOM (llenar selects, convertir, cambio). La lógica de negocio
 *   está delegada en CurrencyService.
 */

import type { Conversion } from "./models/Conversion.js";
import { Currency } from "./models/Currency.js";
import { CurrencyService } from "./services/CurrencyService.js";

/** Elemento input donde el usuario escribe la cantidad a convertir.*/
const amount = document.getElementById("amount") as HTMLInputElement;

/** Select donde el usuario elige la moneda origen (código ISO). */
const fromCurrency = document.getElementById("from-currency") as HTMLSelectElement;

/**
 * Select donde el usuario elige la moneda destino (código ISO).
 */
const toCurrency = document.getElementById("to-currency") as HTMLSelectElement;

/**
 * Contenedor donde se mostrará el resultado formateado.
 */
const convertedAmount = document.getElementById("converted-amount") as HTMLElement;

/**
 * Contenedor donde se mostrará el resultado formateado.
 */
const exchangeRateCustom = document.getElementById("exchange-rate-custom") as HTMLInputElement;

/**
 * Servicio central que contiene tasas y historial, se encarga de logica.
 */
const service : CurrencyService = new CurrencyService();


/**
 * Inicializa la aplicación cargando las monedas disponibles y llenando los selects.
 */
async function initialize() {
    try {
        await service.loadAvailableCurrencies();
        fillCurrencySelectors();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

/**
 * Rellena los selects (origen/destino) con las monedas disponibles que provee el servicio.
 * Cada opción muestra el displayName de la moneda (símbolo + nombre + código).
 */
function fillCurrencySelectors(): void {
  // Recorre las monedas disponibles
  service.getAvailableCurrencies().forEach(currency => {
    // Creamos la opción para la moneda origen
    const optionFrom : HTMLOptionElement = document.createElement("option");
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
function convertCurrency(): void {
  console.log(exchangeRateCustom.value);
  const amountNumber : number = parseFloat(amount.value);
  // Obtenemos las monedas seleccionadas segun su código ISO
  const from : Currency = service.getAvailableCurrencies().find(c => c.getCode() === fromCurrency.value)!; //uso de `!` en las búsquedas (find) fuerza que exista la moneda
  const to : Currency = service.getAvailableCurrencies().find(c => c.getCode() === toCurrency.value)!;

  if (isNaN(amountNumber) || amountNumber <= 0) {
    alert("Por favor, introduce una cantidad válida.");
    return;
  }

  if (from.isEqual(to)) {
    alert("Las divisas deben ser diferentes.");
    return;
  }

  const conversion : Conversion = service.convert(from, to, amountNumber, parseFloat(exchangeRateCustom.value));
  convertedAmount.textContent = `${to.getSymbol()} ${conversion.getResult().toFixed(2)}`;
}

/**
 * Intercambia los select (de <-> a) y vuelve a calcular la conversión.
 */
function changeCurrencies(): void {
  const temp : string = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  convertCurrency();
}

// Listeners: vinculamos botones a las funciones correspondientes.
document.getElementById("convertBtn")?.addEventListener("click", () => convertCurrency());
document.getElementById("swapBtn")?.addEventListener("click", () => changeCurrencies());

// Inicializamos la UI llenando los selects
initialize();
