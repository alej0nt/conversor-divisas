/**
 * Representa una moneda con su código ISO, nombre y símbolo.
 * Ejemplo: USD - Dólar estadounidense - $
 */
export class Currency {
  // Código de la moneda
  private code: string;

  // Nombre completo de la moneda
  private name: string;

  // Símbolo usado para representar la moneda
  private symbol: string;

  /**
   * Constructor que inicializa una moneda con sus datos básicos.
   * @param code Código ISO de la moneda.
   * @param name Nombre de la moneda.
   * @param symbol Símbolo de la moneda.
   */
  constructor(code: string, name: string, symbol: string) {
    this.code = code;
    this.name = name;
    this.symbol = symbol;
  }

  /**
   * Devuelve un nombre de presentación de la moneda.
   * Formato: "símbolo - nombre (código)".
   * Ejemplo: "$ - Dólar estadounidense (USD)".
   */
  public getDisplayName(): string {
    return `${this.symbol} - ${this.name} (${this.code})`;
  }

  /**
   * Compara si dos monedas son iguales según su código ISO.
   * @param other Otra moneda a comparar.
   * @returns true si tienen el mismo código, false en caso contrario.
   */
  public isEqual(other: Currency): boolean {
    return this.code === other.code;
  }

  /** Devuelve el código de la moneda (ej: "USD").*/
  public getCode(): string {
    return this.code;
  }

  /**Devuelve el nombre completo de la moneda (ej: "Euro").*/
  public getName(): string {
    return this.name;
  }

  /** Devuelve el símbolo de la moneda (ej: "€") */
  public getSymbol(): string {
    return this.symbol;
  }
}