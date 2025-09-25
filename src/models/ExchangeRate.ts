import type { Currency } from "./Currency";

export class ExchangeRate {
  private rates: Record<string, Record<string, number>>;

  constructor(rates: Record<string, Record<string, number>>) {
    this.rates = rates;
  }

  public getRate(from: Currency, to: Currency): number {
    const fromKey = from.getName();
    const toKey = to.getName();

    if (!this.rates[fromKey] || this.rates[fromKey][toKey] === undefined) {
      throw new Error(`No existe tasa de cambio de ${fromKey} a ${toKey}`);
    }

    return this.rates[fromKey][toKey];
  }
}