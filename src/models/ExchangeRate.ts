import { Currency } from "./Currency.js";

/**
 * Clase que maneja las tasas de cambio entre diferentes divisas.
 * Ahora soporta tasas dinámicas desde la API.
 */
export class ExchangeRate {
    // Cache de tasas de cambio por moneda base
    private ratesCache: Map<string, Record<string, number>>;

    // Descripción de las tasas de cambio
    private description: string;

    // Fecha y hora de la última actualización de las tasas
    private lastUpdated: string;

    // Tiempo de vida del cache en milisegundos (30 minutos por defecto)
    private cacheTTL: number = 30 * 60 * 1000;

    // Timestamp de la última actualización del cache
    private cacheTimestamp: Map<string, number>;

    constructor(description: string = "Tasas de cambio desde API") {
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
    public updateRates(baseCurrency: string, rates: Record<string, number>): void {
        this.ratesCache.set(baseCurrency, rates);
        this.cacheTimestamp.set(baseCurrency, Date.now());
        this.lastUpdated = new Date().toLocaleString();
    }

    /**
     * Verifica si el cache para una moneda base está vigente
     * @param baseCurrency Código de la moneda base
     */
    public isCacheValid(baseCurrency: string): boolean {
        const timestamp = this.cacheTimestamp.get(baseCurrency);
        if (!timestamp) return false;
        return (Date.now() - timestamp) < this.cacheTTL;
    }

    /**
     * Obtiene la tasa de conversión entre dos monedas del cache
     * @param from Moneda de origen
     * @param to Moneda de destino
     * @returns La tasa de conversión numérica o null si no está en cache
     */
    public getRateFromCache(from: Currency, to: Currency): number | null {
        const fromKey = from.getCode();
        const toKey = to.getCode();

        // Si las monedas son iguales, la tasa es 1
        if (fromKey === toKey) return 1;

        const rates = this.ratesCache.get(fromKey);
        if (!rates || !this.isCacheValid(fromKey)) {
            return null;
        }

        return rates[toKey] ?? null;
    }

    /**
     * Obtiene todas las tasas almacenadas en cache
     */
    public getAllCachedRates(): Map<string, Record<string, number>> {
        return this.ratesCache;
    }

    /**
     * Devuelve la fecha y hora de la última actualización de las tasas
     */
    public getLastUpdated(): string {
        return this.lastUpdated;
    }

    /**
     * Limpia el cache de tasas de cambio
     */
    public clearCache(): void {
        this.ratesCache.clear();
        this.cacheTimestamp.clear();
    }
}