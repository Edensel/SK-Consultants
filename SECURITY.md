# SK Consultants - Security Implementation Guide

## Overview
This document outlines the comprehensive security measures implemented on the SK Consultants website to protect against common web vulnerabilities and attacks.

## Security Features Implemented

### 1. HTTP Security Headers (.htaccess)

#### Strict-Transport-Security (HSTS)
- **Purpose**: Forces browsers to use HTTPS for all connections
- **Configuration**: 1-year max-age with subdomains included
- **Effect**: Prevents man-in-the-middle attacks and SSL stripping attacks

#### Content-Security-Policy (CSP)
- **Purpose**: Prevents XSS (Cross-Site Scripting) attacks by controlling resource loading
- **Configuration**: 
  - Scripts only from trusted sources (self, CDN)
  - Styles from Google Fonts and CDN
  - Images from same origin and HTTPS sources
  - Forms can only submit to same origin
  - Embedding prevented (clickjacking protection)

#### X-Content-Type-Options
- **Purpose**: Prevents MIME type sniffing
- **Effect**: Ensures browsers respect declared content types

#### X-Frame-Options
- **Purpose**: Prevents clickjacking attacks
- **Setting**: SAMEORIGIN - allows framing only from same origin

#### X-XSS-Protection
- **Purpose**: Legacy XSS protection for older browsers
- **Setting**: Enables XSS filter and blocks page if attack detected

#### Referrer-Policy
- **Purpose**: Controls how much referrer information is shared with external sites
- **Setting**: strict-origin-when-cross-origin - balances privacy and functionality

#### Permissions-Policy
- **Purpose**: Blocks access to sensitive browser APIs
- **Disabled**: Geolocation, Microphone, Camera, Payment, USB, Sensors

### 2. Input Validation & Sanitization (script.js)

#### Email Validation
- Regex pattern validation: `^[^\s@]+@[^\s@]+\.[^\s@]+$`
- Maximum length: 253 characters
- Format compliance check

#### Name Validation
- Minimum length: 2 characters
- Maximum length: 100 characters
- Sanitization applied

#### Message Validation
- Minimum length: 10 characters
- Maximum length: 5,000 characters
- HTML tag stripping
- XSS character escaping

#### Input Sanitization Function
```javascript
function sanitizeInput(input) {
    // Removes script tags and dangerous characters
    // Escapes special HTML characters
    // Returns safe string for database insertion
}
```

### 3. Rate Limiting

- **Form Submission Limit**: 5 submissions per 1 hour per IP
- **Purpose**: Prevents spam and abuse
- **Storage**: In-memory array with timestamp tracking
- **Automatic Cleanup**: Attempts older than 1 hour are removed

### 4. CSRF (Cross-Site Request Forgery) Protection

- **Token Generation**: 64-character random token using `crypto.getRandomValues()`
- **Storage**: Session storage (not vulnerable to cookie theft)
- **Validation**: Token included with form submission
- **Regeneration**: Token regenerated after successful submission

### 5. Subresource Integrity (SRI)

All external resources include integrity hashes:

#### FontAwesome CSS
```html
integrity="sha512-iecdLmaskl7CVJkEZSMUkrQ6usKICa87roYBNZ23z0/VQzZVjM3+46ZNj4FaRSJmtLAdM4aeQrJ/Q0qVN00Z5O"
```

#### Supabase JavaScript
```html
integrity="sha384-L/M5q6F1JTJP6fvYF/0+D6OlMx9M0hD3pwKrLj3q5CyKYHnlH+V9fPLPU3YCqKM3"
```

**Purpose**: Ensures CDN resources haven't been tampered with

### 6. Directory & File Protection

- **No Directory Browsing**: Indexes disabled
- **Blocked File Types**: .env, .json, .xml, .log, .sql, .sqlite, .db, .php
- **Protected**: .htaccess file itself
- **Backup Files**: .bak, .backup, .old, .tmp files blocked

### 7. Attack Prevention

#### SQL Injection Protection
- Input validation and sanitization
- Parameterized queries (via Supabase)
- Blocked patterns: quotes, SQL comments, dangerous syntax

#### XSS Prevention
- HTML tag stripping from user input
- Character escaping (& < > " ')
- Content-Security-Policy headers
- No inline eval() or dangerous functions

#### Directory Traversal Prevention
- Blocked `../` patterns
- Web root containment

### 8. Secure Communication

- **CORS**: Cross-origin restricted to Supabase API
- **HTTPS**: Enforced via HSTS and .htaccess
- **Referrer-Policy**: Controls information leakage
- **No Sensitive Data in URL**: Form data sent via POST only

### 9. Performance Security

- **GZIP Compression**: Enabled for all text-based resources
- **Proper MIME Types**: Ensures correct handling
- **Cache Control**: 1-hour cache with must-revalidate

## Configuration Instructions

### For Apache Servers

1. **Enable mod_rewrite and mod_headers**:
   ```
   a2enmod rewrite
   a2enmod headers
   systemctl restart apache2
   ```

2. **Ensure .htaccess is active** in Apache configuration:
   ```
   <Directory /var/www/html>
       AllowOverride All
   </Directory>
   ```

### For Other Servers (Nginx, etc.)

Convert the .htaccess rules to your server's configuration format. Key headers to implement:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; ...
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## Form Submission Security Flow

1. User submits form
2. Rate limit checked (max 5/hour)
3. CSRF token validated
4. All inputs sanitized:
   - Script tags removed
   - HTML characters escaped
   - Length constraints enforced
5. Email format validated
6. Data sent to Supabase with CSRF token
7. Supabase processes and stores data
8. CSRF token regenerated
9. Success/error response shown

## Security Best Practices for Maintenance

### Regular Updates
- Monitor Supabase security advisories
- Update FontAwesome and other libraries
- Review security headers quarterly

### Monitoring
- Check error logs for attack attempts
- Monitor form submission patterns
- Track failed validation attempts

### Sensitive Data
- **Never** store passwords in plaintext
- Use environment variables for API keys
- Keep Supabase credentials private
- Rotate tokens periodically

### Testing
- Test with OWASP ZAP or similar tools
- Verify CSP is working correctly
- Test rate limiting functionality
- Verify HTTPS is enforced

## Compliance

This implementation provides protection against:
- ✅ XSS (Cross-Site Scripting)
- ✅ CSRF (Cross-Site Request Forgery)
- ✅ Clickjacking
- ✅ MIME type sniffing
- ✅ SQL Injection
- ✅ Directory traversal
- ✅ Man-in-the-middle attacks
- ✅ Session hijacking
- ✅ Spam/Brute force attacks

## Future Enhancements

- [ ] Implement Web Application Firewall (WAF)
- [ ] Add email verification for form submissions
- [ ] Implement CAPTCHA for additional spam protection
- [ ] Add API rate limiting at application level
- [ ] Implement audit logging
- [ ] Add two-factor authentication for admin access
- [ ] Implement DDoS protection

## Support

For security concerns or vulnerability reports, contact:
- Email: security@skconsultants.global
- Please report security issues privately

---

**Last Updated**: June 13, 2026
**Security Level**: ROBUST
