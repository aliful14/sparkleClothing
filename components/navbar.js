class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Determine if we're in a subdirectory (products folder)
        const isInProductsFolder = window.location.pathname.includes('/products/');
        const basePath = isInProductsFolder ? '../' : '';
        
        this.innerHTML = `
            <nav>
                <div class="logo">
                    <a href="${basePath}index.html">Sparkle</a>
                </div>
                <ul class="nav-links">
                    <li><a href="${basePath}index.html">Home</a></li>
                    <li><a href="${basePath}about.html">About</a></li>
                    <li><a href="${basePath}products.html">Products</a></li>
                    <li><a href="${basePath}contact.html">Contact</a></li>
                </ul>
                <div class="burger">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
            </nav>
        `;

        // Add mobile menu functionality
        const burger = this.querySelector('.burger');
        const nav = this.querySelector('.nav-links');
        
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
}

customElements.define('navbar-component', Navbar); 