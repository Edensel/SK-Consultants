# Security Quick Start Guide

## 🚀 Get Your Site Security-Ready in 5 Steps

### Step 1: Enable Apache Modules (5 min)
```bash
# SSH into your server
ssh user@yourserver.com

# Enable required modules
sudo a2enmod rewrite
sudo a2enmod headers

# Restart Apache
sudo systemctl restart apache2
```

### Step 2: Verify .htaccess Setup (2 min)
```bash
# Check that .htaccess exists in web root
ls -la /var/www/your-site/.htaccess

# Verify Apache configuration allows .htaccess
sudo grep -n "AllowOverride All" /etc/apache2/apache2.conf
# Or check your site's vhost config
```

### Step 3: Create Environment Configuration (5 min)
```bash
# Navigate to parent directory (outside web root)
cd /var/www

# Create .env file with your actual values
# Copy values from:
# - Supabase Dashboard > Settings > API
# - Create strong random string for SESSION_SECRET
nano .env

# Set proper permissions (readable by web server only)
chmod 600 .env

# Verify permissions
ls -la .env
```

### Step 4: Test Security Features (10 min)

**Test 1: HTTPS Redirection**
```
Visit: http://your-domain.com
Expected: Redirects to https://your-domain.com
```

**Test 2: Form Submission**
```
1. Go to contact form
2. Fill in valid data
3. Submit
4. Should see: "Thank you! Your message has been sent"
```

**Test 3: Form Validation**
```
1. Try empty fields → Should show validation errors
2. Try invalid email → Should show error
3. Try message < 10 chars → Should show error
```

**Test 4: Rate Limiting**
```
1. Submit form 5 times rapidly
2. 6th attempt should show: "Too many submission attempts"
3. Wait 1 hour or test in new incognito window
```

**Test 5: Check Security Headers**
```
Visit: https://securityheaders.com/
Enter your domain: your-domain.com
Review the report (should show A+ rating)
```

### Step 5: Run Security Scan (10 min)

**Online Tools:**
1. [Security Headers](https://securityheaders.com/) - Test security headers
2. [SSL Labs](https://www.ssllabs.com/ssltest/) - Test HTTPS/SSL config
3. [OWASP ZAP](https://www.zaproxy.org/) - Vulnerability scanning

---

## 🔍 Verify Everything is Working

### Checklist
```
✓ HTTPS enforced (http → https redirect)
✓ Security headers present (test with curl)
✓ Form submission working
✓ Form validation working
✓ Rate limiting working (max 5 per hour)
✓ No errors in browser console
✓ No CSP violations
✓ Email validation working
✓ Input sanitization working
```

### Test Commands (Linux/Mac)
```bash
# Check HTTPS enforcement
curl -i http://your-domain.com

# View security headers
curl -i https://your-domain.com | grep -i "strict-transport\|content-security\|x-frame"

# Check mod_rewrite is working
curl -I http://your-domain.com

# View .htaccess is active
curl -I https://your-domain.com/.env
# Should return 403 Forbidden
```

---

## 📋 Pre-Deployment Verification

Before going live, verify:

```
Server Configuration:
  [ ] Apache with mod_rewrite enabled
  [ ] Apache with mod_headers enabled
  [ ] HTTPS/SSL certificate installed
  [ ] .htaccess in website root

Application Setup:
  [ ] .env file created with correct values
  [ ] Supabase URL configured
  [ ] Supabase Anon Key configured
  [ ] Form working end-to-end
  [ ] Rate limiting active
  [ ] Email validation working

Security Verification:
  [ ] HTTPS redirects HTTP
  [ ] Security headers present
  [ ] HSTS header active
  [ ] CSP header active
  [ ] X-Frame-Options set
  [ ] No sensitive data in console logs
  [ ] No errors in error logs

Testing:
  [ ] Form submission successful
  [ ] Invalid input rejected
  [ ] Rate limiting effective
  [ ] CSRF token functioning
  [ ] SRI hashes valid
```

---

## 🛠️ Common Issues & Fixes

### Issue: "Module mod_rewrite not enabled"
**Solution:**
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### Issue: ".htaccess not working"
**Solution:**
```bash
# Check Apache config allows .htaccess
# In /etc/apache2/apache2.conf or vhost config:
# <Directory /var/www/your-site>
#     AllowOverride All
# </Directory>

sudo systemctl restart apache2
```

### Issue: "Form not submitting"
**Solution:**
1. Check browser console for errors
2. Verify Supabase URL and Key in script.js
3. Check Supabase database exists with "messages" table
4. Verify CORS settings in Supabase

### Issue: "CSP violations in console"
**Solution:**
1. Check what resource is being blocked
2. Add trusted domain to CSP in .htaccess
3. Use SRI for all external scripts
4. Test again

### Issue: "Rate limiting not working"
**Solution:**
1. Check console for rate limit message
2. Wait 1 hour between tests (or use different IP)
3. Check script.js for rate limiting code
4. Verify localStorage is enabled

---

## 🔐 Security Best Practices Checklist

### Daily/Weekly
- [ ] Monitor error logs for attacks
- [ ] Check form submission rates
- [ ] Verify HTTPS is enforced

### Monthly
- [ ] Review rate limiting effectiveness
- [ ] Check for dependency updates
- [ ] Audit access logs

### Quarterly
- [ ] Run security scan
- [ ] Update security headers if needed
- [ ] Review CSP policy
- [ ] Check SSL certificate expiration

### Annually
- [ ] Professional security audit
- [ ] Penetration testing
- [ ] Security training
- [ ] Update all dependencies

---

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `.htaccess` | Security headers & attack prevention |
| `script.js` | Input validation, CSRF, rate limiting |
| `SECURITY.md` | Detailed security documentation |
| `DEPLOYMENT_CHECKLIST.md` | Verification steps |
| `.env` | Sensitive configuration (not in repo) |
| `.env.example` | Configuration template |
| `robots.txt` | Crawler management |
| `.well-known/security.txt` | Vulnerability disclosure |

---

## 🎯 Success Criteria

Your site is secure when:

✅ HTTPS is enforced  
✅ All security headers are present  
✅ Form validation works  
✅ Rate limiting prevents abuse  
✅ CSRF protection is active  
✅ No sensitive data in logs  
✅ Security scan shows A+ rating  
✅ No errors in browser console  

---

## 📞 Support

### If Something Breaks
1. Check error logs: `/var/log/apache2/error.log`
2. Review browser console for JavaScript errors
3. Verify .htaccess syntax
4. Disable .htaccess temporarily to test
5. Review SECURITY.md for detailed help

### Helpful Resources
- Apache Docs: https://httpd.apache.org/docs/
- OWASP: https://owasp.org/
- Mozilla Security: https://infosec.mozilla.org/
- Supabase Docs: https://supabase.com/docs/

---

## Next Steps

1. ✅ Complete Step 1-5 above
2. ✅ Run pre-deployment checklist
3. ✅ Deploy to production
4. ✅ Run security scan
5. ✅ Setup monitoring
6. ✅ Train team on security procedures
7. ✅ Plan quarterly reviews

**Your site is now PRODUCTION-READY with robust security! 🎉**

---

Created: June 13, 2026  
Last Updated: June 13, 2026  
Status: READY FOR DEPLOYMENT
