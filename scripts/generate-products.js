const fs = require('fs');
const path = require('path');

// Read the products data
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));

// Read the template
const template = fs.readFileSync(path.join(__dirname, '../templates/product-template.html'), 'utf8');

// Function to check for product images in a folder
function findProductImage(productFolder) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    try {
        const files = fs.readdirSync(productFolder);
        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (imageExtensions.includes(ext)) {
                return file;
            }
        }
    } catch (error) {
        // Folder doesn't exist or no access
    }
    return null;
}

// Function to generate a product page
function generateProductPage(product, productFolder) {
    let pageContent = template;
    
    // Check for product image
    const productImage = findProductImage(productFolder);
    
    // Replace placeholders with actual data
    pageContent = pageContent.replace(/{{PRODUCT_NAME}}/g, product.name);
    pageContent = pageContent.replace(/{{PRODUCT_SUBTITLE}}/g, product.subtitle);
    pageContent = pageContent.replace(/{{PRODUCT_DESCRIPTION}}/g, product.description);
    pageContent = pageContent.replace(/{{PRODUCT_CATEGORY}}/g, product.category);
    
    // Handle image or placeholder
    if (productImage) {
        pageContent = pageContent.replace(/<div class="image-placeholder">{{PRODUCT_IMAGE_PLACEHOLDER}}<\/div>/g, `<img src="${productImage}" alt="${product.name}" class="product-image">`);
    } else {
        pageContent = pageContent.replace(/{{PRODUCT_IMAGE_PLACEHOLDER}}/g, product.image_placeholder);
    }
    
    // Generate specifications HTML
    const specsHtml = product.specifications.map(spec => `<li>${spec}</li>`).join('\n');
    pageContent = pageContent.replace(/{{PRODUCT_SPECS}}/g, specsHtml);
    
    // Generate uses HTML
    const usesHtml = product.common_uses.map(use => `<li>${use}</li>`).join('\n');
    pageContent = pageContent.replace(/{{PRODUCT_USES}}/g, usesHtml);
    
    // Generate features HTML
    const featuresHtml = product.key_features.map(feature => `<li>${feature}</li>`).join('\n');
    pageContent = pageContent.replace(/{{PRODUCT_FEATURES}}/g, featuresHtml);
    
    // Generate related products HTML (commented out)
    const relatedProductsHtml = generateRelatedProductsHtml(product.related_products, productsData);
    const commentedRelatedProducts = `<!--\n${relatedProductsHtml}\n-->`;
    pageContent = pageContent.replace(/{{RELATED_PRODUCTS}}/g, commentedRelatedProducts);
    
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
    const relatedHtml = relatedProducts.slice(0, 3).map(product => {
        const productFolder = path.join(__dirname, '../products', product.id);
        const productImage = findProductImage(productFolder);
        const imageHtml = productImage 
            ? `<img src="../${product.id}/${productImage}" alt="${product.name}" class="product-image">` 
            : `<div class="image-placeholder">${product.image_placeholder}</div>`;
        
        return `
        <div class="related-product-card">
            <div class="related-product-image">
                ${imageHtml}
            </div>
            <h3>${product.name}</h3>
            <p>${product.subtitle}</p>
            <a href="../${product.id}/index.html" class="btn btn-outline">View Details</a>
        </div>
    `;
    }).join('');
    
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
        // Create product folder
        const productFolder = path.join(productsDir, product.id);
        if (!fs.existsSync(productFolder)) {
            fs.mkdirSync(productFolder, { recursive: true });
        }
        
        const pageContent = generateProductPage(product, productFolder);
        const fileName = 'index.html';
        const filePath = path.join(productFolder, fileName);
        
        fs.writeFileSync(filePath, pageContent);
        console.log(`Generated: ${product.id}/${fileName}`);
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
    <navbar-component></navbar-component>

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
                ${category.products.map(product => {
                    const productFolder = path.join(__dirname, '../products', product.id);
                    const productImage = findProductImage(productFolder);
                    const imageHtml = productImage 
                        ? `<img src="${product.id}/${productImage}" alt="${product.name}" class="product-image">` 
                        : `<div class="image-placeholder">${product.image_placeholder}</div>`;
                    
                    return `
                <div class="product-card">
                    <div class="product-image">
                        ${imageHtml}
                    </div>
                    <h3>${product.name}</h3>
                    <p>${product.subtitle}</p>
                    <div class="product-actions">
                        <a href="${product.id}/index.html" class="btn btn-primary">View Details</a>
                    </div>
                </div>
                `;
                }).join('')}
            </div>
        </div>
    </section>

    <footer-component></footer-component>

    <script src="../components/navbar.js"></script>
    <script src="../components/footer.js"></script>
    <script src="../script.js"></script>
</body>
</html>`;
    
    return categoryTemplate;
}

console.log('Product generation complete!'); 