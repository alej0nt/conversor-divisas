import { API_CONFIG } from '../config/api.config.js';

export interface CurrencyDetails {
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    code: string;
    name_plural: string;
    type?: string;
}

interface CurrencyApiResponse {
    data: Record<string, CurrencyDetails>;
}

interface ExchangeRateApiResponse {
    data: Record<string, number>;
}

export class ApiService {
    /**
     * Obtiene todas las monedas disponibles desde la API
     */
    static async getAvailableCurrencies(): Promise<CurrencyApiResponse> {
        try {
            const url = `${API_CONFIG.URL}/currencies?apikey=${API_CONFIG.KEY}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json() as CurrencyApiResponse;
            return data;
        } catch(error) {
            console.error('Error fetching currencies:', error);
            throw error;
        }
    }

    /**
     * Obtiene las tasas de cambio para una moneda base específica
     * @param baseCurrency Código de la moneda base (ej: "USD")
     */
    static async getExchangeRates(baseCurrency: string): Promise<ExchangeRateApiResponse> {
        try {
            const url = `${API_CONFIG.URL}/latest?apikey=${API_CONFIG.KEY}&base_currency=${baseCurrency}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json() as ExchangeRateApiResponse;
            return data;
        } catch(error) {
            console.error('Error fetching exchange rates:', error);
            throw error;
        }
    }
}