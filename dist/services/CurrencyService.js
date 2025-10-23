/**
 * Servicio central del conversor de divisas.
 * Maneja las tasas de cambio desde la API, las monedas disponibles y el historial de conversiones.
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
        const description = "Tasas de cambio desde API";
        this.exchangeRates = new ExchangeRate(description);
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
            throw error;
        }
    }
    /**
     * Obtiene las tasas de cambio para una moneda base desde la API
     * @param baseCurrency Código de la moneda base
     */
    async loadExchangeRates(baseCurrency) {
        try {
            // Verificar si ya tenemos las tasas en cache y son válidas
            if (this.exchangeRates.isCacheValid(baseCurrency)) {
                return;
            }
            const response = await ApiService.getExchangeRates(baseCurrency);
            if (response === null || response === void 0 ? void 0 : response.data) {
                this.exchangeRates.updateRates(baseCurrency, response.data);
            }
        }
        catch (error) {
            console.error('Error loading exchange rates:', error);
            throw error;
        }
    }
    /**
     * Realiza una conversión entre dos monedas y guarda el resultado en historial.
     * Si se proporciona una tasa personalizada, la usa; de lo contrario, consulta la API.
     */
    async convert(from, to, amount, exchangeRateCustom) {
        let result;
        let rate;
        if (exchangeRateCustom && exchangeRateCustom > 0) {
            // Usar tasa personalizada
            result = amount * exchangeRateCustom;
            rate = exchangeRateCustom;
        }
        else {
            // Intentar obtener la tasa del cache
            let cachedRate = this.exchangeRates.getRateFromCache(from, to);
            if (cachedRate === null) {
                // Si no está en cache o expiró, cargar desde la API
                await this.loadExchangeRates(from.getCode());
                cachedRate = this.exchangeRates.getRateFromCache(from, to);
                if (cachedRate === null) {
                    throw new Error(`No se pudo obtener la tasa de cambio de ${from.getCode()} a ${to.getCode()}`);
                }
            }
            rate = cachedRate;
            result = amount * rate;
        }
        // Crea el objeto de conversión y lo guarda en el historial
        const conversion = new Conversion(from, to, amount, result, rate);
        this.history.unshift(conversion);
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
     * Limpia el cache de tasas de cambio
     */
    clearRatesCache() {
        this.exchangeRates.clearCache();
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
        try {
            this.history = JSON.parse(json).map((item) => Conversion.fromJSON(item));
        }
        catch (error) {
            console.error('Error loading history from storage:', error);
            this.history = [];
        }
    }
}
