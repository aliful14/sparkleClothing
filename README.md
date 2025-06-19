# Sparkle Clothing Company Website

A modern, minimalist static website for Sparkle Clothing Company, showcasing premium RMG accessories including labels, tags, and packaging solutions.

## 🌟 Features

### Design

- **Modern & Minimalist**: Clean black and white design with plenty of white space
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Subtle hover effects and scroll animations
- **Professional Typography**: Uses Inter font family for modern readability

### Pages

1. **Home Page** (`index.html`)

   - Hero section with compelling messaging
   - Feature highlights
   - Product preview
   - Call-to-action buttons

2. **About Us** (`about.html`)

   - Company story and mission
   - Core values
   - Team member profiles
   - Company history

3. **Products** (`products.html`)

   - Product categories (Labels, Hang Tags, Packaging)
   - Detailed product specifications
   - Custom solutions section
   - Product features and benefits

4. **Contact Us** (`contact.html`)
   - Contact information
   - Interactive contact form
   - FAQ section
   - Business hours and location

### Technical Features

- **Mobile-First Design**: Optimized for mobile devices
- **Fast Loading**: Lightweight and optimized for performance
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Accessibility**: WCAG compliant design
- **Cross-Browser Compatible**: Works on all modern browsers

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- A local web server (optional, for development)

### Installation

1. Download or clone the project files
2. Open `index.html` in your web browser
3. Navigate through the pages using the navigation menu

### Local Development

For the best development experience, use a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📁 File Structure

```
Sparkle/
├── index.html          # Home page
├── about.html          # About us page
├── products.html       # Products page
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Customization

### Colors

The website uses a black and white color scheme:

- Primary: `#1a1a1a` (Dark gray/black)
- Secondary: `#666` (Medium gray)
- Background: `#ffffff` (White)
- Accent: `#f8f9fa` (Light gray)

### Typography

- Font Family: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700

### Content Updates

To update content:

1. **Text Content**: Edit the HTML files directly
2. **Styling**: Modify `styles.css`
3. **Functionality**: Update `script.js`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## 📞 Contact Form

The contact form includes:

- Form validation
- Email format checking
- Required field validation
- Success/error messaging
- Loading states

**Note**: The form currently shows a success message but doesn't actually send emails. To make it functional, you'll need to:

1. Set up a backend server
2. Configure email sending (e.g., using NodeMailer, PHP mail, or a service like Formspree)
3. Update the form submission handler in `script.js`

## 🚀 Deployment

### Static Hosting

This website can be deployed to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Push to a repository and enable Pages
- **AWS S3**: Upload files to an S3 bucket
- **Firebase Hosting**: Use Firebase CLI

### Custom Domain

1. Purchase a domain name
2. Configure DNS settings
3. Update hosting provider settings
4. Update any hardcoded URLs in the HTML files

## 📈 SEO Optimization

The website includes:

- Proper meta tags
- Semantic HTML structure
- Alt text for images (when added)
- Clean URL structure
- Fast loading times

## 🔒 Security Considerations

- No sensitive data is stored
- Form validation on both client and server side (when implemented)
- HTTPS recommended for production

## 🎯 Future Enhancements

Potential improvements:

- Add real product images
- Implement a blog section
- Add a shopping cart (if needed)
- Integrate with a CMS
- Add analytics tracking
- Implement a newsletter signup
- Add social media integration

## 📄 License

This project is created for Sparkle Clothing Company. All rights reserved.

## 🤝 Support

For questions or support:

- Email: info@sparkleclothing.com
- Phone: +1 (555) 123-4567

---

**Sparkle Clothing Company** - Premium RMG accessories for discerning brands.
