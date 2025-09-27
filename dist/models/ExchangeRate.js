import { Currency } from "./Currency.js";
export class ExchangeRate {
    constructor(rates, description) {
        this.rates = rates;
        this.description = description;
        this.lastUpdated = new Date().toLocaleString();
    }
    getRate(from, to) {
        const fromKey = from.getName();
        const toKey = to.getName();
        if (!this.rates[fromKey] || this.rates[fromKey][toKey] === undefined) {
            throw new Error(`No existe tasa de cambio de ${fromKey} a ${toKey}`);
        }
        return this.rates[fromKey][toKey];
    }
    getAllRates() {
        return this.rates;
    }
    getLastUpdated() {
        return this.lastUpdated;
    }
    convert(from, to, amount) {
        const rate = this.getRate(from, to);
        return amount * rate;
    }
}
