class FooterComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <div class="footer-decoration">
        <img src="assets/footer-pattern.png" alt="" class="footer-pattern">
      </div>

      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Navegación</h3>
            <ul class="footer-links">
              <li><a href="index.html">Conversor de Divisas</a></li>
              <li><a href="history.html">Historial de Conversiones</a></li>
              <li><a href="index.html#converter">Ir al Conversor</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h3>Recursos</h3>
            <ul class="footer-links">
              <li><a href="https://www.xe.com/" target="_blank" rel="noopener noreferrer">XE - Tasas de Cambio</a></li>
              <li><a href="https://www.oanda.com/currency-converter/" target="_blank" rel="noopener noreferrer">OANDA - Conversor</a></li>
              <li><a href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" target="_blank" rel="noopener noreferrer">Banco Central Europeo</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h3>Información</h3>
            <ul class="footer-links">
              <li><a href="https://es.wikipedia.org/wiki/Tipo_de_cambio" target="_blank" rel="noopener noreferrer">¿Qué es el tipo de cambio?</a></li>
              <li><a href="https://www.banrep.gov.co/es/estadisticas/trm" target="_blank" rel="noopener noreferrer">TRM - Banco de la República</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2025 Conversor de Divisas. Todos los derechos reservados.</p>
        </div>
      </footer>
    `;
    }
}
customElements.define('app-footer', FooterComponent);
export {};
