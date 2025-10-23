export class HistoricalRate {
    constructor(date, fromCurrency, toCurrency, rate) {
        this.date = date;
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
        this.rate = rate;
    }
    /**
     * Retorna la fecha de la tasa histórica.
     */
    getDate() {
        return this.date;
    }
    /**
     * Retorna la moneda origen.
     */
    getFromCurrency() {
        return this.fromCurrency;
    }
    /**
     * Retorna la moneda destino.
     */
    getToCurrency() {
        return this.toCurrency;
    }
    /**
     * Retorna la tasa de cambio histórica.
     */
    getRate() {
        return this.rate;
    }
}
