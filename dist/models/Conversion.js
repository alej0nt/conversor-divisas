import { Currency } from "./Currency.js";
import { Transaction } from "./Transaction.js";
/**
 * Representa una conversión de divisas.
 * Extiende de Transaction (que ya guarda las monedas origen, destino y monto)
 */
export class Conversion extends Transaction {
    /**
     * Crea una nueva conversión de divisas.
     * @param from Moneda origen.
     * @param to Moneda destino.
     * @param amount Cantidad a convertir.
     * @param result Resultado inicial de la conversión (por defecto 0).
     */
    constructor(from, to, amount, result = 0, rate) {
        super(from, to, amount);
        this.result = result;
        this.date = new Date().toLocaleString();
        this.rate = rate;
    }
    /** Devuelve el resultado de la conversión. */
    getResult() {
        return this.result;
    }
    /** Devuelve la fecha en que se realizó la conversión. */
    getDate() {
        return this.date;
    }
    /** Devuelve la tasa de cambio personalizada (si existe). */
    getRate() {
        return this.rate;
    }
    /**
     * Permite actualizar el resultado de la conversión.
     * @param result Nuevo valor convertido.
     */
    setResult(result) {
        this.result = result;
    }
    /**
     * Permite actualizar la fecha de la conversión.
     * @param date Fecha en formato string.
     */
    setDate(date) {
        this.date = date;
    }
    /**
     * Convierte la conversión a un objeto JSON plano,
     * para guardar en almacenamiento local.
     */
    toJSON() {
        return {
            from: this.fromCurrency,
            to: this.toCurrency,
            amount: this.amount,
            result: this.result,
            date: this.date,
            rate: this.rate
        };
    }
    /**
     * Crea una instancia de Conversion a partir de un objeto JSON.
     * @param data Objeto con los datos de la conversión.
     * @returns Instancia de Conversion reconstruida.
     */
    static fromJSON(data) {
        const from = new Currency(data.from.code, data.from.name, data.from.symbol);
        const to = new Currency(data.to.code, data.to.name, data.to.symbol);
        const conv = new Conversion(from, to, data.amount, data.result, data.rate);
        conv.setDate(data.date);
        return conv;
    }
}
