import { Currency } from "./models/Currency.js";
import { Conversion } from "./models/Conversion.js";
import { History } from "./models/History.js";
import { CurrencyService } from "./services/CurrencyService.js";
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertedAmount = document.getElementById("converted-amount");
const tableHistory = document.getElementById("history-list");
let history = new History();
let service = new CurrencyService();
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
    history.addConversion(conversion);
    addToTable(conversion);
}
function changeCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
}
function clearHistory() {
    history.clear();
    tableHistory.innerHTML = "";
}
function addToTable(conversion) {
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
function addEventListeners() {
    var _a, _b, _c;
    (_a = document.getElementById("convertBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => convertCurrency());
    (_b = document.getElementById("swapBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => changeCurrencies());
    (_c = document.getElementById("clearHistoryBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => clearHistory());
}
fillCurrencySelectors();
addEventListeners();
