import { Currency } from "./Currency.js";
import { Transaction } from "./Transaction.js";
export class Conversion extends Transaction {
    constructor(from, to, amount, result = 0) {
        super(from, to, amount); // llamamos al constructor de la clase base
        this.result = result;
        this.date = new Date().toLocaleString();
    }
    getResult() {
        return this.result;
    }
    getDate() {
        return this.date;
    }
    setResult(result) {
        this.result = result;
    }
    setDate(date) {
        this.date = date;
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
}
