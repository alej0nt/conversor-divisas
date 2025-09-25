import { convertion } from "./models/convertion";
// Variables relacionadas a la conversión
let amount = document.getElementById("amount") as HTMLInputElement;
let fromCurrency = document.getElementById("from-currency") as HTMLSelectElement;
let toCurrency = document.getElementById("to-currency") as HTMLSelectElement;
let convertedAmmount = document.getElementById("converted-amount") as HTMLElement;
let tableHistory = document.getElementById("history-list") as HTMLElement;

type Currency = "USD" | "EUR" | "MXN" | "GBP";

let conversionHistory: convertion[] = [];

// ESTO SE LLAMARA CON EL API DESPUES
const exchangeRates: Record<Currency, Record<Currency, number>> = {
  USD: { USD: 1, EUR: 0.85, MXN: 18.5, GBP: 0.75 },
  EUR: { USD: 1.18, EUR: 1, MXN: 21.76, GBP: 0.88 },
  MXN: { USD: 0.054, MXN: 1, EUR: 0.046, GBP: 0.04 },
  GBP: { USD: 1.33, EUR: 1.14, MXN: 25.0, GBP: 1 },
};

function fillCurrencySelectors(): void {
  Object.keys(exchangeRates).forEach(currency => {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency;
    optionFrom.textContent = currency;
    fromCurrency.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = currency;
    optionTo.textContent = currency;
    toCurrency.appendChild(optionTo);
  });
}
fillCurrencySelectors();

function convertCurrency(): void {
  const amountNumber: number = parseFloat(amount.value);
  const fromCurrencyValue: Currency = fromCurrency.value as Currency;
  const toCurrencyValue: Currency = toCurrency.value as Currency;

  if (!amountNumber || isNaN(amountNumber) || amountNumber <= 0) {
    alert("Por favor, introduce una cantidad válida.");
    return;
  }

  if (fromCurrencyValue === toCurrencyValue) {
    alert("Las divisas deben ser diferentes.");
    return;
  }

  const rate: number = exchangeRates[fromCurrencyValue][toCurrencyValue];
  const result: number = amountNumber * rate;

  convertedAmmount.textContent = result.toFixed(2);

  saveToHistory(fromCurrencyValue, toCurrencyValue, amountNumber, result);
}

function changeCurrencies(): void {
  const fromCurrencyTemp: string = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = fromCurrencyTemp;

  convertCurrency();
}

function saveToHistory(
  fromCurrency: string,
  toCurrency: string,
  amount: number,
  result: number
): void {
  const item: HistoryItem = {
    fromCurrency,
    toCurrency,
    amount,
    result,
    date: new Date().toLocaleString(),
  };
  conversionHistory.push(item);
  addToTable(item);
}

function renderHistory(): void {
  tableHistory.innerHTML = "";
  conversionHistory.forEach(item => {
    addToTable(item);
  });
}

function addToTable(item: HistoryItem): void {
  const row = document.createElement("tr");

  const dateCell = document.createElement("td");
  dateCell.textContent = item.date;

  const fromCell = document.createElement("td");
  fromCell.textContent = item.fromCurrency;

  const toCell = document.createElement("td");
  toCell.textContent = item.toCurrency;

  const amountCell = document.createElement("td");
  amountCell.textContent = item.amount.toString();

  const resultCell = document.createElement("td");
  resultCell.textContent = item.result.toFixed(2);

  row.appendChild(dateCell);
  row.appendChild(fromCell);
  row.appendChild(toCell);
  row.appendChild(amountCell);
  row.appendChild(resultCell);

  tableHistory.appendChild(row);
}

function deleteHistory(): void {
  conversionHistory = [];
  renderHistory();
}

document.addEventListener("DOMContentLoaded", () => {
  const convertBtn = document.getElementById("convertBtn");
  const changeBtn = document.getElementById("swapBtn");
  const clearBtn = document.getElementById("clearHistoryBtn");

  convertBtn?.addEventListener("click", convertCurrency);
  changeBtn?.addEventListener("click", changeCurrencies);
  clearBtn?.addEventListener("click", deleteHistory);
});
