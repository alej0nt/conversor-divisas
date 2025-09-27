import { Currency } from "./Currency.js";

export class Transaction {
    protected fromCurrency: string;
    protected toCurrency: string;
    protected amount: number;

    constructor(from: Currency, to: Currency, amount: number) {
        this.fromCurrency = from.getName();
        this.toCurrency = to.getName();
        this.amount = amount;
    }

    public getFromCurrency(): string {
        return this.fromCurrency;
    }

    public getToCurrency(): string {
        return this.toCurrency;
    }

    public getAmount(): number {
        return this.amount;
    }
}
