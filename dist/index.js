var _a, _b;
import { Currency } from "./models/Currency.js";
import { CurrencyService } from "./services/CurrencyService.js";
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertedAmount = document.getElementById("converted-amount");
const service = new CurrencyService();
function fillCurrencySelectors() {
    const rates = service.getRates().getAllRates();
    Object.keys(rates).forEach(currency => {
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
function convertCurrency() {
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
function changeCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
}
(_a = document.getElementById("convertBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => convertCurrency());
(_b = document.getElementById("swapBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => changeCurrencies());
fillCurrencySelectors();
