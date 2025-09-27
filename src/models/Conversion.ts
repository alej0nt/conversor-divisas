import { Currency } from "./Currency.js";
import { Transaction } from "./Transaction.js";

export class Conversion extends Transaction {
    private result: number;
    private date: string;

    constructor(from: Currency, to: Currency, amount: number, result: number = 0) {
        super(from, to, amount); // llamamos al constructor de la clase base
        this.result = result;
        this.date = new Date().toLocaleString();
    }

    public getResult(): number {
        return this.result;
    }

    public getDate(): string {
        return this.date;
    }

    public setResult(result: number): void {
        this.result = result;
    }

    public setDate(date: string): void {
        this.date = date;
    }

    public toJSON(): object {
        return {
            from: this.fromCurrency,
            to: this.toCurrency,
            amount: this.amount,
            result: this.result,
            date: this.date,
        };
    }

    public static fromJSON(data: any): Conversion {
        const conv = new Conversion(new Currency(data.from), new Currency(data.to), data.amount, data.result);
        conv.setDate(data.date);
        return conv;
    }
}
