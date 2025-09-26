import { Conversion } from "./Conversion.js";

export class History {
    private items: Conversion[];
    constructor() {
        this.items = [];
    }
    public addConversion(conversion: Conversion): void {
        this.items.push(conversion);
    }
    public clear(): void {
        this.items = [];
    }

    public getAll(): Conversion[] {
        return this.items;
    }
}