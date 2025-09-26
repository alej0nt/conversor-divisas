import { Currency } from "./Currency.js";

export class Conversion {
    private fromCurrency: string;
    private toCurrency: string;
    private amount: number;
    private result: number;
    private date: string;

    constructor(fromCurrency: Currency, toCurrency: Currency, ammount: number, result: number = 0) {
        this.fromCurrency = fromCurrency.getName();
        this.toCurrency = toCurrency.getName();
        this.amount = ammount;
        this.result = result;
        this.date = new Date().toLocaleString();
    }

    // Getters
    public getFromCurrency(): string {
        return this.fromCurrency;
    }
    public getToCurrency(): string {
        return this.toCurrency;
    }
    public getAmount(): number {
        return this.amount;
    }
    public getResult(): number {
        return this.result;
    }
    public getDate(): string {
        return this.date;
    }

    // Setters
    public setFromCurrency(fromCurrency: string): void {
        this.fromCurrency = fromCurrency;
    }
    public setToCurrency(toCurrency: string): void {
        this.toCurrency = toCurrency;
    }
    public setAmmount(ammount: number): void {
        this.amount = ammount;
    }
    public setResult(result: number): void {
        this.result = result;
    }
    public setDate(date: string): void {
        this.date = date;
    }
}
