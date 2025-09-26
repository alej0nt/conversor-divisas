import { Currency } from "../models/Currency.js";
import { Conversion } from "../models/Conversion.js";
import { ExchangeRate } from "../models/ExchangeRate.js";

type CurrencyType = "USD" | "EUR" | "MXN" | "GBP";

export class CurrencyService {
    private exchangeRates: ExchangeRate;

    constructor() {
        const rates: Record<CurrencyType, Record<CurrencyType, number>> = {
            USD: { USD: 1, EUR: 0.85, MXN: 18.5, GBP: 0.75 },
            EUR: { USD: 1.18, EUR: 1, MXN: 21.76, GBP: 0.88 },
            MXN: { USD: 0.054, MXN: 1, EUR: 0.046, GBP: 0.04 },
            GBP: { USD: 1.33, EUR: 1.14, MXN: 25.0, GBP: 1 },
        };

        this.exchangeRates = new ExchangeRate(rates);
    }

    public getRates(): ExchangeRate {
        return this.exchangeRates;
    }

    public convert(from: Currency, to: Currency, amount: number): Conversion {
        const rate = this.exchangeRates.getRate(from, to);
        const result = amount * rate;
        return new Conversion(from, to, amount, result);
    }
}
