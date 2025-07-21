/**
 * Pro Build Digital - Security Module
 * Client-side security enhancements
 */

(function() {
    'use strict';
    
    const Security = {
        // Initialize security measures
        init: function() {
            try {
                this.preventRightClick();
                this.preventDevTools();
                this.sanitizeInputs();
                this.addCSRFProtection();
                this.validateForms();
                this.preventXSS();
            } catch (error) {
                console.error('Security module initialization failed:', error);
            }
        },
        
        // Prevent right-click context menu (optional - can be disabled for accessibility)
        preventRightClick: function() {
            // Uncomment if you want to disable right-click
            /*
            document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
            });
            */
        },
        
        // Basic dev tools detection (not foolproof)
        preventDevTools: function() {
            // Uncomment if you want basic dev tools detection
            /*
            let devtools = {open: false, orientation: null};
            const threshold = 160;
            
            setInterval(() => {
                if (window.outerHeight - window.innerHeight > threshold || 
                    window.outerWidth - window.innerWidth > threshold) {
                    if (!devtools.open) {
                        devtools.open = true;
                        console.clear();
                        console.log('%c🔒 Pro Build Digital', 'color: #0B1F3A; font-size: 20px; font-weight: bold;');
                        console.log('%cThis is a browser feature intended for developers. Please contact us if you need technical support.', 'color: #666; font-size: 14px;');
                    }
                } else {
                    devtools.open = false;
                }
            }, 500);
            */
        },
        
        // Sanitize form inputs
        sanitizeInputs: function() {
            const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
            
            inputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    // Remove potentially dangerous characters
                    let value = e.target.value;
                    value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                    value = value.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
                    value = value.replace(/javascript:/gi, '');
                    value = value.replace(/on\w+\s*=/gi, '');
                    
                    if (value !== e.target.value) {
                        e.target.value = value;
                        console.warn('Potentially dangerous content was removed from input');
                    }
                });
            });
        },
        
        // Add CSRF protection to forms
        addCSRFProtection: function() {
            const forms = document.querySelectorAll('form');
            
            forms.forEach(form => {
                // Generate a simple CSRF token (in production, use server-generated tokens)
                const timestamp = Date.now();
                const random = Math.random().toString(36).substring(2);
                const token = btoa(`${timestamp}-${random}`);
                
                // Add hidden CSRF token field
                const csrfField = document.createElement('input');
                csrfField.type = 'hidden';
                csrfField.name = 'csrf_token';
                csrfField.value = token;
                form.appendChild(csrfField);
                
                // Store token in session storage for validation
                sessionStorage.setItem('csrf_token', token);
            });
        },
        
        // Enhanced form validation
        validateForms: function() {
            const forms = document.querySelectorAll('form');
            
            forms.forEach(form => {
                form.addEventListener('submit', (e) => {
                    if (!this.validateForm(form)) {
                        e.preventDefault();
                        return false;
                    }
                });
            });
        },
        
        validateForm: function(form) {
            let isValid = true;
            
            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    this.showError(field, 'This field is required');
                    isValid = false;
                } else {
                    this.clearError(field);
                }
            });
            
            // Validate email fields
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !this.validateEmail(field.value)) {
                    this.showError(field, 'Please enter a valid email address');
                    isValid = false;
                }
            });
            
            // Validate phone fields
            const phoneFields = form.querySelectorAll('input[type="tel"]');
            phoneFields.forEach(field => {
                if (field.value && !this.validatePhone(field.value)) {
                    this.showError(field, 'Please enter a valid phone number');
                    isValid = false;
                }
            });
            
            // Check CSRF token
            const csrfToken = form.querySelector('input[name="csrf_token"]');
            const storedToken = sessionStorage.getItem('csrf_token');
            if (!csrfToken || csrfToken.value !== storedToken) {
                console.error('CSRF token validation failed');
                isValid = false;
            }
            
            return isValid;
        },
        
        validateEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        
        validatePhone: function(phone) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
            return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
        },
        
        showError: function(field, message) {
            this.clearError(field);
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-500 text-sm mt-1';
            errorDiv.textContent = message;
            
            field.classList.add('border-red-500');
            field.parentNode.appendChild(errorDiv);
        },
        
        clearError: function(field) {
            field.classList.remove('border-red-500');
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        },
        
        // Basic XSS prevention
        preventXSS: function() {
            // Encode any user-generated content
            const userContent = document.querySelectorAll('[data-user-content]');
            
            userContent.forEach(element => {
                const content = element.textContent;
                element.textContent = this.escapeHtml(content);
            });
        },
        
        escapeHtml: function(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },
        
        // Rate limiting for form submissions
        rateLimiter: {
            submissions: new Map(),
            
            isAllowed: function(formId, limit = 3, window = 60000) {
                const now = Date.now();
                const key = formId;
                
                if (!this.submissions.has(key)) {
                    this.submissions.set(key, []);
                }
                
                const timestamps = this.submissions.get(key);
                
                // Remove old timestamps
                const validTimestamps = timestamps.filter(time => now - time < window);
                
                if (validTimestamps.length >= limit) {
                    return false;
                }
                
                validTimestamps.push(now);
                this.submissions.set(key, validTimestamps);
                
                return true;
            }
        },
        
        // Content Security Policy violation reporting
        setupCSPReporting: function() {
            document.addEventListener('securitypolicyviolation', (e) => {
                console.warn('CSP Violation:', {
                    directive: e.violatedDirective,
                    blockedURI: e.blockedURI,
                    lineNumber: e.lineNumber,
                    columnNumber: e.columnNumber,
                    sourceFile: e.sourceFile
                });
                
                // In production, send this to your logging service
                // this.reportSecurityViolation(e);
            });
        },
        
        // Report security violations (implement with your logging service)
        reportSecurityViolation: function(violation) {
            // Example implementation
            /*
            fetch('/api/security/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'csp_violation',
                    violation: {
                        directive: violation.violatedDirective,
                        blockedURI: violation.blockedURI,
                        lineNumber: violation.lineNumber,
                        columnNumber: violation.columnNumber,
                        sourceFile: violation.sourceFile,
                        timestamp: new Date().toISOString()
                    }
                })
            }).catch(error => {
                console.error('Failed to report security violation:', error);
            });
            */
        }
    };
    
    // Initialize security when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            Security.init();
            Security.setupCSPReporting();
        });
    } else {
        Security.init();
        Security.setupCSPReporting();
    }
    
    // Make Security object available globally for debugging (remove in production)
    window.ProBuildSecurity = Security;
    
})();