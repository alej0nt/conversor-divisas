import { Currency } from "../models/Currency.js";
import { Conversion } from "../models/Conversion.js";
import { ExchangeRate } from "../models/ExchangeRate.js";
const HISTORY_KEY = "currency_history_v1";
export class CurrencyService {
    constructor() {
        const rates = {
            USD: { USD: 1, EUR: 0.85, MXN: 18.5, GBP: 0.75 },
            EUR: { USD: 1.18, EUR: 1, MXN: 21.76, GBP: 0.88 },
            MXN: { USD: 0.054, MXN: 1, EUR: 0.046, GBP: 0.04 },
            GBP: { USD: 1.33, EUR: 1.14, MXN: 25.0, GBP: 1 },
        };
        this.exchangeRates = new ExchangeRate(rates);
        this.history = [];
        this.loadHistoryFromStorage();
    }
    getRates() {
        return this.exchangeRates;
    }
    convert(from, to, amount) {
        const rate = this.exchangeRates.getRate(from, to);
        const result = amount * rate;
        const conversion = new Conversion(from, to, amount, result);
        return conversion;
    }
    addConversionToHistory(conversion) {
        this.history.push(conversion);
        this.saveHistoryToStorage();
    }
    clearHistory() {
        this.history = [];
        localStorage.removeItem(HISTORY_KEY);
    }
    getHistory() {
        return this.history;
    }
    saveHistoryToStorage() {
        const plain = this.history.map(c => ({
            from: c.getFromCurrency(),
            to: c.getToCurrency(),
            amount: c.getAmount(),
            result: c.getResult(),
            date: c.getDate(),
        }));
        localStorage.setItem(HISTORY_KEY, JSON.stringify(plain));
    }
    loadHistoryFromStorage() {
        const json = localStorage.getItem(HISTORY_KEY);
        if (!json)
            return;
        const arr = JSON.parse(json);
        this.history = arr.map(item => {
            const conv = new Conversion(new Currency(item.from), new Currency(item.to), item.amount, item.result);
            conv.setDate(item.date);
            return conv;
        });
    }
}
