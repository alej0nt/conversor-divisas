import { Currency } from "./Currency.js";
export class Conversion {
    constructor(fromCurrency, toCurrency, ammount, result = 0) {
        this.fromCurrency = fromCurrency.getName();
        this.toCurrency = toCurrency.getName();
        this.amount = ammount;
        this.result = result;
        this.date = new Date().toLocaleString();
    }
    toJSON() {
        return {
            from: this.fromCurrency,
            to: this.toCurrency,
            amount: this.amount,
            result: this.result,
            date: this.date,
        };
    }
    static fromJSON(data) {
        const conv = new Conversion(new Currency(data.from), new Currency(data.to), data.amount, data.result);
        conv.setDate(data.date);
        return conv;
    }
    // Getters
    getFromCurrency() {
        return this.fromCurrency;
    }
    getToCurrency() {
        return this.toCurrency;
    }
    getAmount() {
        return this.amount;
    }
    getResult() {
        return this.result;
    }
    getDate() {
        return this.date;
    }
    // Setters
    setFromCurrency(fromCurrency) {
        this.fromCurrency = fromCurrency;
    }
    setToCurrency(toCurrency) {
        this.toCurrency = toCurrency;
    }
    setAmmount(ammount) {
        this.amount = ammount;
    }
    setResult(result) {
        this.result = result;
    }
    setDate(date) {
        this.date = date;
    }
}
