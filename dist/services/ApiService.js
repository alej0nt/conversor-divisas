import { API_CONFIG } from '../config/api.config.js';
export class ApiService {
    /**
     * Obtiene todas las monedas disponibles desde la API
     */
    static async getAvailableCurrencies() {
        try {
            const url = `${API_CONFIG.URL}/currencies?apikey=${API_CONFIG.KEY}`;
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
            const url = `${API_CONFIG.URL}/latest?apikey=${API_CONFIG.KEY}&base_currency=${baseCurrency}`;
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
}
