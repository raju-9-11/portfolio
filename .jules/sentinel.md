## 2024-02-14 - Security Hardening: Headers & Input Validation
**Vulnerability:**
1. Missing HTTP Security Headers (CSP, HSTS, etc.) allowing potential XSS/Clickjacking.
2. Missing Input Validation on Contact Form allowing malformed data or DoS payloads.

**Learning:**
React applications hosted on static platforms (Firebase Hosting) often default to permissive configurations. Defense-in-depth requires explicit configuration at the hosting level and strict validation at the application level before data transmission.

**Prevention:**
1. Enforce strict CSP in `firebase.json`.
2. Sanitize and validate all user inputs on the client-side (and server-side where applicable) before processing.
