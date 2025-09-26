import { Currency } from "./Currency.js";
export class ExchangeRate {
    constructor(rates) {
        this.rates = rates;
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
}
