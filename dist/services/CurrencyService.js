/**
 * Servicio central del conversor de divisas.
 * Maneja las tasas de cambio, las monedas disponibles y el historial de conversiones.
 */
import { Currency } from "../models/Currency.js";
import { Conversion } from "../models/Conversion.js";
import { ExchangeRate } from "../models/ExchangeRate.js";
import { ApiService } from "./ApiService.js";
/**
 * Clave usada para guardar el historial en localStorage.
 */
const HISTORY_KEY = "conversion_history";
export class CurrencyService {
    constructor() {
        /**
         * Monedas que el usuario puede usar en el conversor.
         */
        this.availableCurrencies = [];
        const description = "Tasas de cambio actuales en el año 2025";
        // Inicializamos las tasas de cambio
        this.exchangeRates = new ExchangeRate({
            USD: { USD: 1, EUR: 0.85, MXN: 18.5, GBP: 0.75 },
            EUR: { USD: 1.18, EUR: 1, MXN: 21.76, GBP: 0.88 },
            MXN: { USD: 0.054, MXN: 1, EUR: 0.046, GBP: 0.04 },
            GBP: { USD: 1.33, EUR: 1.14, MXN: 25.0, GBP: 1 },
        }, description);
        this.history = [];
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
     * Carga las monedas disponibles desde el ApiService y las almacena en memoria.
     */
    async loadAvailableCurrencies() {
        try {
            const response = await ApiService.getAvailableCurrencies();
            if (response === null || response === void 0 ? void 0 : response.data) {
                this.availableCurrencies = Object.entries(response.data).map(([code, details]) => {
                    return new Currency(code, details.name, details.symbol);
                });
            }
        }
        catch (error) {
            console.error('Error fetching available currencies:', error);
        }
    }
    /**
     * Realiza una conversión entre dos monedas y guarda el resultado en historial.
     */
    convert(from, to, amount, exchangeRateCustom) {
        let result;
        let rate;
        if (exchangeRateCustom && exchangeRateCustom > 0) {
            result = amount * exchangeRateCustom;
            rate = exchangeRateCustom;
        }
        else {
            // Realiza la conversión usando las tasas de cambio
            result = this.exchangeRates.convert(from, to, amount);
            rate = this.exchangeRates.getRate(from, to);
        }
        // Crea el objeto de conversión y lo guarda en el historial
        const conversion = new Conversion(from, to, amount, result, rate);
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
