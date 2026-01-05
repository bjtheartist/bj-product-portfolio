# Security Policy

## Overview

TemsVision website follows security best practices to protect user data and ensure a safe browsing experience.

## Security Measures Implemented

### 1. Content Security
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Protects against clickjacking attacks
- **Referrer Policy**: Controls referrer information sent with requests

### 2. Input Validation
- All form inputs are validated on the client side
- Email format validation
- Required field validation
- XSS prevention through React's built-in escaping

### 3. External Links
- All external links use `rel="noopener noreferrer"` to prevent:
  - Tab nabbing attacks
  - Information leakage via referrer

### 4. Dependencies
- Regular dependency audits recommended: `npm audit`
- Keep dependencies updated: `npm update`
- Use `npm audit fix` to automatically fix vulnerabilities

### 5. Build Security
- Production builds remove console logs and debugger statements
- Source maps disabled in production
- Code minification and obfuscation

## Recommendations for Deployment

### Vercel/Netlify Headers
Add these headers to your deployment configuration:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### Environment Variables
- Never commit API keys or secrets to the repository
- Use environment variables for sensitive configuration
- Keep `.env` files in `.gitignore`

### HTTPS
- Always serve the site over HTTPS
- Enable HSTS (HTTP Strict Transport Security) in production

## Reporting Vulnerabilities

If you discover a security vulnerability, please report it responsibly by contacting the site owner directly rather than creating a public issue.

## Regular Maintenance

1. **Weekly**: Check for npm audit warnings
2. **Monthly**: Update dependencies
3. **Quarterly**: Review security headers and policies

## Version History

- **v1.0.0**: Initial security implementation
  - Added security meta tags
  - Implemented input validation
  - Added external link protection
  - Configured build optimizations
