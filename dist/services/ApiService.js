import { API_CONFIG } from '../config/api.config.js';
export class ApiService {
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
}
