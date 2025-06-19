const fs = require('fs');
const path = require('path');

// Read the products data
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));

// Read the template
const template = fs.readFileSync(path.join(__dirname, '../templates/product-template.html'), 'utf8');

// Function to generate a product page
function generateProductPage(product) {
    let pageContent = template;
    
    // Replace placeholders with actual data
    pageContent = pageContent.replace(/{{PRODUCT_NAME}}/g, product.name);
    pageContent = pageContent.replace(/{{PRODUCT_SUBTITLE}}/g, product.subtitle);
    pageContent = pageContent.replace(/{{PRODUCT_DESCRIPTION}}/g, product.description);
    pageContent = pageContent.replace(/{{PRODUCT_CATEGORY}}/g, product.category);
    pageContent = pageContent.replace(/{{PRODUCT_IMAGE_PLACEHOLDER}}/g, product.image_placeholder);
    
    // Generate specifications HTML
    const specsHtml = product.specifications.map(spec => `<li>${spec}</li>`).join('\n');
    pageContent = pageContent.replace(/{{PRODUCT_SPECS}}/g, specsHtml);
    
    // Generate uses HTML
    const usesHtml = product.common_uses.map(use => `<li>${use}</li>`).join('\n');
    pageContent = pageContent.replace(/{{PRODUCT_USES}}/g, usesHtml);
    
    // Generate features HTML
    const featuresHtml = product.key_features.map(feature => `<li>${feature}</li>`).join('\n');
    pageContent = pageContent.replace(/{{PRODUCT_FEATURES}}/g, featuresHtml);
    
    // Generate related products HTML
    const relatedProductsHtml = generateRelatedProductsHtml(product.related_products, productsData);
    pageContent = pageContent.replace(/{{RELATED_PRODUCTS}}/g, relatedProductsHtml);
    
    return pageContent;
}

// Function to generate related products HTML
function generateRelatedProductsHtml(relatedProductIds, allProductsData) {
    const relatedProducts = [];
    
    // Find related products from all categories
    Object.values(allProductsData.categories).forEach(category => {
        category.products.forEach(product => {
            if (relatedProductIds.includes(product.id)) {
                relatedProducts.push(product);
            }
        });
    });
    
    // Generate HTML for related products (limit to 3)
    const relatedHtml = relatedProducts.slice(0, 3).map(product => `
        <div class="related-product-card">
            <div class="related-product-image">
                <div class="image-placeholder">${product.image_placeholder}</div>
            </div>
            <h3>${product.name}</h3>
            <p>${product.subtitle}</p>
            <a href="${product.id}.html" class="btn btn-outline">View Details</a>
        </div>
    `).join('');
    
    return relatedHtml;
}

// Create products directory if it doesn't exist
const productsDir = path.join(__dirname, '../products');
if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
}

// Generate individual product pages
Object.values(productsData.categories).forEach(category => {
    category.products.forEach(product => {
        const pageContent = generateProductPage(product);
        const fileName = `${product.id}.html`;
        const filePath = path.join(productsDir, fileName);
        
        fs.writeFileSync(filePath, pageContent);
        console.log(`Generated: ${fileName}`);
    });
});

// Generate category index pages
Object.entries(productsData.categories).forEach(([categoryKey, category]) => {
    const categoryPageContent = generateCategoryPage(category, categoryKey);
    const fileName = `${categoryKey}.html`;
    const filePath = path.join(productsDir, fileName);
    
    fs.writeFileSync(filePath, categoryPageContent);
    console.log(`Generated category page: ${fileName}`);
});

// Function to generate category page
function generateCategoryPage(category, categoryKey) {
    const categoryTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${category.name} - Sparkle Clothing Company</title>
    <meta name="description" content="${category.description}">
    <link rel="stylesheet" href="../styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <h2>Sparkle</h2>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="../index.html" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="../about.html" class="nav-link">About</a>
                </li>
                <li class="nav-item">
                    <a href="../products.html" class="nav-link active">Products</a>
                </li>
                <li class="nav-item">
                    <a href="../contact.html" class="nav-link">Contact</a>
                </li>
            </ul>
            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>

    <!-- Category Hero -->
    <section class="category-hero">
        <div class="container">
            <div class="category-hero-content">
                <h1>${category.name}</h1>
                <p>${category.description}</p>
            </div>
        </div>
    </section>

    <!-- Category Products -->
    <section class="category-products">
        <div class="container">
            <div class="products-grid">
                ${category.products.map(product => `
                <div class="product-card">
                    <div class="product-image">
                        <div class="image-placeholder">${product.image_placeholder}</div>
                    </div>
                    <h3>${product.name}</h3>
                    <p>${product.subtitle}</p>
                    <div class="product-actions">
                        <a href="${product.id}.html" class="btn btn-primary">View Details</a>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Footer -->
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
                        <li><a href="../index.html">Home</a></li>
                        <li><a href="../about.html">About</a></li>
                        <li><a href="../products.html">Products</a></li>
                        <li><a href="../contact.html">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <p>Email: info@sparkleclothing.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Sparkle Clothing Company. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="../script.js"></script>
</body>
</html>`;
    
    return categoryTemplate;
}

console.log('Product generation complete!'); 