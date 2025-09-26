import { Currency } from "./models/Currency.js";
import { CurrencyService } from "./services/CurrencyService.js";

const amount = document.getElementById("amount") as HTMLInputElement;
const fromCurrency = document.getElementById("from-currency") as HTMLSelectElement;
const toCurrency = document.getElementById("to-currency") as HTMLSelectElement;
const convertedAmount = document.getElementById("converted-amount") as HTMLElement;

const service = new CurrencyService();

function fillCurrencySelectors(): void {
  const rates = service.getRates().getAllRates();
  (Object.keys(rates) as string[]).forEach(currency => {
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
}

function changeCurrencies(): void {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  convertCurrency();
}

document.getElementById("convertBtn")?.addEventListener("click", () => convertCurrency());
document.getElementById("swapBtn")?.addEventListener("click", () => changeCurrencies());

fillCurrencySelectors();
