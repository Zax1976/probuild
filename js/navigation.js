/**
 * Pro Build Digital - Navigation Module
 * Handles mobile navigation and menu interactions with error handling
 */

(function() {
    'use strict';
    
    // Error handling utility
    const ErrorHandler = {
        log: function(error, context = 'Navigation') {
            console.error(`[${context}]`, error);
        }
    };
    
    const Navigation = {
        // Navigation elements
        navToggle: null,
        navMenu: null,
        navLinks: null,
        navbar: null,
        
        // State
        isMenuOpen: false,
        
        init: function() {
            try {
                this.cacheElements();
                this.bindEvents();
                this.setupActiveStates();
                this.setupScrollBehavior();
                console.log('Navigation module initialized successfully');
            } catch (error) {
                ErrorHandler.log(error, 'Navigation Init');
            }
        },
        
        cacheElements: function() {
            try {
                this.navToggle = document.querySelector('.nav-toggle');
                this.navMenu = document.querySelector('.nav-menu');
                this.navLinks = document.querySelectorAll('.nav-link');
                this.navbar = document.querySelector('.navbar');
                
                // Validate required elements
                if (!this.navToggle || !this.navMenu) {
                    throw new Error('Required navigation elements not found');
                }
                
            } catch (error) {
                ErrorHandler.log(error, 'Cache Elements');
            }
        },
        
        bindEvents: function() {
            try {
                // Mobile menu toggle
                if (this.navToggle) {
                    this.navToggle.addEventListener('click', (e) => {
                        try {
                            e.preventDefault();
                            this.toggleMenu();
                        } catch (error) {
                            ErrorHandler.log(error, 'Menu Toggle Click');
                        }
                    });
                }
                
                // Close menu when clicking nav links
                this.navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        try {
                            this.closeMenu();
                        } catch (error) {
                            ErrorHandler.log(error, 'Nav Link Click');
                        }
                    });
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    try {
                        if (this.isMenuOpen && !this.navbar.contains(e.target)) {
                            this.closeMenu();
                        }
                    } catch (error) {
                        ErrorHandler.log(error, 'Outside Click');
                    }
                });
                
                // Handle escape key
                document.addEventListener('keydown', (e) => {
                    try {
                        if (e.key === 'Escape' && this.isMenuOpen) {
                            this.closeMenu();
                        }
                    } catch (error) {
                        ErrorHandler.log(error, 'Escape Key');
                    }
                });
                
                // Handle resize
                window.addEventListener('resize', () => {
                    try {
                        this.handleResize();
                    } catch (error) {
                        ErrorHandler.log(error, 'Window Resize');
                    }
                });
                
            } catch (error) {
                ErrorHandler.log(error, 'Bind Events');
            }
        },
        
        toggleMenu: function() {
            try {
                if (this.isMenuOpen) {
                    this.closeMenu();
                } else {
                    this.openMenu();
                }
            } catch (error) {
                ErrorHandler.log(error, 'Toggle Menu');
            }
        },
        
        openMenu: function() {
            try {
                this.isMenuOpen = true;
                this.navMenu.classList.add('active');
                this.navToggle.classList.add('active');
                
                // Update ARIA attributes
                this.navToggle.setAttribute('aria-expanded', 'true');
                this.navMenu.setAttribute('aria-hidden', 'false');
                
                // Focus management
                const firstNavLink = this.navMenu.querySelector('.nav-link');
                if (firstNavLink) {
                    firstNavLink.focus();
                }
                
                // Prevent body scroll on mobile
                document.body.style.overflow = 'hidden';
                
                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'menu_open', {
                        event_category: 'Navigation',
                        event_label: 'Mobile Menu'
                    });
                }
                
            } catch (error) {
                ErrorHandler.log(error, 'Open Menu');
            }
        },
        
        closeMenu: function() {
            try {
                this.isMenuOpen = false;
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
                
                // Update ARIA attributes
                this.navToggle.setAttribute('aria-expanded', 'false');
                this.navMenu.setAttribute('aria-hidden', 'true');
                
                // Restore body scroll
                document.body.style.overflow = '';
                
                // Focus management - return focus to toggle button
                this.navToggle.focus();
                
            } catch (error) {
                ErrorHandler.log(error, 'Close Menu');
            }
        },
        
        setupActiveStates: function() {
            try {
                // Get current page path
                const currentPath = window.location.pathname;
                const currentPage = currentPath.split('/').pop() || 'index.html';
                
                // Set active state for current page
                this.navLinks.forEach(link => {
                    try {
                        const linkHref = link.getAttribute('href');
                        
                        // Handle root path and index.html
                        if (
                            (currentPage === 'index.html' || currentPage === '') && 
                            (linkHref === 'index.html' || linkHref === '/')
                        ) {
                            link.classList.add('active');
                        } else if (linkHref === currentPage) {
                            link.classList.add('active');
                        }
                    } catch (error) {
                        ErrorHandler.log(error, 'Active State Setup');
                    }
                });
                
            } catch (error) {
                ErrorHandler.log(error, 'Setup Active States');
            }
        },
        
        setupScrollBehavior: function() {
            try {
                let lastScrollTop = 0;
                let scrollTimeout;
                
                const handleScroll = () => {
                    try {
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        
                        // Add/remove scrolled class for styling
                        if (scrollTop > 50) {
                            this.navbar.classList.add('scrolled');
                        } else {
                            this.navbar.classList.remove('scrolled');
                        }
                        
                        // Hide/show navbar on scroll (optional)
                        if (scrollTop > lastScrollTop && scrollTop > 100) {
                            // Scrolling down
                            this.navbar.classList.add('nav-hidden');
                        } else {
                            // Scrolling up
                            this.navbar.classList.remove('nav-hidden');
                        }
                        
                        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
                        
                    } catch (error) {
                        ErrorHandler.log(error, 'Scroll Handler');
                    }
                };
                
                // Throttle scroll events
                window.addEventListener('scroll', () => {
                    try {
                        if (scrollTimeout) {
                            clearTimeout(scrollTimeout);
                        }
                        
                        scrollTimeout = setTimeout(handleScroll, 16); // ~60fps
                        
                    } catch (error) {
                        ErrorHandler.log(error, 'Scroll Event');
                    }
                });
                
            } catch (error) {
                ErrorHandler.log(error, 'Setup Scroll Behavior');
            }
        },
        
        handleResize: function() {
            try {
                // Close mobile menu on resize to desktop
                if (window.innerWidth > 768 && this.isMenuOpen) {
                    this.closeMenu();
                }
                
                // Reset any styles that might have been set
                if (window.innerWidth > 768) {
                    document.body.style.overflow = '';
                }
                
            } catch (error) {
                ErrorHandler.log(error, 'Handle Resize');
            }
        },
        
        // Public methods for external use
        getCurrentPage: function() {
            try {
                return window.location.pathname.split('/').pop() || 'index.html';
            } catch (error) {
                ErrorHandler.log(error, 'Get Current Page');
                return 'index.html';
            }
        },
        
        highlightNavLink: function(page) {
            try {
                // Remove all active classes
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current page
                this.navLinks.forEach(link => {
                    const linkHref = link.getAttribute('href');
                    if (linkHref === page) {
                        link.classList.add('active');
                    }
                });
                
            } catch (error) {
                ErrorHandler.log(error, 'Highlight Nav Link');
            }
        }
    };
    
    // Navbar scroll effects styles
    const style = document.createElement('style');
    style.textContent = `
        .navbar.scrolled {
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
            backdrop-filter: blur(10px);
        }
        
        .navbar.nav-hidden {
            transform: translateY(-100%);
        }
        
        .navbar {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .nav-menu[aria-hidden="true"] {
            visibility: hidden;
        }
        
        .nav-menu[aria-hidden="false"] {
            visibility: visible;
        }
        
        /* Focus styles for keyboard navigation */
        .nav-link:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
        
        .nav-toggle:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
        
        /* Smooth transitions for mobile menu */
        .nav-menu {
            transition: left 0.3s ease;
        }
        
        .nav-toggle .bar {
            transition: 0.3s ease;
        }
        
        /* Mobile menu backdrop */
        @media (max-width: 768px) {
            .nav-menu.active::before {
                content: '';
                position: fixed;
                top: 80px;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: -1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            Navigation.init();
        });
    } else {
        Navigation.init();
    }
    
    // Export for external use
    window.ProBuildNavigation = Navigation;
    
})();