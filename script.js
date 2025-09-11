//Variables relacionadas a la conversión
let amount;
let fromCurrency;
let toCurrency;
let conversionRate;
let convertedAmmount;
let conversionHistory = [];
let conversionDate;

function convertCurrency (fromCurrency, toCurrency){
    let result = fromCurrency * toCurrency;
    saveConversionToHistory(result);
    return result;
}

function saveToHistory(result){
    conversionHistory.push(result);
}

function getHistory(){
    +
}

function deleteHistory(){
    conversionHistory.splice();
}