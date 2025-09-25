import type { Convertion } from "./Convertion";

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