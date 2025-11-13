import { APIFREECURRENCY_CONFIG, FRANKFURTER_CONFIG } from '../config/api.config.js';
export class ApiService {
    /**
     * Obtiene todas las monedas disponibles desde la API
     */
    static async getAvailableCurrencies() {
        try {
            const url = `${APIFREECURRENCY_CONFIG.URL}/currencies?apikey=${APIFREECURRENCY_CONFIG.KEY}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching currencies:', error);
            throw error;
        }
    }
    /**
     * Obtiene las tasas de cambio para una moneda base específica
     * @param baseCurrency Código de la moneda base (ej: "USD")
     */
    static async getExchangeRates(baseCurrency) {
        try {
            const url = `${APIFREECURRENCY_CONFIG.URL}/latest?apikey=${APIFREECURRENCY_CONFIG.KEY}&base_currency=${baseCurrency}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching exchange rates:', error);
            throw error;
        }
    }
    /**
     * Obtiene la tasa de cambio histórica para una fecha y moneda base con referencia a otra moneda
     * Se usa otra API distinta (Frankfurter porque es gratuita el historial)
     */
    static async fetchLast7DaysRates(baseCurrency, toCurrency) {
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - 8); // Restar 8 días para obtener el rango de 7 días
        // Formatear fechas como YYYY-MM-DD
        const startDate = daysAgo.toISOString().split('T')[0];
        const url = `${FRANKFURTER_CONFIG.URL}/${startDate}..?base=${baseCurrency}&symbols=${toCurrency}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching last 7 days rates:', error);
            throw error;
        }
    }
}
