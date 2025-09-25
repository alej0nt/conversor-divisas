// Variables relacionadas a la conversión
let amount = document.getElementById("amount");
let fromCurrency = document.getElementById("from-currency");
let toCurrency = document.getElementById("to-currency");
let convertedAmmount = document.getElementById("converted-amount");
let tableHistory = document.getElementById("history-list");
let conversionHistory = [];
// ESTO SE LLAMARA CON EL API DESPUES
const exchangeRates = {
    USD: { USD: 1, EUR: 0.85, MXN: 18.5, GBP: 0.75 },
    EUR: { USD: 1.18, EUR: 1, MXN: 21.76, GBP: 0.88 },
    MXN: { USD: 0.054, MXN: 1, EUR: 0.046, GBP: 0.04 },
    GBP: { USD: 1.33, EUR: 1.14, MXN: 25.0, GBP: 1 },
};
function fillCurrencySelectors() {
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
function convertCurrency() {
    const amountNumber = parseFloat(amount.value);
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;
    if (!amountNumber || isNaN(amountNumber) || amountNumber <= 0) {
        alert("Por favor, introduce una cantidad válida.");
        return;
    }
    if (fromCurrencyValue === toCurrencyValue) {
        alert("Las divisas deben ser diferentes.");
        return;
    }
    const rate = exchangeRates[fromCurrencyValue][toCurrencyValue];
    const result = amountNumber * rate;
    convertedAmmount.textContent = result.toFixed(2);
    saveToHistory(fromCurrencyValue, toCurrencyValue, amountNumber, result);
}
function changeCurrencies() {
    const fromCurrencyTemp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = fromCurrencyTemp;
    convertCurrency();
}
function saveToHistory(fromCurrency, toCurrency, amount, result) {
    const item = {
        fromCurrency,
        toCurrency,
        amount,
        result,
        date: new Date().toLocaleString(),
    };
    conversionHistory.push(item);
    addToTable(item);
}
function renderHistory() {
    tableHistory.innerHTML = "";
    conversionHistory.forEach(item => {
        addToTable(item);
    });
}
function addToTable(item) {
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
function deleteHistory() {
    conversionHistory = [];
    renderHistory();
}
document.addEventListener("DOMContentLoaded", () => {
    const convertBtn = document.getElementById("convertBtn");
    const changeBtn = document.getElementById("swapBtn");
    const clearBtn = document.getElementById("clearHistoryBtn");
    convertBtn === null || convertBtn === void 0 ? void 0 : convertBtn.addEventListener("click", convertCurrency);
    changeBtn === null || changeBtn === void 0 ? void 0 : changeBtn.addEventListener("click", changeCurrencies);
    clearBtn === null || clearBtn === void 0 ? void 0 : clearBtn.addEventListener("click", deleteHistory);
});
export {};
