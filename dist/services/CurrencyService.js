/**
 * Servicio central del conversor de divisas.
 * Maneja las tasas de cambio, las monedas disponibles y el historial de conversiones.
 */
import { Currency } from "../models/Currency.js";
import { Conversion } from "../models/Conversion.js";
import { ExchangeRate } from "../models/ExchangeRate.js";
/**
 * Clave usada para guardar el historial en localStorage.
 */
const HISTORY_KEY = "conversion_history";
export class CurrencyService {
    constructor() {
        const description = "Tasas de cambio actuales en el año 2025";
        // Inicializamos las tasas de cambio
        this.exchangeRates = new ExchangeRate({
            USD: { USD: 1, EUR: 0.85, MXN: 18.5, GBP: 0.75 },
            EUR: { USD: 1.18, EUR: 1, MXN: 21.76, GBP: 0.88 },
            MXN: { USD: 0.054, MXN: 1, EUR: 0.046, GBP: 0.04 },
            GBP: { USD: 1.33, EUR: 1.14, MXN: 25.0, GBP: 1 },
        }, description);
        this.history = [];
        // Catálogo de monedas disponibles en el conversor
        this.availableCurrencies = [
            new Currency("USD", "Dólar estadounidense", "$"),
            new Currency("EUR", "Euro", "€"),
            new Currency("MXN", "Peso mexicano", "MX$"),
            new Currency("GBP", "Libra esterlina", "£"),
        ];
        this.loadHistoryFromStorage();
    }
    /**
     * Retorna el objeto con todas las tasas de cambio.
     */
    getRates() {
        return this.exchangeRates;
    }
    /**
     * Retorna todas las monedas disponibles.
     */
    getAvailableCurrencies() {
        return this.availableCurrencies;
    }
    /**
     * Realiza una conversión entre dos monedas y guarda el resultado en historial.
     */
    convert(from, to, amount) {
        // Realiza la conversión usando las tasas de cambio
        const result = this.exchangeRates.convert(from, to, amount);
        // Crea el objeto de conversión y lo guarda en el historial
        const conversion = new Conversion(from, to, amount, result);
        this.history.push(conversion);
        this.saveHistoryToStorage();
        return conversion;
    }
    /**
     * Limpia el historial de conversiones y lo borra de localStorage.
     */
    clearHistory() {
        this.history = [];
        localStorage.removeItem(HISTORY_KEY);
    }
    /**
     * Retorna el historial de conversiones en memoria.
     */
    getHistory() {
        return this.history;
    }
    /**
     * Guarda el historial actual en localStorage.
     */
    saveHistoryToStorage() {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history.map((c) => c.toJSON())));
    }
    /**
     * Carga el historial desde localStorage (si existe).
     */
    loadHistoryFromStorage() {
        const json = localStorage.getItem(HISTORY_KEY);
        if (!json)
            return;
        // Convierte cada objeto JSON en una instancia de Conversion
        this.history = JSON.parse(json).map((item) => Conversion.fromJSON(item));
    }
}
