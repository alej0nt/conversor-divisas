import { Currency } from "./Currency.js";

/**
 * Clase que maneja las tasas de cambio entre diferentes divisas.
 * Aquí se guardan los valores de conversión y se ofrece la lógica
 * para consultar y aplicar esas tasas.
 */
export class ExchangeRate {
  // Objeto que guarda las tasas de conversión entre pares de monedas
  private rates: Record<string, Record<string, number>>;

  // Descripción de las tasas de cambio
  private description: string;

  // Fecha y hora de la última actualización de las tasas
  private lastUpdated: string;

  /**
   * Constructor
   * @param rates Objeto con las tasas de cambio entre divisas.
   * @param description Texto descriptivo de las tasas cargadas.
   */
  constructor(rates: Record<string, Record<string, number>>, description: string) {
    this.rates = rates;
    this.description = description;
    this.lastUpdated = new Date().toLocaleString();
  }

  /**
   * Obtiene la tasa de conversión entre dos monedas.
   * @param from Moneda de origen.
   * @param to Moneda de destino.
   * @returns La tasa de conversión numérica.
   * @throws Error si no existe la tasa entre esas dos divisas.
   */
  public getRate(from: Currency, to: Currency): number {
    const fromKey: string = from.getCode();
    const toKey: string = to.getCode();

    if (!this.rates[fromKey] || this.rates[fromKey][toKey] === undefined) {
      throw new Error(`No existe tasa de cambio de ${fromKey} a ${toKey}`);
    }

    return this.rates[fromKey][toKey];
  }

  /**
  * Convierte una cantidad de dinero desde una divisa a otra
  * usando la tasa correspondiente.
  * @param from Moneda de origen.
  * @param to Moneda de destino.
  * @param amount Cantidad a convertir.
  * @returns El valor convertido.
  */
  public convert(from: Currency, to: Currency, amount: number): number {
    const rate: number = this.getRate(from, to);
    return amount * rate;
  }

  /**
   * Devuelve todas las tasas de conversión disponibles.
   * @returns Objeto con todas las tasas de cambio.
   */
  public getAllRates(): Record<string, Record<string, number>> {
    return this.rates;
  }

  /**
   * Devuelve la fecha y hora de la última actualización de las tasas.
   * @returns Fecha en formato string.
   */
  public getLastUpdated(): string {
    return this.lastUpdated;
  }
}
