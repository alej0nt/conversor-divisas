import { Currency } from "./Currency.js";
export class Conversion {
    constructor(fromCurrency, toCurrency, ammount, result = 0) {
        this.fromCurrency = fromCurrency.getName();
        this.toCurrency = toCurrency.getName();
        this.amount = ammount;
        this.result = result;
        this.date = new Date().toLocaleString();
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
