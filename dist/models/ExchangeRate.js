import { Currency } from "./Currency.js";
/**
 * Clase que maneja las tasas de cambio entre diferentes divisas.
 * Ahora soporta tasas dinámicas desde la API.
 */
export class ExchangeRate {
    constructor(description = "Tasas de cambio desde API") {
        // Tiempo de vida del cache en milisegundos (30 minutos por defecto)
        this.cacheTTL = 30 * 60 * 1000;
        this.ratesCache = new Map();
        this.cacheTimestamp = new Map();
        this.description = description;
        this.lastUpdated = new Date().toLocaleString();
    }
    /**
     * Actualiza las tasas de cambio para una moneda base específica
     * @param baseCurrency Código de la moneda base
     * @param rates Objeto con las tasas de cambio
     */
    updateRates(baseCurrency, rates) {
        this.ratesCache.set(baseCurrency, rates);
        this.cacheTimestamp.set(baseCurrency, Date.now());
        this.lastUpdated = new Date().toLocaleString();
    }
    /**
     * Verifica si el cache para una moneda base está vigente
     * @param baseCurrency Código de la moneda base
     */
    isCacheValid(baseCurrency) {
        const timestamp = this.cacheTimestamp.get(baseCurrency);
        if (!timestamp)
            return false;
        return (Date.now() - timestamp) < this.cacheTTL;
    }
    /**
     * Obtiene la tasa de conversión entre dos monedas del cache
     * @param from Moneda de origen
     * @param to Moneda de destino
     * @returns La tasa de conversión numérica o null si no está en cache
     */
    getRateFromCache(from, to) {
        var _a;
        const fromKey = from.getCode();
        const toKey = to.getCode();
        // Si las monedas son iguales, la tasa es 1
        if (fromKey === toKey)
            return 1;
        const rates = this.ratesCache.get(fromKey);
        if (!rates || !this.isCacheValid(fromKey)) {
            return null;
        }
        return (_a = rates[toKey]) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Obtiene todas las tasas almacenadas en cache
     */
    getAllCachedRates() {
        return this.ratesCache;
    }
    /**
     * Devuelve la fecha y hora de la última actualización de las tasas
     */
    getLastUpdated() {
        return this.lastUpdated;
    }
    /**
     * Limpia el cache de tasas de cambio
     */
    clearCache() {
        this.ratesCache.clear();
        this.cacheTimestamp.clear();
    }
}
