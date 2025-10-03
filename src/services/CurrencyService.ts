/**
 * Servicio central del conversor de divisas.
 * Maneja las tasas de cambio, las monedas disponibles y el historial de conversiones.
 */

import { Currency } from "../models/Currency.js";
import { Conversion } from "../models/Conversion.js";
import { ExchangeRate } from "../models/ExchangeRate.js";

/**
 * Clave usada para guardar el historial en localStorage.
 */
const HISTORY_KEY: string = "conversion_history";

export class CurrencyService {
  /**
   * Objeto con las tasas de cambio.
   */
  private exchangeRates: ExchangeRate;

  /**
   * Lista con el historial de conversiones realizadas.
   */
  private history: Conversion[];

  /**
   * Monedas que el usuario puede usar en el conversor.
   */
  private availableCurrencies: Currency[];

  constructor() {
    const description = "Tasas de cambio actuales en el año 2025";

    // Inicializamos las tasas de cambio
    this.exchangeRates = new ExchangeRate({
      USD: { USD: 1, EUR: 0.85, MXN: 18.5, GBP: 0.75 },
      EUR: { USD: 1.18, EUR: 1, MXN: 21.76, GBP: 0.88 },
      MXN: { USD: 0.054, MXN: 1, EUR: 0.046, GBP: 0.04 },
      GBP: { USD: 1.33, EUR: 1.14, MXN: 25.0, GBP: 1 },
    }, description);

    this.history = [];

    // Catálogo de monedas disponibles en el conversor
    this.availableCurrencies = [
      new Currency("USD", "Dólar estadounidense", "$"),
      new Currency("EUR", "Euro", "€"),
      new Currency("MXN", "Peso mexicano", "MX$"),
      new Currency("GBP", "Libra esterlina", "£"),
    ];

    this.loadHistoryFromStorage();
  }

  /**
   * Retorna el objeto con todas las tasas de cambio.
   */
  public getRates(): ExchangeRate {
    return this.exchangeRates;
  }

  /**
   * Retorna todas las monedas disponibles.
   */
  public getAvailableCurrencies(): Currency[] {
    return this.availableCurrencies;
  }

  /**
   * Realiza una conversión entre dos monedas y guarda el resultado en historial.
   */
  public convert(from: Currency, to: Currency, amount: number, exchangeRateCustom: number): Conversion {
    let result: number;
    let rate: number;

    if (exchangeRateCustom && exchangeRateCustom > 0) {
      result = amount * exchangeRateCustom;
      rate = exchangeRateCustom;
    } else {
      // Realiza la conversión usando las tasas de cambio
      result = this.exchangeRates.convert(from, to, amount);
      rate = this.exchangeRates.getRate(from, to);
    }


    // Crea el objeto de conversión y lo guarda en el historial
    const conversion: Conversion = new Conversion(from, to, amount, result, rate);
    this.history.push(conversion);
    this.saveHistoryToStorage();
    return conversion;
  }

  /**
   * Limpia el historial de conversiones y lo borra de localStorage.
   */
  public clearHistory(): void {
    this.history = [];
    localStorage.removeItem(HISTORY_KEY);
  }

  /**
   * Retorna el historial de conversiones en memoria.
   */
  public getHistory(): Conversion[] {
    return this.history;
  }

  /**
   * Guarda el historial actual en localStorage.
   */
  private saveHistoryToStorage(): void {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history.map((c: Conversion) => c.toJSON())));
  }

  /**
   * Carga el historial desde localStorage (si existe).
   */
  private loadHistoryFromStorage(): void {
    const json: string | null = localStorage.getItem(HISTORY_KEY);
    if (!json) return;
    // Convierte cada objeto JSON en una instancia de Conversion
    this.history = JSON.parse(json).map((item: any) => Conversion.fromJSON(item));
  }
}
