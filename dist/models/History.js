import { Conversion } from "./Conversion.js";
export class History {
    constructor() {
        this.items = [];
    }
    addConversion(conversion) {
        this.items.push(conversion);
    }
    clear() {
        this.items = [];
    }
    getAll() {
        return this.items;
    }
}
