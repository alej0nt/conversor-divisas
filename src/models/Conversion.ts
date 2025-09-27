import { Currency } from "./Currency.js";
import { Transaction } from "./Transaction.js";

/**
 * Representa una conversión de divisas.
 * Extiende de Transaction (que ya guarda las monedas origen, destino y monto)
 */
export class Conversion extends Transaction {
  // Resultado numérico de la conversión.
  private result: number;

  // Fecha y hora en que se realizó la conversión.
  private date: string;

  /**
   * Crea una nueva conversión de divisas.
   * @param from Moneda origen.
   * @param to Moneda destino.
   * @param amount Cantidad a convertir.
   * @param result Resultado inicial de la conversión (por defecto 0).
   */
  constructor(from: Currency, to: Currency, amount: number, result: number = 0) {
    super(from, to, amount);
    this.result = result;
    this.date = new Date().toLocaleString();
  }

  /** Devuelve el resultado de la conversión. */
  public getResult(): number {
    return this.result;
  }

  /** Devuelve la fecha en que se realizó la conversión. */
  public getDate(): string {
    return this.date;
  }

  /**
   * Permite actualizar el resultado de la conversión.
   * @param result Nuevo valor convertido.
   */
  public setResult(result: number): void {
    this.result = result;
  }

  /**
   * Permite actualizar la fecha de la conversión.
   * @param date Fecha en formato string.
   */
  public setDate(date: string): void {
    this.date = date;
  }

  /**
   * Convierte la conversión a un objeto JSON plano,
   * para guardar en almacenamiento local.
   */
  public toJSON(): object {
    return {
      from: this.fromCurrency,
      to: this.toCurrency,
      amount: this.amount,
      result: this.result,
      date: this.date,
    };
  }

  /**
   * Crea una instancia de Conversion a partir de un objeto JSON.
   * @param data Objeto con los datos de la conversión.
   * @returns Instancia de Conversion reconstruida.
   */
  public static fromJSON(data: any): Conversion {
    const from : Currency = new Currency(data.from.code, data.from.name, data.from.symbol);
    const to : Currency = new Currency(data.to.code, data.to.name, data.to.symbol);
    const conv : Conversion = new Conversion(from, to, data.amount, data.result);
    conv.setDate(data.date);
    return conv;
  }
}

