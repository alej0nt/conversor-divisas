import { API_CONFIG } from '../config/api.config.js';

export interface CurrencyDetails {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

interface CurrencyApiResponse {
  data: Record<string, CurrencyDetails>;
}


export class ApiService {
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

}