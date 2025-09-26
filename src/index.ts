import { Currency } from "./models/Currency.js";
import { Conversion } from "./models/Conversion.js";
import { CurrencyService } from "./services/CurrencyService.js";

type CurrencyType = "USD" | "EUR" | "MXN" | "GBP";

const amount = document.getElementById("amount") as HTMLInputElement;
const fromCurrency = document.getElementById("from-currency") as HTMLSelectElement;
const toCurrency = document.getElementById("to-currency") as HTMLSelectElement;
const convertedAmount = document.getElementById("converted-amount") as HTMLElement;
const tableHistory = document.getElementById("history-list") as HTMLElement;

const service = new CurrencyService();

function fillCurrencySelectors(): void {
  const rates = service.getRates().getAllRates();
  (Object.keys(rates) as CurrencyType[]).forEach(currency => {
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

function convertCurrency(): void {
  const amountNumber = parseFloat(amount.value);
  const from = new Currency(fromCurrency.value);
  const to = new Currency(toCurrency.value);

  if (isNaN(amountNumber) || amountNumber <= 0) {
    alert("Por favor, introduce una cantidad válida.");
    return;
  }

  if (from.getName() === to.getName()) {
    alert("Las divisas deben ser diferentes.");
    return;
  }

  const conversion = service.convert(from, to, amountNumber);
  convertedAmount.textContent = conversion.getResult().toFixed(2);

  service.addConversionToHistory(conversion);
  addToTable(conversion);
}

function changeCurrencies(): void {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  convertCurrency();
}

function clearHistory(): void {
  service.clearHistory();
  tableHistory.innerHTML = "";
}

function addToTable(conversion: Conversion): void {
  const row = document.createElement("tr");

  const dateCell = document.createElement("td");
  dateCell.textContent = conversion.getDate();

  const fromCell = document.createElement("td");
  fromCell.textContent = conversion.getFromCurrency();

  const toCell = document.createElement("td");
  toCell.textContent = conversion.getToCurrency();

  const amountCell = document.createElement("td");
  amountCell.textContent = conversion.getAmount().toFixed(2);

  const resultCell = document.createElement("td");
  resultCell.textContent = conversion.getResult().toFixed(2);

  row.appendChild(dateCell);
  row.appendChild(fromCell);
  row.appendChild(toCell);
  row.appendChild(amountCell);
  row.appendChild(resultCell);

  tableHistory.appendChild(row);
}

function addEventListeners(): void {
  document.getElementById("convertBtn")?.addEventListener("click", () => convertCurrency());
  document.getElementById("swapBtn")?.addEventListener("click", () => changeCurrencies());
  document.getElementById("clearHistoryBtn")?.addEventListener("click", () => clearHistory());
}

fillCurrencySelectors();
addEventListeners();