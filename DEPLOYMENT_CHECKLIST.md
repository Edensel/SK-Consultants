# SK Consultants - Security Deployment Checklist

## Pre-Deployment Security Verification

### Server Configuration
- [ ] Apache mod_rewrite is enabled
- [ ] Apache mod_headers is enabled
- [ ] .htaccess is in the root directory
- [ ] AllowOverride All is set for the website directory
- [ ] HTTPS certificate is installed and valid
- [ ] SSL/TLS version is 1.2 or higher

### File Permissions
- [ ] .htaccess: 644 (readable)
- [ ] Configuration files: NOT publicly accessible
- [ ] .env files: NOT in web root or deployed
- [ ] script.js: Contains no hardcoded passwords or tokens
- [ ] Supabase credentials: In environment variables, NOT in code

### Application Configuration
- [ ] Supabase URL configured correctly
- [ ] Supabase Anon Key configured correctly
- [ ] Environment variables properly set
- [ ] CSRF token generation is working
- [ ] Rate limiting is functional

### External Resources
- [ ] FontAwesome SRI hash verified (embedded)
- [ ] Supabase script SRI hash verified (embedded)
- [ ] Google Fonts loading correctly
- [ ] No mixed content (HTTP on HTTPS page)

### Content Security Policy
- [ ] CSP header is being sent
- [ ] Browser console shows no CSP violations
- [ ] External resources load without CSP errors
- [ ] Forms submit successfully

### Form Security
- [ ] Form validation working on client-side
- [ ] Rate limiting prevents multiple submissions
- [ ] Email validation rejects invalid emails
- [ ] Message sanitization removes malicious input
- [ ] CSRF token is included with submissions

### HTTPS & SSL/TLS
- [ ] Website redirects HTTP → HTTPS
- [ ] SSL certificate is valid
- [ ] No certificate warnings
- [ ] HSTS header is present
- [ ] Preload list submission considered (optional)

### Security Headers
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Permissions-Policy: Properly configured
- [ ] Content-Security-Policy: Active and appropriate

### Static File Security
- [ ] Directory listing disabled
- [ ] .env files blocked
- [ ] .git directory blocked
- [ ] Backup files (.bak, .old) blocked
- [ ] PHP execution disabled (if not needed)

### Monitoring & Logging
- [ ] Web server logs are being captured
- [ ] Error logs are monitored
- [ ] Access logs show normal traffic patterns
- [ ] No unusual error patterns detected

### Testing
- [ ] Run security scan (e.g., OWASP ZAP)
- [ ] Test form submission with invalid input
- [ ] Test rate limiting (5+ attempts in 1 hour)
- [ ] Test CSRF protection
- [ ] Verify email validation
- [ ] Test message sanitization

### Documentation
- [ ] SECURITY.md reviewed
- [ ] Security contact email available
- [ ] Vulnerability disclosure process documented
- [ ] Security configuration documented
- [ ] Team trained on security procedures

### Third-Party Security
- [ ] Supabase account security reviewed
- [ ] Two-factor authentication enabled on Supabase
- [ ] API keys rotated regularly
- [ ] Database backups enabled
- [ ] Row Level Security (RLS) policies reviewed

### Performance Security
- [ ] GZIP compression enabled
- [ ] Cache headers properly set
- [ ] No unnecessary redirects
- [ ] Response times acceptable
- [ ] No memory leaks in JavaScript

## Post-Deployment Monitoring

### Weekly
- [ ] Review error logs for unusual patterns
- [ ] Check form submission rates
- [ ] Verify HTTPS is enforced
- [ ] Confirm no CSP violations reported

### Monthly
- [ ] Security header compliance check
- [ ] Update log analysis
- [ ] Rate limiting effectiveness review
- [ ] Backup verification

### Quarterly
- [ ] Full security audit
- [ ] Dependency vulnerability scan
- [ ] CSP policy review
- [ ] Security headers update check
- [ ] SSL certificate expiration check (6 months prior)

### Annually
- [ ] Professional security assessment
- [ ] Penetration testing (recommended)
- [ ] Security policy review and update
- [ ] Team security training refresh

## Incident Response

### If a Vulnerability is Reported

1. [ ] Acknowledge receipt within 24 hours
2. [ ] Assess severity and scope
3. [ ] Create isolation environment for testing
4. [ ] Develop and test fix
5. [ ] Deploy fix to production
6. [ ] Verify fix effectiveness
7. [ ] Notify affected parties
8. [ ] Update security documentation
9. [ ] Conduct post-incident review

### If Attack is Detected

1. [ ] Isolate affected systems if necessary
2. [ ] Collect logs and evidence
3. [ ] Analyze attack method
4. [ ] Implement immediate mitigation
5. [ ] Develop long-term fix
6. [ ] Monitor for follow-up attacks
7. [ ] Document incident
8. [ ] Update security measures

## Regular Maintenance

### Monthly Tasks
- [ ] Review and rotate API keys if needed
- [ ] Check for dependency updates
- [ ] Review access logs
- [ ] Test backup restoration

### Quarterly Tasks
- [ ] Update security policy documentation
- [ ] Review and update firewall rules
- [ ] Audit user access and permissions
- [ ] Test incident response procedures

### Annually Tasks
- [ ] Conduct full security assessment
- [ ] Update SSL/TLS certificates
- [ ] Review and update security policies
- [ ] Security training for team members

## Security Improvements Roadmap

### Phase 1 (Current) - COMPLETED
- [x] Input validation and sanitization
- [x] CSRF protection
- [x] Rate limiting
- [x] Security headers (.htaccess)
- [x] Subresource Integrity (SRI)
- [x] Security documentation

### Phase 2 (Recommended)
- [ ] Email verification for form submissions
- [ ] CAPTCHA implementation
- [ ] Admin authentication panel
- [ ] Audit logging
- [ ] Web Application Firewall (WAF)

### Phase 3 (Advanced)
- [ ] Two-factor authentication
- [ ] DDoS protection
- [ ] Advanced threat detection
- [ ] Security Information and Event Management (SIEM)
- [ ] Regular penetration testing

## References & Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Mozilla Security Guidelines](https://infosec.mozilla.org/)
- [CWE/SANS Top 25](https://cwe.mitre.org/top25/)
- [Security Headers](https://securityheaders.com/)
- [SSL Labs](https://www.ssllabs.com/)

---

**Deployment Date**: _____________
**Verified By**: _____________
**Last Updated**: June 13, 2026
