export class History {
    constructor() {
        this.items = [];
    }
    addConvertion(convertion) {
        this.items.push(convertion);
    }
    clear() {
        this.items = [];
    }
    getAll() {
        return this.items;
    }
}
