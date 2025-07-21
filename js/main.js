/**
 * Pro Build Digital - Main JavaScript Module
 * Core functionality with error handling
 */

(function() {
    'use strict';
    
    // Error handling utility
    const ErrorHandler = {
        log: function(error, context = 'General') {
            console.error(`[${context}]`, error);
            // In production, you might want to send errors to a logging service
            // this.sendToLoggingService(error, context);
        },
        
        sendToLoggingService: function(error, context) {
            // Placeholder for error logging service
            // Could integrate with services like Sentry, LogRocket, etc.
            try {
                // Example: Send to logging service
                // logService.captureException(error, { context });
            } catch (e) {
                console.error('Failed to send error to logging service:', e);
            }
        }
    };
    
    // Performance monitoring
    const PerformanceMonitor = {
        startTime: Date.now(),
        
        init: function() {
            try {
                this.logPageLoadTime();
                this.monitorLargestContentfulPaint();
                this.monitorCumulativeLayoutShift();
            } catch (error) {
                ErrorHandler.log(error, 'PerformanceMonitor');
            }
        },
        
        logPageLoadTime: function() {
            try {
                window.addEventListener('load', () => {
                    const loadTime = Date.now() - this.startTime;
                    console.log(`Page load time: ${loadTime}ms`);
                    
                    // Send to analytics if available
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'page_load_time', {
                            value: loadTime,
                            event_category: 'Performance'
                        });
                    }
                });
            } catch (error) {
                ErrorHandler.log(error, 'PageLoadTime');
            }
        },
        
        monitorLargestContentfulPaint: function() {
            try {
                if ('PerformanceObserver' in window) {
                    const observer = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lastEntry = entries[entries.length - 1];
                        console.log('LCP:', lastEntry.startTime);
                        
                        // Send to analytics if available
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'largest_contentful_paint', {
                                value: lastEntry.startTime,
                                event_category: 'Performance'
                            });
                        }
                    });
                    
                    observer.observe({ entryTypes: ['largest-contentful-paint'] });
                }
            } catch (error) {
                ErrorHandler.log(error, 'LCP Monitor');
            }
        },
        
        monitorCumulativeLayoutShift: function() {
            try {
                if ('PerformanceObserver' in window) {
                    const observer = new PerformanceObserver((list) => {
                        let clsValue = 0;
                        for (const entry of list.getEntries()) {
                            if (!entry.hadRecentInput) {
                                clsValue += entry.value;
                            }
                        }
                        
                        if (clsValue > 0) {
                            console.log('CLS:', clsValue);
                            
                            // Send to analytics if available
                            if (typeof gtag !== 'undefined') {
                                gtag('event', 'cumulative_layout_shift', {
                                    value: clsValue,
                                    event_category: 'Performance'
                                });
                            }
                        }
                    });
                    
                    observer.observe({ entryTypes: ['layout-shift'] });
                }
            } catch (error) {
                ErrorHandler.log(error, 'CLS Monitor');
            }
        }
    };
    
    // Smooth scrolling functionality
    const SmoothScroll = {
        init: function() {
            try {
                this.handleAnchorLinks();
                this.handleScrollToTop();
            } catch (error) {
                ErrorHandler.log(error, 'SmoothScroll');
            }
        },
        
        handleAnchorLinks: function() {
            try {
                const links = document.querySelectorAll('a[href^="#"]');
                
                links.forEach(link => {
                    link.addEventListener('click', (e) => {
                        try {
                            const href = link.getAttribute('href');
                            if (href === '#') return;
                            
                            const target = document.querySelector(href);
                            if (target) {
                                e.preventDefault();
                                const headerOffset = 100; // Account for fixed header
                                const elementPosition = target.offsetTop;
                                const offsetPosition = elementPosition - headerOffset;
                                
                                window.scrollTo({
                                    top: offsetPosition,
                                    behavior: 'smooth'
                                });
                            }
                        } catch (error) {
                            ErrorHandler.log(error, 'Anchor Link Click');
                        }
                    });
                });
            } catch (error) {
                ErrorHandler.log(error, 'Anchor Links Setup');
            }
        },
        
        handleScrollToTop: function() {
            try {
                // Create scroll to top button
                const scrollBtn = document.createElement('button');
                scrollBtn.innerHTML = '↑';
                scrollBtn.className = 'scroll-to-top';
                scrollBtn.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    font-size: 20px;
                    cursor: pointer;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    z-index: 1000;
                `;
                
                document.body.appendChild(scrollBtn);
                
                // Show/hide button based on scroll position
                window.addEventListener('scroll', () => {
                    try {
                        if (window.pageYOffset > 300) {
                            scrollBtn.style.opacity = '1';
                            scrollBtn.style.visibility = 'visible';
                        } else {
                            scrollBtn.style.opacity = '0';
                            scrollBtn.style.visibility = 'hidden';
                        }
                    } catch (error) {
                        ErrorHandler.log(error, 'Scroll Button Visibility');
                    }
                });
                
                // Scroll to top on click
                scrollBtn.addEventListener('click', () => {
                    try {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    } catch (error) {
                        ErrorHandler.log(error, 'Scroll To Top');
                    }
                });
                
            } catch (error) {
                ErrorHandler.log(error, 'Scroll To Top Setup');
            }
        }
    };
    
    // Animation utilities
    const AnimationUtils = {
        init: function() {
            try {
                this.setupIntersectionObserver();
                this.setupCounterAnimations();
            } catch (error) {
                ErrorHandler.log(error, 'AnimationUtils');
            }
        },
        
        setupIntersectionObserver: function() {
            try {
                // Check if Intersection Observer is supported
                if (!('IntersectionObserver' in window)) {
                    console.log('Intersection Observer not supported');
                    return;
                }
                
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                };
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        try {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('animate-in');
                                observer.unobserve(entry.target);
                            }
                        } catch (error) {
                            ErrorHandler.log(error, 'Intersection Observer Entry');
                        }
                    });
                }, observerOptions);
                
                // Observe elements with animation classes
                const animateElements = document.querySelectorAll(
                    '.service-card, .testimonial-card, .why-card, .faq-item, .value-card, .process-step'
                );
                
                animateElements.forEach(element => {
                    try {
                        observer.observe(element);
                    } catch (error) {
                        ErrorHandler.log(error, 'Observer Setup');
                    }
                });
                
            } catch (error) {
                ErrorHandler.log(error, 'Intersection Observer Setup');
            }
        },
        
        setupCounterAnimations: function() {
            try {
                const counters = document.querySelectorAll('.stat-number');
                
                counters.forEach(counter => {
                    try {
                        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                        if (isNaN(target)) return;
                        
                        const animateCounter = () => {
                            const increment = target / 100;
                            let current = 0;
                            
                            const updateCounter = () => {
                                try {
                                    current += increment;
                                    if (current < target) {
                                        counter.textContent = Math.ceil(current).toString();
                                        requestAnimationFrame(updateCounter);
                                    } else {
                                        counter.textContent = target.toString();
                                    }
                                } catch (error) {
                                    ErrorHandler.log(error, 'Counter Update');
                                }
                            };
                            
                            updateCounter();
                        };
                        
                        // Create observer for counter
                        const counterObserver = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    animateCounter();
                                    counterObserver.unobserve(entry.target);
                                }
                            });
                        }, { threshold: 0.5 });
                        
                        counterObserver.observe(counter);
                        
                    } catch (error) {
                        ErrorHandler.log(error, 'Counter Setup');
                    }
                });
                
            } catch (error) {
                ErrorHandler.log(error, 'Counter Animations Setup');
            }
        }
    };
    
    // Lazy loading for images
    const LazyLoader = {
        init: function() {
            try {
                this.setupLazyImages();
            } catch (error) {
                ErrorHandler.log(error, 'LazyLoader');
            }
        },
        
        setupLazyImages: function() {
            try {
                // Check if Intersection Observer is supported
                if (!('IntersectionObserver' in window)) {
                    console.log('Intersection Observer not supported for lazy loading');
                    return;
                }
                
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        try {
                            if (entry.isIntersecting) {
                                const img = entry.target;
                                
                                // Replace data-src with src for lazy loading
                                if (img.dataset.src) {
                                    img.src = img.dataset.src;
                                    img.classList.remove('lazy');
                                    img.classList.add('loaded');
                                    imageObserver.unobserve(img);
                                }
                            }
                        } catch (error) {
                            ErrorHandler.log(error, 'Image Lazy Loading');
                        }
                    });
                }, { threshold: 0.1 });
                
                // Observe all images with lazy class
                const lazyImages = document.querySelectorAll('img.lazy');
                lazyImages.forEach(img => {
                    imageObserver.observe(img);
                });
                
            } catch (error) {
                ErrorHandler.log(error, 'Lazy Images Setup');
            }
        }
    };
    
    // Accessibility utilities
    const AccessibilityUtils = {
        init: function() {
            try {
                this.setupKeyboardNavigation();
                this.setupFocusManagement();
                this.setupAriaLabels();
            } catch (error) {
                ErrorHandler.log(error, 'AccessibilityUtils');
            }
        },
        
        setupKeyboardNavigation: function() {
            try {
                // Handle keyboard navigation for custom elements
                const focusableElements = document.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                focusableElements.forEach(element => {
                    element.addEventListener('keydown', (e) => {
                        try {
                            if (e.key === 'Enter' || e.key === ' ') {
                                if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
                                    e.preventDefault();
                                    element.click();
                                }
                            }
                        } catch (error) {
                            ErrorHandler.log(error, 'Keyboard Navigation');
                        }
                    });
                });
                
            } catch (error) {
                ErrorHandler.log(error, 'Keyboard Navigation Setup');
            }
        },
        
        setupFocusManagement: function() {
            try {
                // Add focus indicators for better accessibility
                const style = document.createElement('style');
                style.textContent = `
                    .focus-visible {
                        outline: 2px solid var(--primary-color);
                        outline-offset: 2px;
                    }
                `;
                document.head.appendChild(style);
                
                // Add focus-visible class for keyboard focus
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab') {
                        document.body.classList.add('keyboard-focus');
                    }
                });
                
                document.addEventListener('mousedown', () => {
                    document.body.classList.remove('keyboard-focus');
                });
                
            } catch (error) {
                ErrorHandler.log(error, 'Focus Management Setup');
            }
        },
        
        setupAriaLabels: function() {
            try {
                // Add aria-labels to elements that need them
                const navToggle = document.querySelector('.nav-toggle');
                if (navToggle) {
                    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
                
                const scrollBtn = document.querySelector('.scroll-to-top');
                if (scrollBtn) {
                    scrollBtn.setAttribute('aria-label', 'Scroll to top of page');
                }
                
            } catch (error) {
                ErrorHandler.log(error, 'Aria Labels Setup');
            }
        }
    };
    
    // Main initialization
    const App = {
        init: function() {
            try {
                // Wait for DOM to be ready
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => {
                        this.initializeModules();
                    });
                } else {
                    this.initializeModules();
                }
            } catch (error) {
                ErrorHandler.log(error, 'App Initialization');
            }
        },
        
        initializeModules: function() {
            try {
                console.log('Initializing Pro Build Digital website...');
                
                // Initialize all modules
                PerformanceMonitor.init();
                SmoothScroll.init();
                AnimationUtils.init();
                LazyLoader.init();
                AccessibilityUtils.init();
                
                console.log('Pro Build Digital website initialized successfully');
                
            } catch (error) {
                ErrorHandler.log(error, 'Module Initialization');
            }
        }
    };
    
    // Add CSS animation classes
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .loaded {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        
        .lazy {
            opacity: 0;
        }
        
        .keyboard-focus *:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize the application
    App.init();
    
    // Global error handler
    window.addEventListener('error', (e) => {
        ErrorHandler.log(e.error, 'Global Error Handler');
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
        ErrorHandler.log(e.reason, 'Unhandled Promise Rejection');
    });
    
})();