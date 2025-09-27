/**
 * Representa una moneda con su código ISO, nombre y símbolo.
 * Ejemplo: USD - Dólar estadounidense - $
 */
export class Currency {
    /**
     * Constructor que inicializa una moneda con sus datos básicos.
     * @param code Código ISO de la moneda.
     * @param name Nombre de la moneda.
     * @param symbol Símbolo de la moneda.
     */
    constructor(code, name, symbol) {
        this.code = code;
        this.name = name;
        this.symbol = symbol;
    }
    /**
     * Devuelve un nombre de presentación de la moneda.
     * Formato: "símbolo - nombre (código)".
     * Ejemplo: "$ - Dólar estadounidense (USD)".
     */
    getDisplayName() {
        return `${this.symbol} - ${this.name} (${this.code})`;
    }
    /**
     * Compara si dos monedas son iguales según su código ISO.
     * @param other Otra moneda a comparar.
     * @returns true si tienen el mismo código, false en caso contrario.
     */
    isEqual(other) {
        return this.code === other.code;
    }
    /** Devuelve el código de la moneda (ej: "USD").*/
    getCode() {
        return this.code;
    }
    /**Devuelve el nombre completo de la moneda (ej: "Euro").*/
    getName() {
        return this.name;
    }
    /** Devuelve el símbolo de la moneda (ej: "€") */
    getSymbol() {
        return this.symbol;
    }
}
