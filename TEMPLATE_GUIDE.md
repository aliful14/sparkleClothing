# Sparkle Website Template System Guide

This guide explains how to use the modular template system for managing products on the Sparkle Clothing Company website.

## 📁 File Structure

```
Sparkle/
├── index.html              # Main homepage
├── about.html              # About us page
├── products.html           # Main products overview page
├── contact.html            # Contact page
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
├── generate-products.bat   # Windows batch file to generate products
├── templates/
│   └── product-template.html  # Template for individual product pages
├── data/
│   └── products.json       # Product data in JSON format
├── scripts/
│   └── generate-products.js    # Node.js script to generate product pages
├── products/               # Generated individual product pages (auto-created)
└── README.md               # Main documentation
```

## 🚀 Quick Start

### 1. Generate Product Pages

To create individual product pages from the template:

**Windows:**

```bash
# Double-click the batch file
generate-products.bat
```

**Manual (requires Node.js):**

```bash
node scripts/generate-products.js
```

This will:

- Create a `products/` directory
- Generate individual HTML pages for each product
- Create category index pages
- Link everything together automatically

### 2. View the Results

After generation, you'll have:

- Individual product pages: `products/woven-labels.html`, `products/satin-labels.html`, etc.
- Category pages: `products/labels.html`, `products/patches.html`, `products/elastic.html`
- All pages linked to the main products page

## 📝 Managing Product Data

### Adding New Products

1. **Edit `data/products.json`**
2. **Add a new product object** in the appropriate category:

```json
{
  "id": "new-product-id",
  "name": "New Product Name",
  "subtitle": "Brief product description",
  "description": "Detailed product description...",
  "category": "Labels & Tags",
  "image_placeholder": "Product",
  "specifications": ["Spec 1: Value", "Spec 2: Value", "Spec 3: Value"],
  "common_uses": ["Use case 1", "Use case 2", "Use case 3"],
  "key_features": ["Feature 1", "Feature 2", "Feature 3"],
  "related_products": ["product-id-1", "product-id-2", "product-id-3"]
}
```

3. **Run the generator** to create the new product page

### Updating Existing Products

1. **Edit the product data** in `data/products.json`
2. **Run the generator** to update the HTML files
3. **The changes will be reflected** in the individual product pages

### Product Data Fields

| Field               | Description                       | Required |
| ------------------- | --------------------------------- | -------- |
| `id`                | Unique identifier (used in URLs)  | Yes      |
| `name`              | Product name (displayed as title) | Yes      |
| `subtitle`          | Brief description under the title | Yes      |
| `description`       | Detailed product description      | Yes      |
| `category`          | Product category name             | Yes      |
| `image_placeholder` | Text shown in image placeholder   | Yes      |
| `specifications`    | Array of technical specifications | Yes      |
| `common_uses`       | Array of use cases                | Yes      |
| `key_features`      | Array of key features             | Yes      |
| `related_products`  | Array of related product IDs      | Yes      |

## 🎨 Template Customization

### Modifying the Template

1. **Edit `templates/product-template.html`**
2. **Use placeholders** for dynamic content:
   - `{{PRODUCT_NAME}}` - Product name
   - `{{PRODUCT_SUBTITLE}}` - Product subtitle
   - `{{PRODUCT_DESCRIPTION}}` - Product description
   - `{{PRODUCT_CATEGORY}}` - Product category
   - `{{PRODUCT_IMAGE_PLACEHOLDER}}` - Image placeholder text
   - `{{PRODUCT_SPECS}}` - Generated specifications HTML
   - `{{PRODUCT_USES}}` - Generated uses HTML
   - `{{PRODUCT_FEATURES}}` - Generated features HTML
   - `{{RELATED_PRODUCTS}}` - Generated related products HTML

### Adding New Placeholders

1. **Add the placeholder** in the template: `{{NEW_FIELD}}`
2. **Update the generator script** in `scripts/generate-products.js`
3. **Add the replacement logic** in the `generateProductPage` function

## 🔧 Advanced Customization

### Adding Product Images

1. **Create an `images/` directory** in the products folder
2. **Add product images** with consistent naming: `product-id-1.jpg`, `product-id-2.jpg`
3. **Update the template** to include image galleries
4. **Modify the generator** to include image references

### Custom Styling

1. **Add CSS classes** in `styles.css`
2. **Update the template** to use new classes
3. **The styles will apply** to all generated pages

### SEO Optimization

1. **Add meta tags** to the template
2. **Include structured data** for better search engine visibility
3. **Update the generator** to include SEO-friendly URLs

## 📱 Responsive Design

The template system includes responsive design for:

- **Desktop** (> 1024px)
- **Tablet** (768px - 1024px)
- **Mobile** (< 768px)

All generated pages will automatically be responsive.

## 🔄 Workflow for Updates

### Regular Product Updates

1. **Edit `data/products.json`**
2. **Run `generate-products.bat`**
3. **Test the changes** by opening the generated pages
4. **Deploy the updated files**

### Adding New Categories

1. **Add the category** to `data/products.json`
2. **Update the main products page** to include the new category
3. **Run the generator**
4. **Test the new category pages**

### Bulk Updates

1. **Prepare all changes** in `data/products.json`
2. **Run the generator once** to update all pages
3. **Review the changes** across all generated pages

## 🛠️ Troubleshooting

### Common Issues

**Generator doesn't run:**

- Ensure Node.js is installed
- Check that all files exist in the correct locations
- Verify JSON syntax in `data/products.json`

**Pages not linking correctly:**

- Check that product IDs match between JSON and template
- Verify file paths in the generated HTML
- Ensure the `products/` directory exists

**Styling issues:**

- Check that `styles.css` is properly linked
- Verify CSS class names match between template and stylesheet
- Test responsive design on different screen sizes

### File Permissions

On some systems, you may need to:

- **Run the batch file as administrator**
- **Check file write permissions** for the products directory
- **Ensure Node.js has access** to read/write files

## 📈 Performance Considerations

### Optimization Tips

1. **Minimize image sizes** for faster loading
2. **Use consistent naming** for easier management
3. **Keep product descriptions** concise but informative
4. **Regularly clean up** unused product data

### Caching

- **Generated pages** can be cached by browsers
- **Consider implementing** a build process for production
- **Use version numbers** for CSS/JS files to force cache updates

## 🚀 Deployment

### Static Hosting

The generated pages work with any static hosting service:

- **Netlify** - Drag and drop the entire folder
- **Vercel** - Connect your repository
- **GitHub Pages** - Push to a repository
- **AWS S3** - Upload files to an S3 bucket

### Custom Domain

1. **Purchase a domain name**
2. **Configure DNS settings**
3. **Update hosting provider settings**
4. **Update any hardcoded URLs** in the template

## 📞 Support

For questions or issues:

- **Email**: info@sparkleclothing.com
- **Phone**: +1 (555) 123-4567

---

**Note**: This template system is designed to make product management easy and efficient. Regular backups of your `data/products.json` file are recommended.
