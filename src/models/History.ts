import { Convertion } from "./Convertion.js";

export class History {
    private items: Convertion[];
    constructor() {
        this.items = [];
    }
    public addConvertion(convertion: Convertion): void {
        this.items.push(convertion);
    }
    public clear(): void {
        this.items = [];
    }

    public getAll(): Convertion[] {
        return this.items;
    }
}