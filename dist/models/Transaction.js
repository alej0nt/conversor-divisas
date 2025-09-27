import { Currency } from "./Currency.js";
/**
 * Clase base que representa una transacción entre dos divisas.
 * Esta clase guarda la información básica de cualquier operación:
 * la moneda de origen, la moneda de destino y la cantidad.
 */
export class Transaction {
    /**
     * Constructor:
     * @param from Moneda de origen.
     * @param to Moneda de destino.
     * @param amount Cantidad que se desea convertir.
     */
    constructor(from, to, amount) {
        this.fromCurrency = from;
        this.toCurrency = to;
        this.amount = amount;
    }
    /**
     * Devuelve la moneda de origen de la transacción.
     * @returns Moneda de origen.
     */
    getFromCurrency() {
        return this.fromCurrency;
    }
    /**
     * Devuelve la moneda de destino de la transacción.
     * @returns Moneda de destino.
     */
    getToCurrency() {
        return this.toCurrency;
    }
    /**
     * Devuelve la cantidad de dinero a convertir.
     * @returns Cantidad de la transacción.
     */
    getAmount() {
        return this.amount;
    }
}
