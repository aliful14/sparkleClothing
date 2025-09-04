// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const phone = formData.get('phone');
        const product = formData.get('product');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you within 24 hours.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.type === 'submit') return; // Don't animate form submit buttons
        
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .value-card, .team-member, .category-card, .product-detail-card, .contact-card, .faq-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form field focus effects
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add CSS for form focus effects
const formStyle = document.createElement('style');
formStyle.textContent = `
    .form-group {
        position: relative;
    }
    
    .form-group.focused label {
        color: #1a1a1a;
        font-weight: 600;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        border-color: #1a1a1a;
        box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
    }
`;
document.head.appendChild(formStyle);

// Product Tab Functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    console.log('Initializing tabs...', {
        tabButtons: tabButtons.length,
        tabPanes: tabPanes.length
    });
    
    if (tabButtons.length === 0) {
        console.log('No tab buttons found - not on products page');
        return;
    }
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    console.log('Tab event listeners attached successfully');
}

function switchTab(targetTab) {
    console.log('Switching to tab:', targetTab);
    
    // Remove active class from all buttons and panes
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    
    // Add active class to target button and pane
    const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
    const targetPane = document.getElementById(targetTab);
    
    if (targetButton && targetPane) {
        targetButton.classList.add('active');
        targetPane.classList.add('active');
        
        console.log('Tab switched successfully to:', targetTab);
    } else {
        console.error('Tab or pane not found:', targetTab);
    }
}

// Product Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('productSearch');
    const clearButton = document.getElementById('clearSearch');
    const searchResults = document.getElementById('searchResults');
    const resultsCount = document.getElementById('resultsCount');
    const searchResultsList = document.getElementById('searchResultsList');
    
    console.log('Initializing search...', {
        searchInput: !!searchInput,
        clearButton: !!clearButton,
        searchResults: !!searchResults,
        resultsCount: !!resultsCount,
        searchResultsList: !!searchResultsList
    });
    
    if (!searchInput) {
        console.log('Search input not found - not on products page');
        return; // Exit if not on products page
    }
    
    // Product database - all products with their details
    const products = [
        // Labels
        { name: 'Woven Labels', description: 'Premium woven labels for brand identity', category: 'Labels', url: 'products/woven-labels/index.html', keywords: ['woven', 'label', 'brand', 'premium'] },
        { name: 'Satin Labels', description: 'Smooth and elegant satin labels', category: 'Labels', url: 'products/satin-labels/index.html', keywords: ['satin', 'label', 'smooth', 'elegant'] },
        { name: 'Heat Transfer Labels', description: 'Durable heat transfer labels', category: 'Labels', url: 'products/heat-transfer-labels/index.html', keywords: ['heat', 'transfer', 'label', 'durable'] },
        { name: 'Canvas Labels', description: 'Rugged and durable canvas labels', category: 'Labels', url: 'products/canvas-labels/index.html', keywords: ['canvas', 'label', 'rugged', 'durable'] },
        
        // Tags
        { name: 'Hang Tags', description: 'Custom designed hang tags', category: 'Tags', url: 'products/hang-tags/index.html', keywords: ['hang', 'tag', 'custom', 'design'] },
        { name: 'Fabric Waist Tags', description: 'Comfortable waist tags', category: 'Tags', url: 'products/fabric-waist-tags/index.html', keywords: ['fabric', 'waist', 'tag', 'comfortable'] },
        
        // Patches
        { name: 'Fabric Patches', description: 'High-quality fabric patches', category: 'Patches', url: 'products/fabric-patches/index.html', keywords: ['fabric', 'patch', 'quality'] },
        { name: 'Leather Patches', description: 'Premium leather patches', category: 'Patches', url: 'products/leather-patches/index.html', keywords: ['leather', 'patch', 'premium'] },
        { name: 'PU Patches', description: 'Durable PU leather patches', category: 'Patches', url: 'products/pu-patches/index.html', keywords: ['pu', 'patch', 'leather', 'durable'] },
        { name: 'Jacron Patches', description: 'Eco-friendly leather alternative', category: 'Patches', url: 'products/jacron-patches/index.html', keywords: ['jacron', 'patch', 'eco', 'friendly'] },
        
        // Tapes
        { name: 'Herringbone Tape', description: 'Flat woven tape with pattern', category: 'Tapes', url: 'products/herringbone-tape/index.html', keywords: ['herringbone', 'tape', 'woven', 'pattern'] },
        { name: 'Polyester Tape', description: 'General-purpose trim tape', category: 'Tapes', url: 'products/polyester-tape/index.html', keywords: ['polyester', 'tape', 'trim', 'general'] },
        { name: 'Satin Tape', description: 'Smooth decorative tape for garment finishing', category: 'Tapes', url: 'products/satin-tape/index.html', keywords: ['satin', 'tape', 'decorative', 'finishing'] },
        { name: 'Reflective Tape', description: 'High-visibility safety tape for enhanced visibility', category: 'Tapes', url: 'products/reflective-tape/index.html', keywords: ['reflective', 'tape', 'safety', 'visibility'] },
        { name: 'Mobilon Tape', description: 'Specialized zipper and closure tape', category: 'Tapes', url: 'products/mobilon-tape/index.html', keywords: ['mobilon', 'tape', 'zipper', 'closure'] },
        { name: 'Velcro Tape', description: 'Hook and loop fastening tape', category: 'Tapes', url: 'products/velcro-tape/index.html', keywords: ['velcro', 'tape', 'hook', 'loop'] },
        { name: 'Velvet Tape', description: 'Luxurious velvet tape for premium applications', category: 'Tapes', url: 'products/velvet-tape/index.html', keywords: ['velvet', 'tape', 'luxury', 'premium'] },
        { name: 'Scotch Tape', description: 'Clear adhesive tape for general applications', category: 'Tapes', url: 'products/scotch-tape/index.html', keywords: ['scotch', 'tape', 'clear', 'adhesive'] },
        { name: 'Gum Tape', description: 'Water-activated tape for secure packaging', category: 'Tapes', url: 'products/gum-tape/index.html', keywords: ['gum', 'tape', 'water', 'packaging'] },
        
        // Cords & Elastics
        { name: 'Drawstring Cords', description: 'Premium drawstring cords', category: 'Cords & Elastics', url: 'products/drawstring-cords/index.html', keywords: ['drawstring', 'cord', 'premium'] },
        { name: 'Tube D. Cords', description: 'Tubular drawstring cords', category: 'Cords & Elastics', url: 'products/tube-cords/index.html', keywords: ['tube', 'cord', 'tubular', 'drawstring'] },
        { name: 'Plain Elastic', description: 'Quality plain elastic bands', category: 'Cords & Elastics', url: 'products/elastic-plain/index.html', keywords: ['plain', 'elastic', 'band', 'quality'] },
        { name: 'Jacket Elastic', description: 'Specialized jacket elastics', category: 'Cords & Elastics', url: 'products/jacket-elastic/index.html', keywords: ['jacket', 'elastic', 'specialized'] },
        { name: 'Waist Belts', description: 'Functional and decorative belts', category: 'Cords & Elastics', url: 'products/waist-belts/index.html', keywords: ['waist', 'belt', 'functional', 'decorative'] },
        
        // Stickers
        { name: 'Barcode Stickers', description: 'Durable barcode stickers for identification', category: 'Stickers', url: 'products/barcode-stickers/index.html', keywords: ['barcode', 'sticker', 'identification', 'durable'] },
        { name: 'Carton Stickers', description: 'Heavy-duty shipping and packaging stickers', category: 'Stickers', url: 'products/carton-stickers/index.html', keywords: ['carton', 'sticker', 'shipping', 'packaging'] },
        { name: 'Poly Stickers', description: 'Waterproof and durable labeling solutions', category: 'Stickers', url: 'products/poly-stickers/index.html', keywords: ['poly', 'sticker', 'waterproof', 'durable'] },
        { name: 'Thermal Stickers', description: 'Heat-sensitive labeling solutions', category: 'Stickers', url: 'products/thermal-stickers/index.html', keywords: ['thermal', 'sticker', 'heat', 'sensitive'] }
    ];
    
    let searchTimeout;
    
    // Search function
    function performSearch(query) {
        console.log('Performing search for:', query);
        const trimmedQuery = query.trim().toLowerCase();
        
        if (trimmedQuery === '') {
            console.log('Empty query, hiding results');
            hideSearchResults();
            return;
        }
        
        // Filter products based on search query
        const results = products.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(trimmedQuery);
            const descriptionMatch = product.description.toLowerCase().includes(trimmedQuery);
            const categoryMatch = product.category.toLowerCase().includes(trimmedQuery);
            const keywordMatch = product.keywords.some(keyword => keyword.includes(trimmedQuery));
            
            return nameMatch || descriptionMatch || categoryMatch || keywordMatch;
        });
        
        console.log('Search results:', results.length, 'products found');
        displaySearchResults(results, trimmedQuery);
    }
    
    // Display search results
    function displaySearchResults(results, query) {
        if (results.length === 0) {
            showNoResults(query);
            return;
        }
        
        resultsCount.textContent = `${results.length} product${results.length === 1 ? '' : 's'} found`;
        
        searchResultsList.innerHTML = results.map(product => {
            const highlightedName = highlightMatch(product.name, query);
            const highlightedDescription = highlightMatch(product.description, query);
            
            return `
                <a href="${product.url}" class="search-result-item">
                    <div class="search-result-content">
                        <div class="search-result-title">${highlightedName}</div>
                        <div class="search-result-description">${highlightedDescription}</div>
                    </div>
                    <span class="search-result-category">${product.category}</span>
                </a>
            `;
        }).join('');
        
        showSearchResults();
    }
    
    // Show no results state
    function showNoResults(query) {
        resultsCount.textContent = 'No products found';
        searchResultsList.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <div class="no-results-text">No products found for "${query}"</div>
                <div class="no-results-suggestion">Try searching with different keywords</div>
            </div>
        `;
        showSearchResults();
    }
    

    
    // Highlight matching text
    function highlightMatch(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        return text.replace(regex, '<mark style="background: #fff3cd; padding: 0 2px; border-radius: 2px;">$1</mark>');
    }
    
    // Escape special regex characters
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Show search results
    function showSearchResults() {
        searchResults.style.display = 'block';
        setTimeout(() => {
            searchResults.classList.add('show');
        }, 10);
    }
    
    // Hide search results
    function hideSearchResults() {
        searchResults.classList.remove('show');
        setTimeout(() => {
            if (!searchResults.classList.contains('show')) {
                searchResults.style.display = 'none';
            }
        }, 300);
    }
    
    // Event listeners
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        console.log('Search input event triggered:', query);
        
        // Show/hide clear button
        clearButton.style.display = query ? 'flex' : 'none';
        
        // Debounce search
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 150);
    });
    
    console.log('Search event listeners attached successfully');
    
    // Clear search
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        clearButton.style.display = 'none';
        hideSearchResults();
        searchInput.focus();
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.closest('.search-container').contains(e.target)) {
            hideSearchResults();
        }
    });
    
    // Show results when focusing search input with existing text
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim()) {
            performSearch(searchInput.value);
        }
    });
    
    // Keyboard navigation
    let selectedIndex = -1;
    
    searchInput.addEventListener('keydown', (e) => {
        const resultItems = searchResultsList.querySelectorAll('.search-result-item');
        
        if (e.key === 'Escape') {
            hideSearchResults();
            searchInput.blur();
            selectedIndex = -1;
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, resultItems.length - 1);
            updateSelectedResult(resultItems);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelectedResult(resultItems);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && resultItems[selectedIndex]) {
                // Navigate to selected result
                window.location.href = resultItems[selectedIndex].href;
            } else if (resultItems.length > 0) {
                // If no item is selected, go to first result
                window.location.href = resultItems[0].href;
            }
        }
    });
    
    // Update selected result styling
    function updateSelectedResult(resultItems) {
        // Remove previous selection
        resultItems.forEach(item => item.classList.remove('selected'));
        
        // Add selection to current item
        if (selectedIndex >= 0 && resultItems[selectedIndex]) {
            resultItems[selectedIndex].classList.add('selected');
            resultItems[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }
    
    // Reset selection when search changes
    searchInput.addEventListener('input', () => {
        selectedIndex = -1;
    });
    
    // Test function for debugging
    window.testSearch = function(query) {
        console.log('Testing search with query:', query);
        performSearch(query || 'satin');
    };
    
    console.log('Search initialization complete. You can test by typing in the search box or calling testSearch() in console.');
}

// Test function for tabs
window.testTab = function(tabName) {
    console.log('Testing tab switch to:', tabName);
    switchTab(tabName || 'labels');
};

// Product Detail Collapsible Functionality
function initializeProductCollapsible() {
    const productInfoSection = document.querySelector('.product-info-section');
    
    if (!productInfoSection) {
        console.log('No product info section found - not on individual product page');
        return;
    }
    
    console.log('Initializing product collapsible functionality...');
    
    // Wrap existing content in collapsible structure
    const existingContent = productInfoSection.innerHTML;
    
    // Find the product-cta section to keep it outside the collapsible content
    const ctaMatch = existingContent.match(/<div class="product-cta">[\s\S]*?<\/div>/);
    const ctaSection = ctaMatch ? ctaMatch[0] : '';
    const contentWithoutCta = existingContent.replace(ctaSection, '');
    
    // Get product name for attribute generation
    const productTitle = document.querySelector('.product-info-section h2');
    const productName = productTitle ? productTitle.textContent.trim() : '';
    
    // Generate attribute table
    const attributeTable = generateAttributeTable(productName);
    
    productInfoSection.innerHTML = `
        <div class="product-info-collapsible">
            <div class="product-info-content collapsed">
                ${contentWithoutCta}
            </div>
            <a href="#" class="see-more-link" onclick="toggleProductInfo(); return false;">
                <span class="see-more-text">More:</span>
                <span class="arrow">▼</span>
            </a>
            ${ctaSection}
        </div>
    `;
    
    // Add attribute table after the product detail grid
    const productDetailGrid = document.querySelector('.product-detail-grid');
    if (productDetailGrid) {
        productDetailGrid.insertAdjacentHTML('afterend', attributeTable);
    }
    
    console.log('Product collapsible structure and attribute table created');
}

// Generate attribute table based on product name
function generateAttributeTable(productName) {
    const productType = getProductType(productName);
    const attributes = getProductAttributes(productType, productName);
    
    if (!attributes || attributes.length === 0) {
        return ''; // Return empty if no attributes defined
    }
    
    let tableRows = '';
    attributes.forEach(attr => {
        tableRows += `
            <tr>
                <th>${attr.name}</th>
                <td>${attr.value}</td>
            </tr>
        `;
    });
    
    return `
        <div class="product-attributes">
            <div class="attributes-header">
                <h3>Product Attributes</h3>
            </div>
            <table class="attributes-table">
                ${tableRows}
            </table>
        </div>
    `;
}

// Determine product type from name
function getProductType(productName) {
    const name = productName.toLowerCase();
    
    if (name.includes('label')) return 'labels';
    if (name.includes('tag')) return 'tags';
    if (name.includes('patch')) return 'patches';
    if (name.includes('tape')) return 'tapes';
    if (name.includes('cord') || name.includes('elastic') || name.includes('belt')) return 'cords';
    if (name.includes('sticker')) return 'stickers';
    
    return 'general';
}

// Get attributes for specific product type using PDF data
function getProductAttributes(productType, productName) {
    const name = productName.toLowerCase();
    
    // Barcode Sticker Attributes (from PDF)
    if (name.includes('barcode') && name.includes('sticker')) {
        return [
            { name: 'Product Name', value: 'Barcode Sticker' },
            { name: 'Material', value: 'Coated/Uncoated Paper or PP/PET Film' },
            { name: 'Sticker Type', value: 'Barcode / Price Tag / Tracking Label' },
            { name: 'Technics', value: 'Printed (Thermal, Digital, Flexo)' },
            { name: 'Thickness / GSM', value: '60–80 GSM (paper) or 40–60 micron (film)' },
            { name: 'Design', value: 'Customized Layouts' },
            { name: 'Logo', value: 'Customer Logo / Brand Name (optional)' },
            { name: 'Color', value: 'Black & White or Multi-Color Options' },
            { name: 'Printing', value: 'Thermal Transfer, Inkjet, Digital Printing' },
            { name: 'Adhesive Strength', value: 'Permanent / Removable' },
            { name: 'Finish Type', value: 'Matte or Glossy (optional)' },
            { name: 'Custom Shape Support', value: 'Yes' },
            { name: 'Application Method', value: 'Peel & Stick (Self-Adhesive)' },
            { name: 'Temperature Resistance', value: '-10°C to +50°C' },
            { name: 'Water / Oil Resistance', value: 'Basic splash resistance' },
            { name: 'UV / Scratch Resistance', value: 'Moderate (lamination available for protection)' },
            { name: 'Roll / Sheet Options', value: 'Rolls or Sheets' },
            { name: 'Core Size', value: '1" or 3" (for rolls)' },
            { name: 'Shelf Life', value: '12 months (under proper storage)' },
            { name: 'Storage Conditions', value: 'Store in cool, dry place, away from sunlight' },
            { name: 'Usage', value: 'Garments, Logistics, Retail, Inventory Management' },
            { name: 'Packing Method', value: 'Rolls (1000 pcs/roll) or Sheets' },
            { name: 'Country of Origin', value: 'Bangladesh' },
            { name: 'MOQ', value: '5000 pcs' },
            { name: 'Bulk Order Discount', value: 'Available above 20,000 pcs' },
            { name: 'Sample Order Lead Time', value: '5–7 Days' },
            { name: 'Product Lead Time', value: '5000–20,000 pcs = 3–5Days 20,000+ pcs = 7–10 Days' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'FSC Certificate, ISO 9001' }
        ];
    }
    
    // Canvas Tape Label Attributes (from PDF)
    if (name.includes('canvas') && (name.includes('tape') || name.includes('label'))) {
        return [
            { name: 'Product Name', value: 'Canvas Tape Label' },
            { name: 'Material', value: 'Cotton/Canvas/Polyester' },
            { name: 'Label Type', value: 'Brand Label / Main Label / Size Label/ Care Label' },
            { name: 'Technics', value: 'Screen Print / Fluxo-Print/ off-set print' },
            { name: 'Feature', value: 'Durable / Textured / Eco-Friendly Option' },
            { name: 'Thickness / GSM', value: 'According to customer requirement (100 - 300 GSM Variable)' },
            { name: 'Design', value: 'Custom Logo and Shape' },
            { name: 'Color', value: 'Any Custom (DTM) Colors Available' },
            { name: 'Fold Type', value: 'Straight-Cut/ End-Fold/ Mid/Centre-Fold/ Angle-Fold/ According to customer, fold can be customized.' },
            { name: 'Backing Type', value: 'Sew On (Stitch), Iron-on, Customer Requirement' },
            { name: 'Wash Durability', value: 'Withstands 3-10 times wash (do some research)' },
            { name: 'Stitching Recommendations', value: 'Suitable for lock stitch, overlock, and bar tack' },
            { name: 'Custom Shape Support', value: 'Available (Die-cut and special shapes supported)' },
            { name: 'Texture / Finish', value: 'Natural, Matte, Textured, Rough, Smooth, Matte, Glossy' },
            { name: 'Printing', value: 'Silk Screen printing, rotary printing, fluxo printing, Digital printing, heat transfer printing' },
            { name: 'Edge', value: 'Straight-Cut/ End-Fold/ Mid/Centre-Fold/ Angle-Fold/ According to customer, fold can be customized.' },
            { name: 'Packing Method', value: 'As per customer requirement. This can be done in pieces (for example, 5000 pcs packet) or in dozens (500 dozen).' },
            { name: 'Storage Conditions', value: 'Store in a cool, dry place away from direct sunlight (Basically, keep in room temperature)' },
            { name: 'Country of Origin', value: 'Bangladesh' },
            { name: 'MOQ', value: '500 pcs' },
            { name: 'Bulk Order Discount', value: 'Available on orders above 3,000 pcs. 500 - 3000 pcs = similar per piece, 3000+ pcs = bulk discount' },
            { name: 'Sample Order Lead Time', value: '7-10 Days' },
            { name: 'Production Lead Time', value: '500 pcs - 3000 pcs - maximum 2 days, 3000+ pcs - Maximum 5-7 days (depends on quality)' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'OEKO-TEX® Standard 100, FSC Certificate' }
        ];
    }
    
    // Carton Sticker Attributes
    if (name.includes('carton') && name.includes('sticker')) {
        return [
            { name: 'Product Name', value: 'Carton Sticker' },
            { name: 'Material', value: 'Paper Sticker (Coated / Uncoated) or PP/PET Film' },
            { name: 'Sticker Type', value: 'Shipping / Handling / Branding Sticker' },
            { name: 'Technics', value: 'Printed (Flexo, Offset, Digital)' },
            { name: 'Thickness / GSM', value: '70–90 GSM (paper) / 40–60 micron (film)' },
            { name: 'Design', value: 'Customized (Company Logo, Product Info, Barcode, Handling Marks)' },
            { name: 'Logo', value: 'Customer Logo Printing Available' },
            { name: 'Color', value: 'Black & White / Multi-Color / Pantone Matching' },
            { name: 'Printing', value: 'Digital, Offset, Flexo Printing' },
            { name: 'Adhesive Strength', value: 'Strong Permanent Adhesive (Carton Surface)' },
            { name: 'Finish Type', value: 'Matte / Glossy Lamination (optional)' },
            { name: 'Custom Shape Support', value: 'Yes (Rectangular, Square, or Die-Cut)' },
            { name: 'Application Method', value: 'Peel & Stick (Self-Adhesive)' },
            { name: 'Temperature Resistance', value: '-20°C to +60°C' },
            { name: 'Water / Oil Resistance', value: 'Moisture & oil-resistant (film type)' },
            { name: 'UV / Scratch Resistance', value: 'High (lamination available)' },
            { name: 'Roll / Sheet Options', value: 'Rolls or Sheets' },
            { name: 'Core Size', value: '1" or 3" (for rolls)' },
            { name: 'Shelf Life', value: '18 months (under proper storage)' },
            { name: 'Storage Conditions', value: 'Store in cool, dry place, avoid moisture' },
            { name: 'Usage', value: 'Carton Box Branding, Shipping, Barcodes, Handling Marks' },
            { name: 'Packing Method', value: 'Rolls or Sheets (as per customer requirement)' },
            { name: 'Country of Origin', value: 'Bangladesh' },
            { name: 'MOQ', value: '5000 pcs' },
            { name: 'Bulk Order Discount', value: 'Available on orders above 20,000 pcs' },
            { name: 'Sample Order Lead Time', value: '5–7 Days' },
            { name: 'Product Lead Time', value: '5000–20,000 pcs = 3–5Days 20,000+ pcs = 7–10 Days' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'FSC Certificate, ISO 9001' }
        ];
    }
    
    // Drawstring Cord Attributes (from PDF)
    if (name.includes('drawstring') || name.includes('cord')) {
        return [
            { name: 'Product Name', value: 'Drawstring Cord' },
            { name: 'Name', value: 'Drawstring Cord' },
            { name: 'Material', value: 'Cotton/ Polyester/ Leather' },
            { name: 'Label Type', value: 'Cord / String Trim' },
            { name: 'Technics', value: 'Braided, Woven Flat, Knitted, Screen Printing, Silicone Printing' },
            { name: 'Feature', value: 'Durable / Flexible / Washable / Eco-Friendly Options Available' },
            { name: 'Design', value: 'Any customer design' },
            { name: 'Logo', value: 'Tips (Metal Tips) Print ( According to customer requirement)' },
            { name: 'Keyword', value: 'Drawcord / Hoodie Cord / Garment String' },
            { name: 'Pattern', value: 'Solid / Mixed / Patterned' },
            { name: 'Shape', value: 'Round / Flat / Tubular' },
            { name: 'Fold Type', value: 'Not Applicable' },
            { name: 'Color', value: 'Any DTM yarn dye colour (According to customer requirement)' },
            { name: 'Size', value: 'Custom Length and Diameter' },
            { name: 'Usage', value: 'Hoodies / Joggers / Shorts / Bags' },
            { name: 'Printing', value: 'Tip Print / No Print (Optional Branding)' },
            { name: 'Edge', value: 'Metal Tip / Plastic Tip / Silicone Ending' },
            { name: 'Place of Origin', value: 'Bangladesh' },
            { name: 'Brand Name', value: 'Custom' },
            { name: 'Model Number', value: '011' },
            { name: 'MOQ (Minimum Order)', value: '500 piece - 3000 piece / 500 yards - 3000 yards' },
            { name: 'Sample Order Lead Time', value: '14 days' },
            { name: 'Product Lead Time', value: '500 - 3000 piece = 3 weeks, 500 - 3000 yards = 3 weeks, 3000+ piece = 3 weeks, 3000+ yards = 3 weeks' },
            { name: 'Price', value: 'Based on type, material, and tip customization' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'OEKO-TEX' },
            { name: 'Backing', value: 'Not Applicable' },
            { name: 'Tip Type Options', value: 'Plastic / Metal / Molded / Custom Logo Aglet' },
            { name: 'Wash Fastness', value: 'Colorfast up to 60°C (Confirm based on material used)' },
            { name: 'Abrasion Resistance', value: 'High Resistance (Suitable for activewear and frequent use)' },
            { name: 'Elasticity', value: 'Non-Stretch / Slight Stretch (Specify if stretch yarn is used)' },
            { name: 'Biodegradability Option (DO RESEARCH)', value: 'Available for Cotton / Recycled Yarn Blends (Confirm eco options)' },
            { name: 'Packaging Format', value: 'In pieces or in yards' }
        ];
    }
    
    // Fabric Patch Attributes (from PDF)
    if (name.includes('fabric') && name.includes('patch')) {
        return [
            { name: 'Product Name', value: 'Fabric Patch' },
            { name: 'Material', value: 'Cotton / Canvas / Felt, Cotton /Polyester / Nylon blends' },
            { name: 'Label Type', value: 'Any type of patch' },
            { name: 'Technics', value: 'Sew-on, woven, Embroidery, Appliqué, printed' },
            { name: 'Feature', value: 'Durable / Customizable / Eco Options' },
            { name: 'Design', value: 'Any Customer Design' },
            { name: 'Color', value: 'Any DTM Colour' },
            { name: 'Shape', value: 'Any Customer shape' },
            { name: 'Custom Shape Support', value: 'Any customer shape' },
            { name: 'Edge', value: 'Die Cut, Laser Cut' },
            { name: 'Backing', value: 'Sewing Thread Attached' },
            { name: 'Thickness / GSM', value: '120 - 180 (According to customer requirement)' },
            { name: 'Wash Durability', value: 'Withstands 30+ wash cycles and dry cleaning' },
            { name: 'UV / Weather Resistance', value: 'Suitable for outdoor use with UV and weather resistant options' },
            { name: 'Packing Method', value: 'In 1000 pieces or in dozens. (According to customer requirement)' },
            { name: 'Storage Conditions', value: 'Store in a cool, dry place away from direct sunlight' },
            { name: 'Country of Origin', value: 'Bangladesh' },
            { name: 'MOQ', value: '500' },
            { name: 'Bulk Order Discount', value: 'Available on orders above 3,000 pcs' },
            { name: 'Sample Order Lead Time', value: '7-10 days' },
            { name: 'Production Lead Time', value: '500 pcs - 3000 pcs - maximum 14 days, 3000+ pcs - Maximum 21 days (depends on quality)' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'Oeko-Tex' }
        ];
    }
    
    // Fabric Waist Tag Attributes (from PDF)
    if (name.includes('fabric') && name.includes('waist') && name.includes('tag')) {
        return [
            { name: 'Product Name', value: 'Fabric Waist Tag' },
            { name: 'Material', value: 'Cotton, Polyester, Canvas' },
            { name: 'Label Type', value: 'Waistband Tag, Hang Tag, Waistag (SUS FIELD, Double check)' },
            { name: 'Technics', value: 'Printed, Embroidery' },
            { name: 'Feature', value: 'Soft, Stretchable, Durable' },
            { name: 'Thickness / GSM', value: 'According to customer requirement' },
            { name: 'Fold Type', value: 'Straight-Cut, Crease Fold (verify this) According to customer, fold can be customized.' },
            { name: 'Application Method', value: 'Sewing Thread (Sew On), Cotton Thread' },
            { name: 'Wash Durability', value: 'NOT APPLICABLE' },
            { name: 'Stretchability / Elasticity', value: 'Moderate stretch, suitable for waistbands' },
            { name: 'Custom Shape Support', value: 'Yes' },
            { name: 'Printing / Embroidery Details', value: 'Screen print: solvent based, water-based, oil based.' },
            { name: 'Edge Finish', value: 'Straight-Cut, Crease Fold (verify this) According to customer, fold can be customized.' },
            { name: 'Usage', value: 'Inside Waistbands of Pants / Shorts' },
            { name: 'Color', value: 'Multiple Color Options (Pantone Matching Available), Any Custom (DTM) Colors Available' },
            { name: 'Size', value: 'As per customer size requirement' },
            { name: 'Packing Method', value: 'Folded Flat. As per customer requirement. This can be done in pieces (for example, 5000 pcs packet) or in dozens (500 dozen).' },
            { name: 'Storage Conditions', value: 'Store in a cool, dry place away from direct sunlight - Room Temperature' },
            { name: 'Country of Origin', value: 'Bangladesh' },
            { name: 'MOQ', value: '500 pcs' },
            { name: 'Bulk Order Discount', value: 'Available on orders above 3,000 pcs. 500 - 3000 pcs = similar per piece, 3000+ pcs = bulk discount' },
            { name: 'Sample Order Lead Time', value: '7-10 days' },
            { name: 'Product Lead Time', value: '500 pcs - 3000 pcs - maximum 7-10 days, 3000+ pcs - Maximum 7-14 days (depends on quality)' },
            { name: 'Certifications', value: 'Oeko-Tex' }
        ];
    }
    
    // Gum Tape Attributes
    if (name.includes('gum') && name.includes('tape')) {
        return [
            { name: 'Product Name', value: 'Gum Tape' },
            { name: 'Material', value: 'Paper / Natural Gum Adhesive' },
            { name: 'Type', value: 'Water-Activated Tape (Gummed Tape)' },
            { name: 'Width', value: '24mm / 36mm / Custom' },
            { name: 'Length', value: '50m / 100m / Custom' },
            { name: 'Adhesive Type', value: 'Water-Activated' },
            { name: 'Color', value: 'Kraft / Brown / Printed Options' },
            { name: 'Application Method', value: 'Manual / Tape Dispenser / Automatic Machines' },
            { name: 'Tensile Strength', value: 'High' },
            { name: 'Usage', value: 'Carton sealing, packaging, eco-friendly sealing' },
            { name: 'Environmental Note', value: 'Biodegradable, recyclable' },
            { name: 'Storage Conditions', value: 'Keep dry, avoid humidity' },
            { name: 'Shelf Life', value: '12–18 months' },
            { name: 'MOQ', value: '500 rolls' },
            { name: 'Bulk Order Discount', value: 'Available for 2000+ rolls' },
            { name: 'Sample Lead Time', value: '3 Days' },
            { name: 'Product Lead Time', value: '7–10 Days' },
            { name: 'Country of Origin', value: 'Bangladesh' }
        ];
    }
    
    // Hang Tag Attributes (from PDF)
    if (name.includes('hang') && name.includes('tag')) {
        return [
            { name: 'Product Name', value: 'Hang Tag' },
            { name: 'Material', value: 'Paper / Kraft / Recycled Cardboard, Cotton / Canvas / Felt (sometimes fabric tags)' },
            { name: 'Label Type', value: 'Hang Tag, Price Tag, waist tag, brand tag' },
            { name: 'Technics', value: 'Offset Printing, Screen Printing, Foil Stamping/Printing, Embossing/Debossing' },
            { name: 'Feature', value: 'Custom Shape & Finish / Eco Options' },
            { name: 'Design', value: 'Any customer design' },
            { name: 'Color', value: 'Any dtm colour (according to customer requirement)' },
            { name: 'Size / Dimensions', value: 'According to customer requirement' },
            { name: 'Printing', value: 'Silk Screen Printing, Digital Printing, UV Printing, Foil Printing, Laser Engraving, CMYK / UV / Emboss / Deboss' },
            { name: 'Double-sided Printing', value: 'Both side print available' },
            { name: 'Hole Punch', value: 'According to customer requirement' },
            { name: 'Stringing', value: 'Cotton string lock/ polyster string lock/ plastic string lock/ safety pin/tag pin Cotton Thread/ Polyester Thread/plastic thread' },
            { name: 'String Length', value: 'Accoring to customer requirement' },
            { name: 'Tag Thickness / GSM', value: 'Typically 130–400 GSM (Varies by material) According to customer requirement' },
            { name: 'Coating / Finish', value: 'See Finishing Chart' },
            { name: 'Barcode / QR Code Printing', value: 'Available: According to customer requirement' },
            { name: 'Usage', value: 'Outerwear, Casualwear, Accessories' },
            { name: 'Packaging Type', value: 'in pieces or in dozens (According to customer requirement)' },
            { name: 'MOQ', value: '500 pcs' },
            { name: 'Bulk Order Discount', value: '3000 pieces and above' },
            { name: 'Sample Order Lead Time', value: '5-7 Days' },
            { name: 'Product Lead Time', value: '500 - 3000 piece = max 14 days, 3000+ piece = max 21 days' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'FSC / Recycled Paper Available' },
            { name: 'Storage Conditions', value: 'Store in a cool, dry place away from direct sunlight' },
            { name: 'Country of Origin', value: 'Bangladesh' }
        ];
    }
    
    // Heat Transfer Label Attributes (from PDF)
    if (name.includes('heat') && name.includes('transfer') && name.includes('label')) {
        return [
            { name: 'Product Name', value: 'Heat Transfer Label' },
            { name: 'Material', value: 'TPU / Silicone / PET Film (Hot and Cool)' },
            { name: 'Label Type', value: 'Care Label / Brand Label/ neck label/ Main Label/ Size Label' },
            { name: 'Technics', value: 'Solvent-based / Oil-based Transfer/Water-Based Transfer, Silicone Transfer/PU/PVC Transfer / Foil Transfer' },
            { name: 'Feature', value: 'Tagless / Skin-Friendly / Wash Durable' },
            { name: 'Design', value: 'Fully Customizable' },
            { name: 'Logo', value: 'According to customer requirement' },
            { name: 'Color', value: 'Any customer requirement, Any Custom (DTM) Colors Available' },
            { name: 'Application Temperature', value: 'Typically 130°C – 160°C' },
            { name: 'Application Time & Pressure', value: 'Min - 7 seconds, Max - 20 Seconds, Medium Pressure' },
            { name: 'Stretchability / Flexibility', value: 'High stretch and flexibility suitable for activewear' },
            { name: 'Wash Durability', value: 'Withstands 3-10 times wash (do some research)' },
            { name: 'Surface Compatibility', value: 'Suitable for Cotton, Polyester, Nylon, Jeans Fabrics' },
            { name: 'Finish Type', value: 'Matte, Glossy (depending on print finish), Foil, Glossy, Reflective, Flock' },
            { name: 'Custom Shape Support', value: 'According to customers requirements' },
            { name: 'Backing Type', value: 'Cold Peel / Hot Peel/ According to customer requirements' },
            { name: 'Usage', value: 'T-shirts, Sportswear, Underwear, Activewear' },
            { name: 'Packing Method', value: 'As per customer requirement. This can be done in pieces (for example, 5000 pcs packet) or in dozens (500 dozen).' },
            { name: 'Storage Conditions', value: 'Store in a cool, dry place away from direct sunlight (Basically, keep in room temperature)' },
            { name: 'Country of Origin', value: 'Bangladesh' },
            { name: 'MOQ', value: '500 pcs' },
            { name: 'Bulk Order Discount', value: 'Available on orders above 3,000 pcs. 500 - 3000 pcs = similar per piece, 3000+ pcs = bulk discount' },
            { name: 'Sample Order Lead Time', value: '5-7 Days' },
            { name: 'Production Lead Time', value: '500 pcs - 3000 pcs - maximum 2 days, 3000+ pcs - Maximum 5-7 days (depends on quality)' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'OEKO-TEX® Standard 100, FSC Standard Certificate (research please)' }
        ];
    }
    
    // Herringbone Tape Attributes (from PDF)
    if (name.includes('herringbone') && name.includes('tape')) {
        return [
            { name: 'Product Name', value: 'Garment Accessories' },
            { name: 'Name', value: 'Herringbone Tape' },
            { name: 'Material', value: 'Cotton, Polyester, Nylon' },
            { name: 'Label Type', value: 'Tape / Trim' },
            { name: 'Technics', value: 'Jacquard Woven, Woven, Heat Transfer, printed' },
            { name: 'Feature', value: 'Durable / Flexible / Decorative' },
            { name: 'Design', value: 'Classic Herringbone Pattern / Custom Colors Any customer desing' },
            { name: 'Logo', value: 'Optional Woven or Printed Logo' },
            { name: 'Keyword', value: 'Herringbone Tape / Woven Tape' },
            { name: 'Pattern', value: 'Herringbone / Custom Patterns' },
            { name: 'Shape', value: 'Tape / Ribbon' },
            { name: 'Fold Type', value: 'Not Applicable' },
            { name: 'Color', value: 'Custom Colors (Pantone Matching) Any DTM colour' },
            { name: 'Size', value: 'Custom Width and Length' },
            { name: 'Usage', value: 'Apparel Trim / Accessories / Decoration' },
            { name: 'Printing', value: 'Silk Screen Printing, Heat Transfer Printing' },
            { name: 'Place of Origin', value: 'Bangladesh' },
            { name: 'Brand Name', value: 'Custom' },
            { name: 'Model Number', value: '014' },
            { name: 'MOQ (Minimum Order)', value: '500 - 3000 yards' },
            { name: 'Sample Order Lead Time', value: '5-7 Days' },
            { name: 'Product Lead Time', value: '500 - 3000 = 10-14 days, 3000+ = 21 days' },
            { name: 'Price', value: 'Based on material, size, and design' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'OEKO-TEX' },
            { name: 'Backing', value: 'Not Applicable' },
            { name: 'Weight', value: 'Specify weight per meter or yard (if applicable)' },
            { name: 'Care Instructions', value: 'Washing and maintenance guidance' },
            { name: 'Tensile Strength', value: 'Load-bearing capacity details (if relevant)' },
            { name: 'Eco-Friendly Options', value: 'NOT Possible' },
            { name: 'Packaging Options', value: 'In Yards' },
            { name: 'Fire Resistance', value: 'Flame retardant certifications (If applicable)' },
            { name: 'Custom Branding', value: 'Extra branding options like embossing or tags' },
            { name: 'Warranty', value: 'Any durability or satisfaction guarantees offered' }
        ];
    }
    
    // Jacket Elastic Attributes (from PDF)
    if (name.includes('jacket') && name.includes('elastic')) {
        return [
            { name: 'Product Name', value: 'Garment Accessories' },
            { name: 'Name', value: 'Jacket Elastic' },
            { name: 'Material', value: 'Polyester / Nylon / Spandex / Rubber Blend' },
            { name: 'Label Type', value: 'Underwear or pant or trouser inside label' },
            { name: 'Technics', value: 'Jacquard Woven Elastic, Silicone Printing, Screen Printing, Embossing (Heat Pressed), Woven Label Sewn On' },
            { name: 'Feature', value: 'Stretchable / Strong Recovery / Durable' },
            { name: 'Design', value: 'Custom Designs Available' },
            { name: 'Logo', value: 'Can Include Custom Brand Logo' },
            { name: 'Pattern', value: 'Ribbed / Woven / Plain' },
            { name: 'Shape', value: 'Tape / Band' },
            { name: 'Fold Type', value: 'Not Applicable' },
            { name: 'Color', value: 'Custom Color Matching Any DTM colour /According to customer requirement' },
            { name: 'Size', value: 'Custom Width and Length' },
            { name: 'Usage', value: 'Jackets / Coats / Hoodies / Bottom Elastic' },
            { name: 'Printing', value: 'See Printing Type' },
            { name: 'Edge', value: 'Cold Cut and Heat Cut' },
            { name: 'Place of Origin', value: 'Bangladesh' },
            { name: 'Brand Name', value: 'Custom' },
            { name: 'Model Number', value: '010' },
            { name: 'MOQ (Minimum Order)', value: '500 - 3000 yards' },
            { name: 'Sample Order Lead Time', value: '14 Days' },
            { name: 'Product Lead Time', value: '(Depends on quantity & specs) 500 - 3000 = around 3 weeks, 3000+ = 4 weeks' },
            { name: 'Price', value: 'Based on design, material, and size' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'OEKO-TEX' },
            { name: 'Backing', value: 'Not Applicable' },
            { name: 'Stretch Recovery Rate', value: '≥90% Recovery' },
            { name: 'Tensile Strength', value: 'High Elastic Strength (Ideal for Outerwear)' },
            { name: 'Comfort Rating', value: 'Skin-Friendly / Soft Elastic Feel' },
            { name: 'Elastic Type Variants', value: 'Soft Elastic / Firm Elastic / Brushed Finish Available' },
            { name: 'Environmental Options', value: 'NOT POSSIBLE' },
            { name: 'Heat Resistance', value: 'Washable Up to 120°C' },
            { name: 'Shrinkage Resistance', value: 'Pre-shrunk / Minimal Shrinkage' },
            { name: 'Packaging Options', value: 'Roll / Cut Lengths / Custom Label & Wrap Options' }
        ];
    }
    
    // Leather Patch Attributes (from PDF)
    if (name.includes('leather') && name.includes('patch')) {
        return [
            { name: 'Product Name', value: 'Garment Accessories' },
            { name: 'Name', value: 'Original Leather Patch' },
            { name: 'Material', value: 'Genuine Leather (Specify leather type if needed, e.g., Full-Grain, Top-Grain, PU leather)' },
            { name: 'Label Type', value: 'Patch Label' },
            { name: 'Technics', value: 'See Technics Type' },
            { name: 'Feature', value: 'Durable / Premium Branding / Optional Eco-Friendly Options' },
            { name: 'Design', value: 'Fully Customizable Designs' },
            { name: 'Logo', value: 'Customer Logo' },
            { name: 'Keyword', value: 'Leather Patch, Custom Patch Labels' },
            { name: 'Pattern', value: 'Round / Rectangular / Other Shapes' },
            { name: 'Shape', value: 'Custom Shapes Available' },
            { name: 'Fold Type', value: 'Not Applicable' },
            { name: 'Color', value: 'Natural Leather Colors / Custom Dye' },
            { name: 'Size', value: 'Customized Size' },
            { name: 'Usage', value: 'Denim, Jackets, Bags, Footwear' },
            { name: 'Printing', value: 'See Printing Type' },
            { name: 'Edge', value: 'Clean Cut / Raw Edge / Other Edges' },
            { name: 'Backing', value: 'See Backing Type' },
            { name: 'Thickness', value: 'Typically 1.5–3 mm (Specify as needed)' },
            { name: 'Finish', value: 'See Finish Type' },
            { name: 'Wash Durability', value: 'Suitable for X wash cycles (specify if known)' },
            { name: 'UV / Weather Resistance', value: 'Suitable for outdoor use (Yes/No)' },
            { name: 'Packaging Details', value: 'Bulk Pack / Individually Bagged' },
            { name: 'Custom Shape Support', value: 'Available / Limited (Specify)' },
            { name: 'Environmental Impact', value: 'Eco-friendly tanning / sourcing options available (Yes/No)' },
            { name: 'Storage Recommendations', value: 'Store in cool, dry place away from direct sunlight' },
            { name: 'Place of Origin', value: 'Bangladesh' },
            { name: 'Brand Name', value: 'Custom' },
            { name: 'Model Number', value: '008' },
            { name: 'MOQ (Minimum Order)', value: '100 Units (Confirm)' },
            { name: 'Sample Order Lead Time', value: '7 Days (Confirm)' },
            { name: 'Product Lead Time', value: '[Confirm estimated time, e.g., 10-15 Days]' },
            { name: 'Price', value: 'Based on size, material, and quantity' },
            { name: 'Shipment', value: 'Courier / Freight (Confirm options)' },
            { name: 'Certifications', value: '[List Available Certifications, e.g., REACH, ISO, Eco-Labels]' }
        ];
    }
    
    // Mobilon Tape Attributes
    if (name.includes('mobilon') && name.includes('tape')) {
        return [
            { name: 'Product Name', value: 'Mobilon Tape' },
            { name: 'Material', value: 'Nylon / Polyester (Woven Base) with Adhesive Backing' },
            { name: 'Type', value: 'Strong Packaging / Reinforcement Tape' },
            { name: 'Width', value: '12mm / 18mm / 24mm / Custom' },
            { name: 'Length', value: '10m / 20m / Custom' },
            { name: 'Thickness', value: '0.2–0.3 mm' },
            { name: 'Adhesive Type', value: 'Pressure-Sensitive, Strong Bond' },
            { name: 'Color', value: 'White, Black, Transparent, Custom Colors' },
            { name: 'Tensile Strength', value: 'High' },
            { name: 'Usage', value: 'Heavy-duty packaging, strapping, reinforcement' },
            { name: 'Application Method', value: 'Manual / Heat / Press' },
            { name: 'Storage Conditions', value: 'Cool, dry place' },
            { name: 'Shelf Life', value: '12–24 months' },
            { name: 'MOQ', value: '500 rolls' },
            { name: 'Bulk Order Discount', value: 'Available on 2000+ rolls' },
            { name: 'Sample Lead Time', value: '3 Days' },
            { name: 'Product Lead Time', value: '5–7 Days' },
            { name: 'Country of Origin', value: 'Bangladesh' }
        ];
    }
    
    // Poly Sticker Attributes
    if (name.includes('poly') && name.includes('sticker')) {
        return [
            { name: 'Product Name', value: 'Poly Sticker' },
            { name: 'Material', value: 'Polypropylene (PP) Film / Polyester (PET)' },
            { name: 'Sticker Type', value: 'Polybag Sticker / Branding Sticker' },
            { name: 'Technics', value: 'Printed (Digital, Flexo, Offset, UV)' },
            { name: 'Thickness', value: '40–60 Micron' },
            { name: 'Design', value: 'Customized Designs' },
            { name: 'Logo', value: 'Customer Logo Printing' },
            { name: 'Color', value: 'Transparent / Opaque / Pantone Matching' },
            { name: 'Printing', value: 'Digital, Flexo, UV Printing' },
            { name: 'Adhesive Strength', value: 'Permanent / Removable' },
            { name: 'Finish Type', value: 'Glossy, Matte, Transparent' },
            { name: 'Custom Shape Support', value: 'Yes (Die-Cut Shapes Available)' },
            { name: 'Application Method', value: 'Peel & Stick (Self-Adhesive)' },
            { name: 'Temperature Resistance', value: '-20°C to +60°C' },
            { name: 'Water / Oil Resistance', value: 'Fully waterproof, oil-resistant' },
            { name: 'UV / Scratch Resistance', value: 'High (UV lamination available)' },
            { name: 'Roll / Sheet Options', value: 'Rolls or Sheets' },
            { name: 'Core Size', value: '1" or 3" (for rolls)' },
            { name: 'Shelf Life', value: '18 months (under proper storage)' },
            { name: 'Storage Conditions', value: 'Store in cool, dry place, avoid direct sunlight' },
            { name: 'Usage', value: 'Garment Poly Bags, Packaging, Branding' },
            { name: 'Packing Method', value: 'Rolls or Sheets (as per customer)' },
            { name: 'Country of Origin', value: 'Bangladesh' },
            { name: 'MOQ', value: '5000 pcs' },
            { name: 'Bulk Order Discount', value: 'Available above 20,000 pcs' },
            { name: 'Sample Order Lead Time', value: '7 Days' },
            { name: 'Product Lead Time', value: '5000–20,000 pcs = 3–5Days 20,000+ pcs = 7–10 Days' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'FSC Certificate, OEKO-TEX® (packaging contact)' }
        ];
    }
    
    // PU Patch Attributes (from PDF)
    if (name.includes('pu') && name.includes('patch')) {
        return [
            { name: 'Product Name', value: 'PU Patch' },
            { name: 'Material', value: 'Polyurethane (PU)' },
            { name: 'Label Type', value: 'Decorative Patch / Logo Patch' },
            { name: 'Technics', value: 'See Technics Type' },
            { name: 'Feature', value: 'Water-Resistant / Flexible / Durable' },
            { name: 'Design', value: 'Customizable Shape & Texture' },
            { name: 'Color', value: 'Solid / Dual-Tone / Metallic' },
            { name: 'Shape', value: 'Square / Oval / Irregular' },
            { name: 'Custom Shape Support', value: 'Available for special/custom die-cut shapes' },
            { name: 'Backing', value: 'See Backing Type' },
            { name: 'Thickness / GSM', value: 'Typically 1.0–2.5 mm thickness (Varies by design)' },
            { name: 'Wash Durability', value: 'Can withstand 30+ wash cycles' },
            { name: 'UV / Weather Resistance', value: 'Suitable for outdoor and frequent-use applications' },
            { name: 'Edge Finish', value: 'See Edge cut type' },
            { name: 'Packing Method', value: 'Bulk Pack / Individually Bagged (As per customer requirement)' },
            { name: 'Storage Conditions', value: 'Store in cool, dry place away from direct sunlight' },
            { name: 'Country of Origin', value: '[Insert Your Country, e.g., China / India / Vietnam]' },
            { name: 'MOQ', value: '300 pcs' },
            { name: 'Bulk Order Discount', value: 'Available on orders above 3,000 pcs' },
            { name: 'Sample Order Lead Time', value: '5-7 Days' },
            { name: 'Product Lead Time', value: '12-18 Days' },
            { name: 'Certifications', value: 'REACH, Oeko-Tex (Optional)' }
        ];
    }
    
    // Reflective Tape Attributes
    if (name.includes('reflective') && name.includes('tape')) {
        return [
            { name: 'Product Name', value: 'Reflective Tape' },
            { name: 'Material', value: 'Polyester / PVC Base with Reflective Coating' },
            { name: 'Type', value: 'Safety / High-Visibility Tape' },
            { name: 'Width', value: '10mm – 100mm' },
            { name: 'Length', value: 'Roll Length: 5m – 50m' },
            { name: 'Color', value: 'Silver / White / Custom Colors' },
            { name: 'Reflectivity', value: 'High Visibility, Retro-Reflective' },
            { name: 'Adhesive Type', value: 'Self-Adhesive / Sew-On / Heat Bond' },
            { name: 'Weather Resistance', value: 'Water & UV Resistant' },
            { name: 'Tensile Strength', value: 'High' },
            { name: 'Application Method', value: 'Garments, Safety Jackets, Bags, Road Signs' },
            { name: 'Storage Conditions', value: 'Cool, dry place' },
            { name: 'Shelf Life', value: '2–3 years' },
            { name: 'MOQ', value: '500 meters' },
            { name: 'Bulk Order Discount', value: 'Available on 2000+ meters' },
            { name: 'Sample Lead Time', value: '3–5 Days' },
            { name: 'Product Lead Time', value: '5–7 Days' },
            { name: 'Country of Origin', value: 'Bangladesh' }
        ];
    }
    
    // Satin Label Attributes (from PDF)
    if (name.includes('satin') && name.includes('label')) {
        return [
            { name: 'Product Name', value: 'Satin Label' },
            { name: 'Material', value: 'Satin (Polyester/Nylon-based)' },
            { name: 'Label Type', value: 'Brand Label, Size Label, Care Label, Main Label' },
            { name: 'Technics', value: 'Woven, Printed' },
            { name: 'Thickness / GSM', value: 'Customizable according to customer requirements' },
            { name: 'Design', value: 'Fully Customized Designs' },
            { name: 'Logo', value: 'Customer Logo' },
            { name: 'Fold Type', value: 'Straight-Cut, End-Fold, Mid-Fold, Centre-Fold, Angle-Fold (custom folds available upon request)' },
            { name: 'Color Options', value: 'Multiple colors (Pantone Matching Available), Any custom (DTM) colors available' },
            { name: 'Printing Methods', value: 'Silk Screen Printing, Rotary Printing, Fluxo Printing, Digital Printing, Foil Printing' },
            { name: 'Edge Finish', value: 'Straight-Cut, End-Fold, Mid-Fold, Centre-Fold, Angle-Fold (custom folds available upon request)' },
            { name: 'Application Method', value: 'Sew-On (Sewing Thread)' },
            { name: 'Finish Type', value: 'Soft-Touch, Glossy, Matte (according to customer requirement)' },
            { name: 'Custom Shape Support', value: 'Yes' },
            { name: 'Usage / Applications', value: 'Lingerie, Kidswear, T-shirts, Dresses, Jackets, Hoodies, Sportswear, Accessories, Home Textiles' },
            { name: 'Packing Method', value: 'According to customer requirement: Pieces (5,000pcs per packet), Dozens (500 dozen per pack)' },
            { name: 'Country of Origin', value: 'Bangladesh' },
            { name: 'MOQ (Minimum Order Quantity)', value: '500 pcs' },
            { name: 'Bulk Order Discount', value: '500–3,000 pcs: Standard per-piece rate, 3,000+ pcs: Discounted bulk rate' },
            { name: 'Sample Order Lead Time', value: '7–10 days (initial arrangement required)' },
            { name: 'Product Lead Time', value: '500–3,000 pcs: Maximum 2 days, 3,000+ pcs: 5–7 days (depending on design/quality)' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'OEKO-TEX® Standard 100, FSC Certified' }
        ];
    }
    
    // Satin Tape Attributes
    if (name.includes('satin') && name.includes('tape')) {
        return [
            { name: 'Product Name', value: 'Satin Tape' },
            { name: 'Material', value: 'Polyester / Nylon (Satin Finish)' },
            { name: 'Type', value: 'Decorative / Garment Trim Tape' },
            { name: 'Width', value: '5mm – 50mm' },
            { name: 'Length', value: 'Roll Length: 1m–50m' },
            { name: 'Color', value: 'Multiple, Custom Pantone Available' },
            { name: 'Application Method', value: 'Sewing / Adhesive (Optional)' },
            { name: 'Texture', value: 'Smooth, Glossy Finish' },
            { name: 'Usage', value: 'Garment Labels, Gift Wrapping, Accessories, Decorations' },
            { name: 'Storage Conditions', value: 'Dry place, away from sunlight' },
            { name: 'Shelf Life', value: '2–3 years' },
            { name: 'MOQ', value: '500 meters' },
            { name: 'Bulk Order Discount', value: 'Available on 2000+ meters' },
            { name: 'Sample Lead Time', value: '3–5 Days' },
            { name: 'Product Lead Time', value: '5–7 Days' },
            { name: 'Country of Origin', value: 'Bangladesh' }
        ];
    }
    
    // Thermal Sticker Attributes
    if (name.includes('thermal') && name.includes('sticker')) {
        return [
            { name: 'Product Name', value: 'Thermal Sticker' },
            { name: 'Material', value: 'Direct Thermal Paper (Top-Coated / Non-Coated)' },
            { name: 'Sticker Type', value: 'Barcode / Price / Shipping Label' },
            { name: 'Technics', value: 'Thermal Printing (No Ink Required)' },
            { name: 'Thickness / GSM', value: '60–70 GSM' },
            { name: 'Design', value: 'Standard / Customized' },
            { name: 'Logo', value: 'Optional (Pre-Printed Logo)' },
            { name: 'Color', value: 'White Base, Black Print' },
            { name: 'Printing', value: 'Direct Thermal / Thermal Transfer' },
            { name: 'Adhesive Strength', value: 'Permanent Adhesive' },
            { name: 'Finish Type', value: 'Matte Finish' },
            { name: 'Custom Shape Support', value: 'Yes' },
            { name: 'Application Method', value: 'Peel & Stick (Self-Adhesive)' },
            { name: 'Temperature Resistance', value: '-5°C to +40°C' },
            { name: 'Water / Oil Resistance', value: 'Low (not waterproof, unless laminated)' },
            { name: 'UV / Scratch Resistance', value: 'Low (print fades with sunlight/heat)' },
            { name: 'Roll / Sheet Options', value: 'Rolls (1000 pcs/roll)' },
            { name: 'Core Size', value: '1" or 3"' },
            { name: 'Shelf Life', value: '6–12 months (printing fades over time)' },
            { name: 'Storage Conditions', value: 'Store in cool, dry place, away from heat & sunlight' },
            { name: 'Usage', value: 'Supermarkets, Garment Tags, Logistics, POS Systems' },
            { name: 'Packing Method', value: 'Roll (1000 pcs/roll or customized)' },
            { name: 'Country of Origin', value: 'Bangladesh' },
            { name: 'MOQ', value: '5000 pcs' },
            { name: 'Bulk Order Discount', value: 'Available on 20,000 pcs+' },
            { name: 'Sample Order Lead Time', value: '5 Days' },
            { name: 'Product Lead Time', value: '5000–20,000 pcs = 3–4Days 20,000+ pcs = 7 Days' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'FSC Certificate, ISO 9001' }
        ];
    }
    
    // Tube Drawcord Attributes (from PDF)
    if (name.includes('tube') && (name.includes('drawcord') || name.includes('cord'))) {
        return [
            { name: 'Product Name', value: 'Garment Accessories' },
            { name: 'Name', value: 'Tube Drawcord' },
            { name: 'Material', value: 'Polyester / Nylon / Cotton Blends' },
            { name: 'Label Type', value: 'Drawstring Cord' },
            { name: 'Technics', value: 'See Technics Type' },
            { name: 'Feature', value: 'Durable / Flexible / Smooth Texture/ Wash Resistant' },
            { name: 'Design', value: 'Custom Colors and Diameter Options' },
            { name: 'Logo', value: 'Optional Printed Tips or Molded Branding' },
            { name: 'Keyword', value: 'Tubular Drawstring / Garment Drawcord / Hoodie Cord' },
            { name: 'Pattern', value: 'Solid / Mixed / Patterned' },
            { name: 'Shape', value: 'Tubular / Round' },
            { name: 'Fold Type', value: 'Not Applicable' },
            { name: 'Color', value: 'Custom Color Matching / Pantone Options' },
            { name: 'Size', value: 'Custom Length and Diameter' },
            { name: 'Usage', value: 'Hoodies / Jackets / Pants / Bags' },
            { name: 'Printing', value: 'Tip Print / None' },
            { name: 'Edge', value: 'Metal Tip / Plastic Tip / Heat Sealed' },
            { name: 'Tip Type Options', value: 'Plastic / Metal / Molded / Custom Logo Aglets' },
            { name: 'Wash Fastness', value: 'Colorfast up to 60°C (Example, confirm specifics)' },
            { name: 'Abrasion Resistance', value: 'Suitable for heavy use and rough conditions' },
            { name: 'Elasticity', value: 'Non-elastic (Specify if elastic variants available)' },
            { name: 'Eco-Friendly Options', value: 'Organic Cotton / Recycled Material Options Available' },
            { name: 'Packaging Format', value: 'Bulk / Pre-cut Lengths / Custom Retail Packaging' },
            { name: 'Fire Resistance', value: 'Available on request for safety garments' },
            { name: 'Certifications', value: 'OEKO-TEX / GRS / FSC (If applicable)' },
            { name: 'Certifications Detail', value: 'Meets OEKO-TEX Standard 100 / Global Recycled Standard' },
            { name: 'Care Instructions', value: 'Machine wash cold, do not bleach, tumble dry low' },
            { name: 'Place of Origin', value: 'Bangladesh' },
            { name: 'Brand Name', value: 'Custom' },
            { name: 'Model Number', value: '012' },
            { name: 'MOQ (Minimum Order)', value: '100 Units (Confirm)' },
            { name: 'Sample Order Lead Time', value: '5–7 Days' },
            { name: 'Product Lead Time', value: '10–15 Days (Dependent on specs and order quantity)' },
            { name: 'Price', value: 'Based on material, diameter, and tip customization' },
            { name: 'Shipment', value: 'Courier / Freight (As per client preference)' },
            { name: 'Backing', value: 'Not Applicable' }
        ];
    }
    
    // Velcro Tape Attributes
    if (name.includes('velcro') && name.includes('tape')) {
        return [
            { name: 'Product Name', value: 'Velcro Tape' },
            { name: 'Material', value: 'Nylon / Polyester (Hook & Loop)' },
            { name: 'Type', value: 'Hook & Loop Fastener' },
            { name: 'Width', value: '10mm / 20mm / 25mm / Custom' },
            { name: 'Length', value: 'Roll Length: 1m–50m' },
            { name: 'Color', value: 'Black, White, Custom Colors' },
            { name: 'Adhesive Type', value: 'Non-Adhesive / Self-Adhesive (Optional)' },
            { name: 'Application Method', value: 'Sew-On / Adhesive / Snap-On' },
            { name: 'Tensile Strength', value: 'Moderate' },
            { name: 'Flexibility', value: 'High' },
            { name: 'Usage', value: 'Garments, Accessories, Shoes, Bags, Home Textile' },
            { name: 'Storage Conditions', value: 'Dry place, away from sunlight' },
            { name: 'Shelf Life', value: '2–3 years' },
            { name: 'MOQ', value: '500 meters' },
            { name: 'Bulk Order Discount', value: 'Available on 2000+ meters' },
            { name: 'Sample Lead Time', value: '3 Days' },
            { name: 'Product Lead Time', value: '5–7 Days' },
            { name: 'Country of Origin', value: 'Bangladesh' }
        ];
    }
    
    // Velvet Tape Attributes
    if (name.includes('velvet') && name.includes('tape')) {
        return [
            { name: 'Product Name', value: 'Velvet Tape' },
            { name: 'Material', value: 'Polyester / Nylon (Velvet Surface)' },
            { name: 'Type', value: 'Decorative / Garment Trim Tape' },
            { name: 'Width', value: '5mm – 50mm' },
            { name: 'Length', value: 'Roll Length: 1m–50m' },
            { name: 'Color', value: 'Multiple, Custom Pantone Available' },
            { name: 'Application Method', value: 'Sewing / Heat Bond (Optional)' },
            { name: 'Texture', value: 'Soft, Smooth, Luxurious' },
            { name: 'Usage', value: 'Garment trims, Lingerie, Accessories, Decorative Applications' },
            { name: 'Storage Conditions', value: 'Cool, dry place, avoid crushing' },
            { name: 'Shelf Life', value: '2–3 years' },
            { name: 'MOQ', value: '500 meters' },
            { name: 'Bulk Order Discount', value: 'Available on 2000+ meters' },
            { name: 'Sample Lead Time', value: '3–5 Days' },
            { name: 'Product Lead Time', value: '5–7 Days' },
            { name: 'Country of Origin', value: 'Bangladesh' }
        ];
    }
    
    // Waist Belt Attributes (from PDF)
    if (name.includes('waist') && name.includes('belt')) {
        return [
            { name: 'Product Name', value: 'Garment Accessories' },
            { name: 'Name', value: 'Waist Belt' },
            { name: 'Material', value: 'Cotton , Polyester , PU Leather' },
            { name: 'Label Type', value: 'Waist Belt / Belt Strap' },
            { name: 'Technics', value: 'Woven, Printed, Embroidery, Heat Transfer Printing, Screen Printing.(Do research dye sublimation printing and screen printing)' },
            { name: 'Feature', value: 'Durable / Adjustable / Comfortable' },
            { name: 'Design', value: 'Custom Colors, Widths, and Patterns' },
            { name: 'Logo', value: 'Optional Embroidery or Printed Branding' },
            { name: 'Keyword', value: 'Belt / Waist Strap / Adjustable Belt' },
            { name: 'Pattern', value: 'Solid / Striped / Customized' },
            { name: 'Shape', value: 'Flat / Tubular' },
            { name: 'Fold Type', value: 'Not Applicable' },
            { name: 'Color', value: 'Any customer DTM Colour.' },
            { name: 'Size', value: 'Custom Length and Width' },
            { name: 'Usage', value: 'Pants / Skirts / Dresses / Outerwear' },
            { name: 'Printing', value: 'Woven, Printed, Embroidery, Heat Transfer Printing, Screen Printing.(Do research dye sublimation printing and screen printing' },
            { name: 'Edge', value: 'Heat Cut and Cold Cut' },
            { name: 'Place of Origin', value: 'Bangladesh' },
            { name: 'Brand Name', value: 'Custom' },
            { name: 'Model Number', value: '013' },
            { name: 'MOQ (Minimum Order)', value: '500 piece' },
            { name: 'Sample Order Lead Time', value: '7-10 days' },
            { name: 'Production Lead Time', value: '21 Days (Dependent on specs and order quantity)' },
            { name: 'Price', value: 'Based on material, size, and design' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'OEKO-TEX' },
            { name: 'Backing', value: 'Not Applicable' },
            { name: 'Hardware Options', value: 'Buckle types (Metal, Plastic, Adjustable sliders) Metal Buckle, Plastic Buckle, Metal D-Ring, Adjustable sliders' },
            { name: 'Weight', value: 'Approximate weight per unit (Specify if needed)' },
            { name: 'Tensile Strength', value: 'Strength or load capacity (If relevant)' },
            { name: 'Care Instructions', value: 'Washing / Dry cleaning instructions' },
            { name: 'Eco-Friendly Options', value: 'NOT POSSIBLE' },
            { name: 'Packaging Options', value: 'In pieces' }
        ];
    }
    
    // Scotch Tape Attributes
    if (name.includes('scotch') && name.includes('tape')) {
        return [
            { name: 'Product Name', value: 'Scostape (Scotch Tape)' },
            { name: 'Material', value: 'BOPP (Biaxially Oriented Polypropylene) / Acrylic Adhesive' },
            { name: 'Type', value: 'Transparent / Packaging Tape' },
            { name: 'Width', value: '12mm / 18mm / 24mm / Custom' },
            { name: 'Length', value: '33m / 66m / Custom' },
            { name: 'Thickness', value: '35–45 Micron' },
            { name: 'Adhesive Type', value: 'Pressure-Sensitive, Permanent' },
            { name: 'Color', value: 'Transparent / Brown / Clear' },
            { name: 'Tensile Strength', value: 'Moderate' },
            { name: 'Application Method', value: 'Manual / Dispenser' },
            { name: 'Usage', value: 'General packaging, carton sealing, office use' },
            { name: 'Storage Conditions', value: 'Cool, dry place, avoid direct sunlight' },
            { name: 'Shelf Life', value: '12–24 months' },
            { name: 'MOQ', value: '500 rolls' },
            { name: 'Bulk Order Discount', value: 'Available for 2000+ rolls' },
            { name: 'Sample Lead Time', value: '2–3 Days' },
            { name: 'Product Lead Time', value: '5–7 Days' },
            { name: 'Country of Origin', value: 'Bangladesh' }
        ];
    }
    
    // Woven Labels (general)
    if (name.includes('woven') && name.includes('label')) {
        return [
            { name: 'Product Name', value: 'Woven Labels' },
            { name: 'Material', value: 'Polyester / Cotton Blend' },
            { name: 'Weave Type', value: 'Damask / Taffeta / Satin' },
            { name: 'Print Method', value: 'Woven Damask / Multi-color Weaving' },
            { name: 'Width Range', value: '8mm - 50mm' },
            { name: 'Fold Options', value: 'Center Fold / End Fold / Straight Cut' },
            { name: 'Edge Finish', value: 'Heat-cut / Ultrasonic Cut' },
            { name: 'Density', value: 'High Definition Weaving' },
            { name: 'Wash Durability', value: '50+ wash cycles' },
            { name: 'Application', value: 'Premium Brand Labels' }
        ];
    }
    
    // Jacron Patches
    if (name.includes('jacron') && name.includes('patch')) {
        return [
            { name: 'Product Name', value: 'Jacron Patch Label' },
            { name: 'Material', value: 'Imitation leather, Jacron, PU Leather, Original Leather' },
            { name: 'Label Type', value: 'Waist-belt Label, Logo Label' },
            { name: 'Technics', value: 'deboss, emboss, laser engraving, screen printing, digital printing, foil stamping' },
            { name: 'Feature', value: 'Eco-Friendly / Vegan Leather Option' },
            { name: 'Design', value: 'According to customer design and artwork' },
            { name: 'Color', value: 'Any Custom (DTM) Colors Available' },
            { name: 'Shape', value: 'Any custom shape' },
            { name: 'Fold Type', value: 'Straight-Cut/ End-Fold/ Mid/Centre-Fold/ According to customer, fold can be customized.' },
            { name: 'Usage', value: 'Denim, Jackets, Outerwear' },
            { name: 'Printing', value: 'deboss, emboss, laser engraving, screen printing, digital printing, foil stamping' },
            { name: 'Edge', value: 'Straight-Cut/ End-Fold/ Mid/Centre-Fold/ According to customer, fold can be customized.' },
            { name: 'Backing', value: 'Sew-on (Stitch, sewing)' },
            { name: 'Thickness / GSM', value: 'Typically 1.5–3 mm thickness (Varies by material and design) / As per customer requirements.' },
            { name: 'Wash Durability', value: 'Withstands 3-10 times wash (do some research)' },
            { name: 'UV / Weather Resistance', value: 'Suitable for outdoor and denim use' },
            { name: 'Custom Shape Support', value: 'Available (Custom die-cut shapes beyond oval)' },
            { name: 'Packing Method', value: 'As per customer requirement. This can be done in pieces (for example, 5000 pcs packet) or in dozens (500 dozen).' },
            { name: 'Storage Conditions', value: 'Store in a cool, dry place away from direct sunlight (Basically, keep in room temperature)' },
            { name: 'Country of Origin', value: 'Bangladesh' },
            { name: 'MOQ', value: '500 pcs' },
            { name: 'Bulk Order Discount', value: 'Available on orders above 3,000 pcs. 500 - 3000 pcs = similar per piece, 3000+ pcs = bulk discount' },
            { name: 'Sample Order Lead Time', value: '7-10 Days' },
            { name: 'Product Lead Time', value: '500 pcs - 3000 pcs - 7-10 days, 3000+ pcs - Maximum 7-14 days (depends on quality)' },
            { name: 'Shipment', value: 'FOB Chittagong' },
            { name: 'Certifications', value: 'OEKO-TEX® Standard 100' }
        ];
    }
    
    // Polyester Tape (general)
    if (name.includes('polyester') && name.includes('tape')) {
        return [
            { name: 'Product Name', value: 'Polyester Tape' },
            { name: 'Material', value: '100% Polyester' },
            { name: 'Width Range', value: '6mm - 75mm' },
            { name: 'Weave', value: 'Plain / Twill Weave' },
            { name: 'Properties', value: 'Strong / Durable / Color-fast' },
            { name: 'Application', value: 'Bag Handles / Straps / Trimming' },
            { name: 'Color Options', value: 'Wide Color Range' },
            { name: 'Strength', value: 'High Tensile Strength' }
        ];
    }
    
    // Elastic (general plain elastic)
    if (name.includes('elastic') && !name.includes('jacket')) {
        return [
            { name: 'Product Name', value: 'Elastic Tape' },
            { name: 'Material', value: 'Polyester / Rubber Core' },
            { name: 'Width Range', value: '3mm - 50mm' },
            { name: 'Stretch', value: '100% - 200% elongation' },
            { name: 'Recovery', value: 'Excellent recovery properties' },
            { name: 'Application', value: 'Waistbands / Cuffs / General Use' },
            { name: 'Color Options', value: 'White / Black / Custom Colors' },
            { name: 'Wash Durability', value: 'Machine washable' }
        ];
    }
    
    return getGenericAttributes(productType, productName);
}

// Fallback for products without specific PDF data
function getGenericAttributes(productType, productName) {
    const name = productName.toLowerCase();
    
    if (productType === 'labels') {
        return [
            { name: 'Category', value: 'Labels & Tags' },
            { name: 'Material', value: 'Premium Fabric' },
            { name: 'Print Method', value: 'Screen Print/Digital' },
            { name: 'Application', value: 'General Garment Use' },
            { name: 'Custom Options', value: 'Available' }
        ];
    } else if (productType === 'stickers') {
        return [
            { name: 'Category', value: 'Stickers & Labels' },
            { name: 'Material', value: 'Vinyl/Paper' },
            { name: 'Adhesive', value: 'Permanent/Removable' },
            { name: 'Application', value: 'General Use' },
            { name: 'Custom Options', value: 'Available' }
        ];
    }
    
    return [
        { name: 'Category', value: 'RMG Accessories' },
        { name: 'Application', value: 'General Garment Use' },
        { name: 'Custom Options', value: 'Available' }
    ];
}

// Helper functions for attribute values
function getCategoryName(productType) {
    const categories = {
        'labels': 'Labels & Tags',
        'tags': 'Tags & Identification',
        'patches': 'Patches & Appliques',
        'tapes': 'Tapes & Trims',
        'cords': 'Cords & Elastics',
        'stickers': 'Stickers & Labels',
        'general': 'RMG Accessories'
    };
    return categories[productType] || 'RMG Accessories';
}

function getApplicationType(name) {
    if (name.includes('barcode') || name.includes('thermal')) return 'Industrial/Retail';
    if (name.includes('satin') || name.includes('velvet')) return 'Premium Garments';
    if (name.includes('canvas') || name.includes('leather')) return 'Heavy-duty Applications';
    if (name.includes('heat transfer')) return 'Tagless Solutions';
    if (name.includes('reflective') || name.includes('safety')) return 'Safety/Visibility';
    return 'General Garment Use';
}

function getMaterialType(name) {
    if (name.includes('woven')) return 'Woven Polyester';
    if (name.includes('satin')) return 'Satin Polyester';
    if (name.includes('canvas')) return 'Canvas Cotton';
    if (name.includes('heat transfer')) return 'Transfer Film';
    return 'Premium Fabric';
}

function getPrintMethod(name) {
    if (name.includes('woven')) return 'Woven Damask';
    if (name.includes('heat transfer')) return 'Heat Transfer';
    return 'Screen Print/Digital';
}

function getPatchMaterial(name) {
    if (name.includes('leather')) return 'Genuine Leather';
    if (name.includes('pu')) return 'PU Leather';
    if (name.includes('jacron')) return 'Jacron Paper';
    return 'High-Quality Fabric';
}

function getTapeMaterial(name) {
    if (name.includes('herringbone')) return 'Cotton Herringbone';
    if (name.includes('polyester')) return '100% Polyester';
    if (name.includes('satin')) return 'Satin Polyester';
    if (name.includes('velvet')) return 'Velvet Polyester';
    if (name.includes('reflective')) return 'Retroreflective Film';
    if (name.includes('mobilon')) return 'TPU (Thermoplastic)';
    if (name.includes('velcro')) return 'Nylon Hook & Loop';
    if (name.includes('gum')) return 'Kraft Paper';
    return 'Quality Textile';
}

function getTapeProperties(name) {
    if (name.includes('reflective')) return 'High Visibility';
    if (name.includes('mobilon')) return 'Waterproof/Flexible';
    if (name.includes('velcro')) return 'Reusable Fastening';
    if (name.includes('gum')) return 'Water-Activated';
    return 'Durable/Colorfast';
}

function getTapeApplication(name) {
    if (name.includes('reflective')) return 'Safety Garments';
    if (name.includes('mobilon')) return 'Technical Apparel';
    if (name.includes('velcro')) return 'Adjustable Closures';
    if (name.includes('gum')) return 'Packaging/Sealing';
    return 'Garment Trimming';
}

function getCordMaterial(name) {
    if (name.includes('elastic')) return 'Elastic Polyester';
    if (name.includes('drawstring')) return 'Cotton/Polyester';
    if (name.includes('tube')) return 'Tubular Braid';
    return 'Premium Textile';
}

function getStickerMaterial(name) {
    if (name.includes('poly')) return 'Polyester Film';
    if (name.includes('thermal')) return 'Thermal Paper';
    if (name.includes('barcode')) return 'Adhesive Paper';
    return 'Vinyl/Paper';
}

function getStickerPrintMethod(name) {
    if (name.includes('thermal')) return 'Direct Thermal';
    if (name.includes('barcode')) return 'Thermal Transfer';
    return 'Digital/Flexographic';
}

function getStickerResistance(name) {
    if (name.includes('poly')) return 'Chemical/UV Resistant';
    if (name.includes('carton')) return 'Weather Resistant';
    return 'Fade/Scratch Resistant';
}

// Toggle product info visibility
function toggleProductInfo() {
    const content = document.querySelector('.product-info-content');
    const link = document.querySelector('.see-more-link');
    const linkText = link.querySelector('.see-more-text');
    
    if (content.classList.contains('collapsed')) {
        // Expand
        content.classList.remove('collapsed');
        content.classList.add('expanded');
        link.classList.add('expanded');
        linkText.textContent = 'Less:';
        console.log('Product info expanded');
    } else {
        // Collapse
        content.classList.remove('expanded');
        content.classList.add('collapsed');
        link.classList.remove('expanded');
        linkText.textContent = 'More:';
        console.log('Product info collapsed');
        
        // Scroll back to top of product section smoothly
        document.querySelector('.product-details').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Update the DOMContentLoaded event to include product collapsible
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tab functionality
    initializeTabs();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize product collapsible functionality
    initializeProductCollapsible();
    
    // Load product images
    loadProductImages();
    
    console.log('All functionality initialized');
});

// Function to load product images
function loadProductImages() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const link = card.querySelector('a[href*="products/"]');
        if (link) {
            const href = link.getAttribute('href');
            const match = href.match(/products\/([^\/]+)\//);
            if (match) {
                const productId = match[1];
                const imageDiv = card.querySelector('.product-image');
                const placeholder = imageDiv.querySelector('.image-placeholder');
                
                if (placeholder) {
                    // Try to load an image
                    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
                    let imageFound = false;
                    
                    const tryNextExtension = (index) => {
                        if (index >= imageExtensions.length || imageFound) return;
                        
                        const ext = imageExtensions[index];
                        const img = new Image();
                        const imagePath = `products/${productId}/${productId}.${ext}`;
                        
                        img.onload = function() {
                            if (!imageFound) {
                                imageFound = true;
                                placeholder.outerHTML = `<img src="${imagePath}" alt="${placeholder.textContent}" class="product-image">`;
                            }
                        };
                        
                        img.onerror = function() {
                            tryNextExtension(index + 1);
                        };
                        
                        img.src = imagePath;
                    };
                    
                    tryNextExtension(0);
                }
            }
        }
    });
} 