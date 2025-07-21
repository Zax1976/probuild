/**
 * Pro Build Digital - Contact Form Module
 * Handles form validation, submission, and error handling
 */

(function() {
    'use strict';
    
    // Error handling utility
    const ErrorHandler = {
        log: function(error, context = 'Contact Form') {
            console.error(`[${context}]`, error);
        }
    };
    
    const ContactForm = {
        // Form elements
        form: null,
        submitButton: null,
        successMessage: null,
        errorMessage: null,
        
        // Form fields
        fields: {
            name: null,
            email: null,
            phone: null,
            businessType: null,
            services: null,
            message: null
        },
        
        // Validation state
        isSubmitting: false,
        
        init: function() {
            try {
                this.cacheElements();
                this.bindEvents();
                this.setupValidation();
                console.log('Contact form module initialized successfully');
            } catch (error) {
                ErrorHandler.log(error, 'Contact Form Init');
            }
        },
        
        cacheElements: function() {
            try {
                this.form = document.getElementById('contact-form');
                this.submitButton = this.form ? this.form.querySelector('button[type="submit"]') : null;
                this.successMessage = document.getElementById('form-success');
                this.errorMessage = document.getElementById('form-error');
                
                // Cache form fields
                this.fields.name = document.getElementById('name');
                this.fields.email = document.getElementById('email');
                this.fields.phone = document.getElementById('phone');
                this.fields.businessType = document.getElementById('business-type');
                this.fields.services = document.querySelectorAll('input[name="services"]');
                this.fields.message = document.getElementById('message');
                
                // Validate required elements exist
                if (!this.form) {
                    throw new Error('Contact form not found');
                }
                
            } catch (error) {
                ErrorHandler.log(error, 'Cache Elements');
            }
        },
        
        bindEvents: function() {
            try {
                if (!this.form) return;
                
                // Form submission
                this.form.addEventListener('submit', (e) => {
                    try {
                        e.preventDefault();
                        this.handleSubmit();
                    } catch (error) {
                        ErrorHandler.log(error, 'Form Submit');
                    }
                });
                
                // Real-time validation
                Object.keys(this.fields).forEach(fieldName => {
                    const field = this.fields[fieldName];
                    
                    if (field && field.length) {
                        // Handle checkbox groups
                        field.forEach(checkbox => {
                            checkbox.addEventListener('change', () => {
                                try {
                                    this.validateField(fieldName);
                                } catch (error) {
                                    ErrorHandler.log(error, 'Checkbox Validation');
                                }
                            });
                        });
                    } else if (field) {
                        // Handle regular form fields
                        field.addEventListener('blur', () => {
                            try {
                                this.validateField(fieldName);
                            } catch (error) {
                                ErrorHandler.log(error, 'Field Validation');
                            }
                        });
                        
                        field.addEventListener('input', () => {
                            try {
                                this.clearFieldError(fieldName);
                            } catch (error) {
                                ErrorHandler.log(error, 'Clear Field Error');
                            }
                        });
                    }
                });
                
                // Phone number formatting
                if (this.fields.phone) {
                    this.fields.phone.addEventListener('input', (e) => {
                        try {
                            this.formatPhoneNumber(e.target);
                        } catch (error) {
                            ErrorHandler.log(error, 'Phone Formatting');
                        }
                    });
                }
                
            } catch (error) {
                ErrorHandler.log(error, 'Bind Events');
            }
        },
        
        setupValidation: function() {
            try {
                // Add validation rules
                this.validationRules = {
                    name: {
                        required: true,
                        minLength: 2,
                        maxLength: 50,
                        pattern: /^[a-zA-Z\s'-]+$/
                    },
                    email: {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    },
                    phone: {
                        required: false,
                        pattern: /^[\d\s\-\(\)\+\.]+$/
                    },
                    businessType: {
                        required: false
                    },
                    services: {
                        required: false
                    },
                    message: {
                        required: true,
                        minLength: 10,
                        maxLength: 1000
                    }
                };
                
            } catch (error) {
                ErrorHandler.log(error, 'Setup Validation');
            }
        },
        
        validateField: function(fieldName) {
            try {
                const field = this.fields[fieldName];
                const rules = this.validationRules[fieldName];
                
                if (!field || !rules) return true;
                
                let value = '';
                let isValid = true;
                let errorMessage = '';
                
                // Handle different field types
                if (fieldName === 'services') {
                    // Checkbox group
                    const checkedServices = Array.from(field).filter(cb => cb.checked);
                    value = checkedServices.map(cb => cb.value).join(', ');
                } else {
                    // Regular field
                    value = field.value ? field.value.trim() : '';
                }
                
                // Required validation
                if (rules.required && !value) {
                    isValid = false;
                    errorMessage = `${this.getFieldLabel(fieldName)} is required.`;
                }
                
                // Length validation
                if (isValid && rules.minLength && value.length < rules.minLength) {
                    isValid = false;
                    errorMessage = `${this.getFieldLabel(fieldName)} must be at least ${rules.minLength} characters.`;
                }
                
                if (isValid && rules.maxLength && value.length > rules.maxLength) {
                    isValid = false;
                    errorMessage = `${this.getFieldLabel(fieldName)} must be no more than ${rules.maxLength} characters.`;
                }
                
                // Pattern validation
                if (isValid && rules.pattern && value && !rules.pattern.test(value)) {
                    isValid = false;
                    errorMessage = this.getPatternErrorMessage(fieldName);
                }
                
                // Update UI
                if (isValid) {
                    this.clearFieldError(fieldName);
                } else {
                    this.showFieldError(fieldName, errorMessage);
                }
                
                return isValid;
                
            } catch (error) {
                ErrorHandler.log(error, 'Validate Field');
                return false;
            }
        },
        
        validateForm: function() {
            try {
                let isValid = true;
                
                // Validate all fields
                Object.keys(this.fields).forEach(fieldName => {
                    if (!this.validateField(fieldName)) {
                        isValid = false;
                    }
                });
                
                return isValid;
                
            } catch (error) {
                ErrorHandler.log(error, 'Validate Form');
                return false;
            }
        },
        
        handleSubmit: function() {
            try {
                if (this.isSubmitting) return;
                
                // Validate form
                if (!this.validateForm()) {
                    this.showError('Please fix the errors above and try again.');
                    return;
                }
                
                // Set submitting state
                this.isSubmitting = true;
                this.showLoading();
                
                // Collect form data
                const formData = this.collectFormData();
                
                // Submit form
                this.submitForm(formData);
                
            } catch (error) {
                ErrorHandler.log(error, 'Handle Submit');
                this.showError('An error occurred while submitting the form. Please try again.');
                this.hideLoading();
            }
        },
        
        collectFormData: function() {
            try {
                const services = Array.from(this.fields.services)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                
                return {
                    name: this.fields.name.value.trim(),
                    email: this.fields.email.value.trim(),
                    phone: this.fields.phone.value.trim(),
                    businessType: this.fields.businessType.value,
                    services: services,
                    message: this.fields.message.value.trim(),
                    timestamp: new Date().toISOString(),
                    source: 'probuild-website'
                };
                
            } catch (error) {
                ErrorHandler.log(error, 'Collect Form Data');
                return {};
            }
        },
        
        submitForm: function(formData) {
            try {
                // Try PHP backend first, then fallback to mailto if needed
                this.tryPhpSubmission(formData)
                    .catch(error => {
                        console.log('PHP submission failed, trying fallback method:', error);
                        return this.tryFallbackSubmission(formData);
                    })
                    .catch(error => {
                        ErrorHandler.log(error, 'All submission methods failed');
                        this.showError('Unable to send message. Please email us directly at probuilddigital1@gmail.com or call (614) 403-8014.');
                    })
                    .finally(() => {
                        this.hideLoading();
                    });
                
            } catch (error) {
                ErrorHandler.log(error, 'Submit Form');
                this.showError('An error occurred while submitting the form.');
                this.hideLoading();
            }
        },
        
        tryPhpSubmission: function(formData) {
            return fetch('contact-handler.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    this.showSuccess();
                    this.resetForm();
                    
                    // Analytics tracking
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submit', {
                            event_category: 'Contact',
                            event_label: 'Contact Form - PHP',
                            value: 1
                        });
                    }
                    return Promise.resolve();
                } else {
                    throw new Error(data.message || 'Server returned error');
                }
            });
        },
        
        tryFallbackSubmission: function(formData) {
            // Create email content
            const services = Array.isArray(formData.services) ? formData.services.join(', ') : 'None selected';
            const emailBody = `New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Business Type: ${formData.businessType}
Services of Interest: ${services}

Message:
${formData.message}

Submitted: ${new Date().toLocaleString()}`;

            // Try to use mailto as fallback
            const mailtoLink = `mailto:probuilddigital1@gmail.com?subject=Contact Form Submission from ${formData.name}&body=${encodeURIComponent(emailBody)}`;
            
            // Open mailto link
            window.location.href = mailtoLink;
            
            // Show a different success message for mailto
            setTimeout(() => {
                this.showMailtoSuccess();
                this.resetForm();
                
                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        event_category: 'Contact',
                        event_label: 'Contact Form - Mailto',
                        value: 1
                    });
                }
            }, 1000);
            
            return Promise.resolve();
        },
        
        showMailtoSuccess: function() {
            try {
                this.hideMessages();
                
                if (this.successMessage) {
                    // Update success message for mailto
                    const messageText = this.successMessage.querySelector('p');
                    if (messageText) {
                        messageText.textContent = 'Your email client has been opened with your message. Please send the email to complete your submission, or call us at (614) 403-8014.';
                    }
                    
                    this.successMessage.classList.remove('hidden');
                    this.successMessage.style.display = 'block';
                    this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
            } catch (error) {
                ErrorHandler.log(error, 'Show Mailto Success');
            }
        },
        
        formatPhoneNumber: function(input) {
            try {
                // Remove all non-digit characters
                let value = input.value.replace(/\D/g, '');
                
                // Format as (XXX) XXX-XXXX
                if (value.length >= 6) {
                    value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                } else if (value.length >= 3) {
                    value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
                }
                
                input.value = value;
                
            } catch (error) {
                ErrorHandler.log(error, 'Format Phone Number');
            }
        },
        
        showFieldError: function(fieldName, message) {
            try {
                const field = this.fields[fieldName];
                if (!field) return;
                
                const fieldContainer = fieldName === 'services' ? 
                    field[0].closest('.form-group') : 
                    field.closest('.form-group');
                
                const errorElement = fieldContainer.querySelector('.error-message');
                
                if (fieldContainer) {
                    fieldContainer.classList.add('error');
                }
                
                if (errorElement) {
                    errorElement.textContent = message;
                    errorElement.style.display = 'block';
                }
                
            } catch (error) {
                ErrorHandler.log(error, 'Show Field Error');
            }
        },
        
        clearFieldError: function(fieldName) {
            try {
                const field = this.fields[fieldName];
                if (!field) return;
                
                const fieldContainer = fieldName === 'services' ? 
                    field[0].closest('.form-group') : 
                    field.closest('.form-group');
                
                const errorElement = fieldContainer.querySelector('.error-message');
                
                if (fieldContainer) {
                    fieldContainer.classList.remove('error');
                }
                
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
                
            } catch (error) {
                ErrorHandler.log(error, 'Clear Field Error');
            }
        },
        
        showLoading: function() {
            try {
                if (this.submitButton) {
                    this.submitButton.classList.add('loading');
                    this.submitButton.disabled = true;
                    
                    // Update button text
                    const btnText = this.submitButton.querySelector('.btn-text');
                    const btnLoading = this.submitButton.querySelector('.btn-loading');
                    
                    if (btnText) btnText.classList.add('hidden');
                    if (btnLoading) btnLoading.classList.remove('hidden');
                }
                
                this.hideMessages();
                
            } catch (error) {
                ErrorHandler.log(error, 'Show Loading');
            }
        },
        
        hideLoading: function() {
            try {
                if (this.submitButton) {
                    this.submitButton.classList.remove('loading');
                    this.submitButton.disabled = false;
                    
                    // Reset button text
                    const btnText = this.submitButton.querySelector('.btn-text');
                    const btnLoading = this.submitButton.querySelector('.btn-loading');
                    
                    if (btnText) btnText.classList.remove('hidden');
                    if (btnLoading) btnLoading.classList.add('hidden');
                }
                
                this.isSubmitting = false;
                
            } catch (error) {
                ErrorHandler.log(error, 'Hide Loading');
            }
        },
        
        showSuccess: function() {
            try {
                this.hideMessages();
                
                if (this.successMessage) {
                    this.successMessage.classList.remove('hidden');
                    this.successMessage.style.display = 'block';
                    this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
            } catch (error) {
                ErrorHandler.log(error, 'Show Success');
            }
        },
        
        showError: function(message) {
            try {
                this.hideMessages();
                
                if (this.errorMessage) {
                    const messageText = this.errorMessage.querySelector('p');
                    if (messageText) {
                        messageText.textContent = message;
                    }
                    
                    this.errorMessage.classList.remove('hidden');
                    this.errorMessage.style.display = 'block';
                    this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
            } catch (error) {
                ErrorHandler.log(error, 'Show Error');
            }
        },
        
        hideMessages: function() {
            try {
                if (this.successMessage) {
                    this.successMessage.classList.add('hidden');
                    this.successMessage.style.display = 'none';
                }
                
                if (this.errorMessage) {
                    this.errorMessage.classList.add('hidden');
                    this.errorMessage.style.display = 'none';
                }
                
            } catch (error) {
                ErrorHandler.log(error, 'Hide Messages');
            }
        },
        
        resetForm: function() {
            try {
                if (this.form) {
                    this.form.reset();
                }
                
                // Clear all error states
                Object.keys(this.fields).forEach(fieldName => {
                    this.clearFieldError(fieldName);
                });
                
            } catch (error) {
                ErrorHandler.log(error, 'Reset Form');
            }
        },
        
        getFieldLabel: function(fieldName) {
            try {
                const labels = {
                    name: 'Name',
                    email: 'Email',
                    phone: 'Phone',
                    businessType: 'Business Type',
                    services: 'Services',
                    message: 'Message'
                };
                
                return labels[fieldName] || fieldName;
                
            } catch (error) {
                ErrorHandler.log(error, 'Get Field Label');
                return fieldName;
            }
        },
        
        getPatternErrorMessage: function(fieldName) {
            try {
                const messages = {
                    name: 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only).',
                    email: 'Please enter a valid email address.',
                    phone: 'Please enter a valid phone number.'
                };
                
                return messages[fieldName] || 'Please enter a valid value.';
                
            } catch (error) {
                ErrorHandler.log(error, 'Get Pattern Error Message');
                return 'Please enter a valid value.';
            }
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            ContactForm.init();
        });
    } else {
        ContactForm.init();
    }
    
    // Export for external use
    window.ProBuildContactForm = ContactForm;
    
})();