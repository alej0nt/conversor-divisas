import { Currency } from "./Currency.js";
export class Transaction {
    constructor(from, to, amount) {
        this.fromCurrency = from.getName();
        this.toCurrency = to.getName();
        this.amount = amount;
    }
    getFromCurrency() {
        return this.fromCurrency;
    }
    getToCurrency() {
        return this.toCurrency;
    }
    getAmount() {
        return this.amount;
    }
}
