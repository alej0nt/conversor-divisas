import { Currency } from "./Currency.js";

export class Convertion {
    private fromCurrency: string;
    private toCurrency: string;
    private ammount: number;
    private result: number;
    private date: string;

    constructor(fromCurrency: Currency, toCurrency: Currency, ammount: number, result: number = 0) {
        this.fromCurrency = fromCurrency.getName();
        this.toCurrency = toCurrency.getName();
        this.ammount = ammount;
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
    public getAmmount(): number {
        return this.ammount;
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
        this.ammount = ammount;
    }
    public setResult(result: number): void {
        this.result = result;
    }
    public setDate(date: string): void {
        this.date = date;
    }
}
