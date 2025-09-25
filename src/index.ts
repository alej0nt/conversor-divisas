import { Currency } from "./models/Currency.js";
import { ExchangeRate } from "./models/ExchangeRate.js";
import { Convertion } from "./models/Convertion.js";
import { History } from "./models/History.js";

type CurrencyType = "USD" | "EUR" | "MXN" | "GBP";

export class CurrencyConverterApp {
  private amount = document.getElementById("amount") as HTMLInputElement;
  private fromCurrency = document.getElementById("from-currency") as HTMLSelectElement;
  private toCurrency = document.getElementById("to-currency") as HTMLSelectElement;
  private convertedAmount = document.getElementById("converted-amount") as HTMLElement;
  private tableHistory = document.getElementById("history-list") as HTMLElement;

  private history = new History();
  private exchangeRates: ExchangeRate;

  constructor() {
    console.log("Currency Converter App initialized");
    const rates: Record<CurrencyType, Record<CurrencyType, number>> = {
      USD: { USD: 1, EUR: 0.85, MXN: 18.5, GBP: 0.75 },
      EUR: { USD: 1.18, EUR: 1, MXN: 21.76, GBP: 0.88 },
      MXN: { USD: 0.054, MXN: 1, EUR: 0.046, GBP: 0.04 },
      GBP: { USD: 1.33, EUR: 1.14, MXN: 25.0, GBP: 1 },
    };

    this.exchangeRates = new ExchangeRate(rates);

    this.fillCurrencySelectors();
    this.addEventListeners();
  }

  private fillCurrencySelectors(): void {
    console.log(this.exchangeRates);
    (Object.keys(this.exchangeRates["rates"]) as CurrencyType[]).forEach(currency => {
      const optionFrom = document.createElement("option");
      optionFrom.value = currency;
      optionFrom.textContent = currency;
      this.fromCurrency.appendChild(optionFrom);

      const optionTo = document.createElement("option");
      optionTo.value = currency;
      optionTo.textContent = currency;
      this.toCurrency.appendChild(optionTo);
    });
  }

  private convertCurrency(): void {
    const amountNumber = parseFloat(this.amount.value);
    const from = new Currency(this.fromCurrency.value);
    const to = new Currency(this.toCurrency.value);

    if (!amountNumber || isNaN(amountNumber) || amountNumber <= 0) {
      alert("Por favor, introduce una cantidad válida.");
      return;
    }

    if (from.getName() === to.getName()) {
      alert("Las divisas deben ser diferentes.");
      return;
    }

    const rate = this.exchangeRates.getRate(from, to);
    const result = amountNumber * rate;

    this.convertedAmount.textContent = result.toFixed(2);

    const conversion = new Convertion(from, to, amountNumber, result);
    this.history.addConvertion(conversion);
    this.addToTable(conversion);
  }

  private changeCurrencies(): void {
    const temp = this.fromCurrency.value;
    this.fromCurrency.value = this.toCurrency.value;
    this.toCurrency.value = temp;
    this.convertCurrency();
  }

  private clearHistory(): void {
    this.history.clear();
    this.tableHistory.innerHTML = "";
  }

  private addToTable(conversion: Convertion): void {
    const row = document.createElement("tr");

    const dateCell = document.createElement("td");
    dateCell.textContent = conversion.getDate(); // Ya es string, no uses .toLocaleString()

    const fromCell = document.createElement("td");
    fromCell.textContent = conversion.getFromCurrency();

    const toCell = document.createElement("td");
    toCell.textContent = conversion.getToCurrency();

    const amountCell = document.createElement("td");
    amountCell.textContent = conversion.getAmmount().toFixed(2);

    const resultCell = document.createElement("td");
    resultCell.textContent = conversion.getResult().toFixed(2);

    row.appendChild(dateCell);
    row.appendChild(fromCell);
    row.appendChild(toCell);
    row.appendChild(amountCell);
    row.appendChild(resultCell);

    this.tableHistory.appendChild(row);
  }

  private addEventListeners(): void {
    document.getElementById("convertBtn")?.addEventListener("click", () => this.convertCurrency());
    document.getElementById("swapBtn")?.addEventListener("click", () => this.changeCurrencies());
    document.getElementById("clearHistoryBtn")?.addEventListener("click", () => this.clearHistory());
  }
}

// Iniciar app
document.addEventListener("DOMContentLoaded", () => {
  new CurrencyConverterApp();
});