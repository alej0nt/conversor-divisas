class NavbarComponent extends HTMLElement {
    connectedCallback() {
        const active = this.getAttribute('active') || '';
        this.innerHTML = `
      <nav class="navbar">
        <div class="navbar-content">
          <div class="navbar-brand">
            <a href="/" class="navbar-logo-link">
              <img src="assets/logo.png" alt="Logo de la aplicación" class="navbar-logo">
              <span class="navbar-title">Conversor de Divisas</span>
            </a>
          </div>
          <div class="navbar-links">
            <a href="converter.html" class="nav-link ${active === 'converter' ? 'active' : ''}">
              <img src="assets/converter-icon.png" alt="Conversor">
              <span>Conversor</span>
            </a>
            <a href="history.html" class="nav-link ${active === 'history' ? 'active' : ''}">
              <img src="assets/history-icon.png" alt="Historial">
              <span>Historial</span>
            </a>
            <a href="about.html" class="nav-link ${active === 'about' ? 'active' : ''}">
              <span>ℹ️ Sobre Nosotros</span>
            </a>
          </div>
        </div>
      </nav>
    `;
    }
}
customElements.define('app-navbar', NavbarComponent);
export {};
