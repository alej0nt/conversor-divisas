import { currency } from "./currency";

export class convertion {
    private fromCurrency: currency;
    private toCurrency: currency;
    private ammount: number;
    private result: number;
    private date: string;

    constructor(fromCurrency: currency, toCurrency: currency, ammount: number, result: number = 0) {
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
        this.ammount = ammount;
        this.result = result;
        this.date = new Date().toLocaleString();
    }

    public convertCurrency(fromCurrency:currency, toCurrency:currency, ammount:number, result:number): number {
        const from = this.fromCurrency;
        const to = this.toCurrency;

        if (from === to) {
            throw new Error("Las divisas deben ser diferentes.");
        }
        const rate = exchangeRates[from]?.[to];
        if (!rate) {
            throw new Error(`No existe tasa de conversión de ${from} a ${to}`);
        }

        this.result = this.ammount * rate;
        this.date = new Date().toLocaleString();

        return this.result;
    }

    // Getters
    public getFromCurrency(): currency {
        return this.fromCurrency;
    }
    public getToCurrency(): currency {
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
    public setFromCurrency(fromCurrency: currency): void {
        this.fromCurrency = fromCurrency;
    }
    public setToCurrency(toCurrency: currency): void {
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
