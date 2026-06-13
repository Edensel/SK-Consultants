# SK Consultants Website

Professional consultancy website for SK Consultants - specializing in enterprise growth, market systems development, financial inclusion, and TVET.

## 🌐 Website Features

- **8 Core Services**: Enterprise Growth, Finance & Investment, Market Access, Organizational Development, Program Design, Capacity Building, TVET, and Sacco Developments
- **Responsive Design**: Mobile-first approach with desktop support
- **Contact Forms**: Secure Supabase integration for inquiries
- **Blog/Insights**: Curated articles on economic development topics
- **Professional Layout**: Modern, clean UI with smooth animations

## 🛡️ Security Features

- **Input Validation & Sanitization**: Protects against XSS attacks
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: Spam prevention (5 submissions/hour per IP)
- **Security Headers**: HSTS, CSP, X-Frame-Options, etc.
- **Subresource Integrity**: Verification of external dependencies
- **HTTPS Enforcement**: Automatic HTTP to HTTPS redirect

See [SECURITY.md](SECURITY.md) for comprehensive security documentation.

## 🚀 Quick Start

### Local Development

**Using Python (recommended):**
```bash
cd SK-Consultants
python -m http.server 8000
```

Then open `http://localhost:8000`

**Using Node.js:**
```bash
npm install -g http-server
http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

### Using VS Code

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## 📁 Project Structure

```
SK-Consultants/
├── index.html                    # Homepage
├── services.html                 # Services overview
├── insights.html                 # Blog/articles
├── script.js                     # JavaScript (forms, security)
├── styles.css                    # Main stylesheet
├── .htaccess                     # Apache security headers
├── robots.txt                    # SEO configuration
├── services/                     # Service detail pages (8)
├── insights/                     # Blog articles
├── images/                       # Logo and media
└── .well-known/
    └── security.txt              # Vulnerability disclosure
```

## 🔧 Configuration

### Setting Up Supabase (Required for Forms)

1. Create account at [Supabase](https://supabase.com)
2. Create new project
3. Create `messages` table with columns:
   - `id` (UUID, primary key)
   - `name` (text)
   - `email` (text)
   - `organization` (text)
   - `message` (text)
   - `submitted_at` (timestamp)
   - `csrf_token` (text)

4. Copy credentials to `script.js`:
```javascript
const SUPABASE_URL = 'your-url';
const SUPABASE_KEY = 'your-key';
```

### Environment Setup

Create `.env` file (see `.env.example`):
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

**Never commit `.env` file** - use `.env.example` as template.

## 📋 Service Pages

All service pages are located in `/services/`:

1. **enterprise-growth.html** - Business Strategy, Incubation, Planning & Modelling
2. **finance-investment.html** - Access to Finance & Investment Readiness
3. **market-access.html** - Market Access & Value Chain Development
4. **organizational-development.html** - Org. & Human Capital Development
5. **program-design.html** - Program Design, Delivery & Advisory
6. **capacity-building.html** - Training: Entrepreneurship, VSLA, Digital Marketing, ToT
7. **tvet-developments.html** - TVET: Assessments, Apprenticeships, Quality Assurance, etc.
8. **sacco-developments.html** - SACCO: Formation, Governance, Risk Management, etc.

## 📚 Blog/Insights

Articles located in `/insights/`:
- Investment Readiness
- Enterprise Growth Strategies
- Organizational Resilience
- TVET & Youth Development
- And more...

## 🔒 Security

### Deployed on Apache with:
- **HSTS** (1-year HTTPS enforcement)
- **Content-Security-Policy** (XSS prevention)
- **X-Frame-Options** (Clickjacking prevention)
- **Rate Limiting** (Spam prevention)
- **Input Sanitization** (Injection prevention)
- **CSRF Tokens** (Request forgery prevention)

**Important**: Enable Apache modules before deploying:
```bash
sudo a2enmod rewrite
sudo a2enmod headers
```

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for deployment verification steps.

## 📖 Documentation

- **[SECURITY.md](SECURITY.md)** - Complete security implementation guide
- **[SECURITY_SUMMARY.md](SECURITY_SUMMARY.md)** - Executive security overview
- **[SECURITY_QUICK_START.md](SECURITY_QUICK_START.md)** - 5-step deployment guide
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Pre/post deployment verification

## 🌍 Live Site

Visit: [skconsultants.global](https://skconsultants.global)

## 📞 Contact

- **Email**: info@skconsultants.global
- **Security Issues**: security@skconsultants.global
- **LinkedIn**: [Samuel Kablit](https://www.linkedin.com/in/samuelkablit)

## 📄 License

All rights reserved © 2026 SK Consultants

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## ⚡ Performance

- **GZIP Compression**: Enabled
- **CSS Minification**: Recommended
- **JavaScript Minification**: Recommended
- **Image Optimization**: Using external URLs
- **Load Time**: < 2 seconds on average connection

## 🚀 Deployment

### Apache Server
1. Upload files to `/var/www/your-domain/`
2. Enable `.htaccess` (AllowOverride All)
3. Enable Apache modules: `rewrite`, `headers`
4. Install SSL certificate
5. Configure `.env` with Supabase credentials
6. Run security verification checklist

### Other Servers
Convert `.htaccess` rules to your server configuration format.

## 🐛 Troubleshooting

**Forms not submitting?**
- Verify Supabase URL and Key in script.js
- Check browser console for errors
- Ensure CORS is configured in Supabase

**HTTPS not redirecting?**
- Verify `.htaccess` is in root directory
- Confirm Apache modules are enabled
- Check AllowOverride All in server config

**Styling issues?**
- Clear browser cache (Ctrl+Shift+Delete)
- Verify `styles.css` is in root directory
- Check console for file path errors

## 📈 Version History

- **v1.0** (June 2026) - Initial release with 8 services
- Security hardening implementation
- New TVET and Sacco service pages
- Comprehensive documentation

## 🤝 Contributing

For security improvements or feature requests, please contact the development team.

## ✨ Credits

Built with:
- HTML5
- CSS3
- JavaScript (Vanilla)
- [Supabase](https://supabase.com) - Backend
- [Font Awesome](https://fontawesome.com) - Icons
- [Google Fonts](https://fonts.google.com) - Typography

---

**Last Updated**: June 13, 2026  
**Maintained By**: SK Consultants Development Team  
**Status**: Production Ready ✅
