import { CurrencyService } from './services/CurrencyService.js';
import './components/components.js'

declare const Chart: any;

function getQueryParam(name: string): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}


async function renderChart() {
    const fromCurrency = getQueryParam('from');
    const toCurrency = getQueryParam('to');

    if (!fromCurrency || !toCurrency) {
        alert('No se especificaron monedas para el histórico.');
        return;
    }

    const historicalRates = await CurrencyService.getLastWeekRates(fromCurrency, toCurrency);

    const ctx = document.getElementById('historicalChart') as HTMLCanvasElement;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: historicalRates.map(r => r.date),
            datasets: [{
                label: `${fromCurrency} a ${toCurrency}`,
                data: historicalRates.map(r => r.rate),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
    });
}

renderChart();