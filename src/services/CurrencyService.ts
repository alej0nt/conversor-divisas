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
const HISTORY_KEY: string = "conversion_history";

export class CurrencyService {
    /**
     * Objeto con las tasas de cambio.
     */
    private exchangeRates: ExchangeRate;

    /**
     * Lista con el historial de conversiones realizadas.
     */
    private history: Conversion[];

    /**
     * Monedas que el usuario puede usar en el conversor.
     */
    private availableCurrencies: Currency[] = [];

    constructor() {
        const description = "Tasas de cambio desde API";
        this.exchangeRates = new ExchangeRate(description);
        this.history = [];
        this.loadHistoryFromStorage();
    }

    /**
     * Retorna el objeto con todas las tasas de cambio.
     */
    public getRates(): ExchangeRate {
        return this.exchangeRates;
    }

    /**
     * Retorna todas las monedas disponibles.
     */
    public getAvailableCurrencies(): Currency[] {
        return this.availableCurrencies;
    }

    /**
     * Carga las monedas disponibles desde el ApiService y las almacena en memoria.
     */
    public async loadAvailableCurrencies(): Promise<void> {
        try {
            const response = await ApiService.getAvailableCurrencies();
            if (response?.data) {
                this.availableCurrencies = Object.entries(response.data).map(([code, details]) => {
                    return new Currency(
                        code,
                        details.name,
                        details.symbol
                    );
                });
            }
        } catch (error) {
            console.error('Error fetching available currencies:', error);
            throw error;
        }
    }

    /**
     * Obtiene las tasas de cambio para una moneda base desde la API
     * @param baseCurrency Código de la moneda base
     */
    public async loadExchangeRates(baseCurrency: string): Promise<void> {
        try {
            // Verificar si ya tenemos las tasas en cache y son válidas
            if (this.exchangeRates.isCacheValid(baseCurrency)) {
                return;
            }

            const response = await ApiService.getExchangeRates(baseCurrency);
            if (response?.data) {
                this.exchangeRates.updateRates(baseCurrency, response.data);
            }
        } catch (error) {
            console.error('Error loading exchange rates:', error);
            throw error;
        }
    }

    /**
     * Obtiene las tasas de cambio de los últimos 7 días entre dos monedas.
     */
    public static async getLastWeekRates(fromCurrency: string, toCurrency: string): Promise<Array<{ date: string, rate: number }>> {
        try {
            const data = await ApiService.fetchLast7DaysRates(fromCurrency, toCurrency);

            // Transforma los datos en el formato esperado de {date, rate} ej: [{date: "2025-10-10", rate: 0.85}, ...]
            return Object.entries(data.rates).map(([date, ratesObj]) => ({
                date,
                rate: ratesObj[toCurrency]!
            }));

        } catch (error) {
            console.error('Error fetching last week rates:', error);
            throw error;
        }
    }

    /**
     * Realiza una conversión entre dos monedas y guarda el resultado en historial.
     * Si se proporciona una tasa personalizada, la usa; de lo contrario, consulta la API.
     */
    public async convert(from: Currency, to: Currency, amount: number, exchangeRateCustom?: number): Promise<Conversion> {
        let result: number;
        let rate: number;

        if (exchangeRateCustom && exchangeRateCustom > 0) {
            // Usar tasa personalizada
            result = amount * exchangeRateCustom;
            rate = exchangeRateCustom;
        } else {
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
        const conversion: Conversion = new Conversion(from, to, amount, result, rate);
        this.history.unshift(conversion);
        this.saveHistoryToStorage();
        return conversion;
    }

    /**
     * Limpia el historial de conversiones y lo borra de localStorage.
     */
    public clearHistory(): void {
        this.history = [];
        localStorage.removeItem(HISTORY_KEY);
    }

    /**
     * Retorna el historial de conversiones en memoria.
     */
    public getHistory(): Conversion[] {
        return this.history;
    }

    /**
     * Limpia el cache de tasas de cambio
     */
    public clearRatesCache(): void {
        this.exchangeRates.clearCache();
    }

    /**
     * Guarda el historial actual en localStorage.
     */
    private saveHistoryToStorage(): void {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history.map((c: Conversion) => c.toJSON())));
    }

    /**
     * Carga el historial desde localStorage (si existe).
     */
    private loadHistoryFromStorage(): void {
        const json: string | null = localStorage.getItem(HISTORY_KEY);
        if (!json) return;
        try {
            this.history = JSON.parse(json).map((item: any) => Conversion.fromJSON(item));
        } catch (error) {
            console.error('Error loading history from storage:', error);
            this.history = [];
        }
    }
}