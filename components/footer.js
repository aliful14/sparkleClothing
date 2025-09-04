class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Determine if we're in a subdirectory (products folder)
        const isInProductsFolder = window.location.pathname.includes('/products/');
        const isInProductSubfolder = window.location.pathname.match(/\/products\/[^\/]+\//);
        const basePath = isInProductSubfolder ? '../../' : (isInProductsFolder ? '../' : '');
        
        this.innerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>Sparkle</h3>
                            <p>Premium RMG accessories for discerning brands.</p>
                        </div>
                        <div class="footer-section">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="${basePath}index.html">Home</a></li>
                                <li><a href="${basePath}about.html">About</a></li>
                                <li><a href="${basePath}products.html">Products</a></li>
                                <li><a href="${basePath}contact.html">Contact</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h4>Contact Info</h4>
                            <p>Email: <a href="mailto:info@sparklewear.co" class="footer-email-link">info@sparklewear.co</a></p>
                            <p>Phone: <a href="tel:+15197815998" class="footer-phone-link">+1 (519) 781-5998</a></p>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2025 Sparkle Clothing Company. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-component', Footer); 