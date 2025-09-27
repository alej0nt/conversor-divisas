import { Currency } from "./Currency.js";

export class ExchangeRate {
    private rates: Record<string, Record<string, number>>;
    private description: string;
    private lastUpdated: string;

    constructor(rates: Record<string, Record<string, number>>, description: string) {
        this.rates = rates;
        this.description = description;
        this.lastUpdated = new Date().toLocaleString();
    }

    public getRate(from: Currency, to: Currency): number {
        const fromKey = from.getName();
        const toKey = to.getName();

        if (!this.rates[fromKey] || this.rates[fromKey][toKey] === undefined) {
            throw new Error(`No existe tasa de cambio de ${fromKey} a ${toKey}`);
        }

        return this.rates[fromKey][toKey];
    }

    public getAllRates(): Record<string, Record<string, number>> {
        return this.rates;
    }

    public getLastUpdated(): string {
        return this.lastUpdated;
    }

    public convert(from: Currency, to: Currency, amount: number): number {
        const rate = this.getRate(from, to);
        return amount * rate;
    }
}