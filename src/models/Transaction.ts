import { Currency } from "./Currency.js";

/**
 * Clase base que representa una transacción entre dos divisas.
 * Esta clase guarda la información básica de cualquier operación:
 * la moneda de origen, la moneda de destino y la cantidad.
 */
export class Transaction {
  // Moneda desde la cual se parte en la transacción
  protected fromCurrency: Currency;

  // Moneda hacia la cual se convierte en la transacción
  protected toCurrency: Currency;

  // Cantidad de dinero a convertir
  protected amount: number;

  /**
   * Constructor:
   * @param from Moneda de origen.
   * @param to Moneda de destino.
   * @param amount Cantidad que se desea convertir.
   */
  constructor(from: Currency, to: Currency, amount: number) {
    this.fromCurrency = from;
    this.toCurrency = to;
    this.amount = amount;
  }

  /**
   * Devuelve la moneda de origen de la transacción.
   * @returns Moneda de origen.
   */
  public getFromCurrency(): Currency {
    return this.fromCurrency;
  }

  /**
   * Devuelve la moneda de destino de la transacción.
   * @returns Moneda de destino.
   */
  public getToCurrency(): Currency {
    return this.toCurrency;
  }

  /**
   * Devuelve la cantidad de dinero a convertir.
   * @returns Cantidad de la transacción.
   */
  public getAmount(): number {
    return this.amount;
  }
}
