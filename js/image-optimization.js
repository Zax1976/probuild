/**
 * Pro Build Digital - Image Optimization Module
 * Handles WebP support detection and lazy loading
 */

(function() {
    'use strict';
    
    // Error handling utility
    const ErrorHandler = {
        log: function(error, context = 'Image Optimization') {
            console.error(`[${context}]`, error);
        }
    };
    
    const ImageOptimization = {
        // WebP support detection
        supportsWebP: null,
        
        // Intersection Observer for lazy loading
        lazyImageObserver: null,
        
        init: function() {
            try {
                this.detectWebPSupport();
                this.setupLazyLoading();
                this.optimizeExistingImages();
                console.log('Image optimization module initialized successfully');
            } catch (error) {
                ErrorHandler.log(error, 'Image Optimization Init');
            }
        },
        
        detectWebPSupport: function() {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = 1;
                canvas.height = 1;
                
                // Test WebP support
                this.supportsWebP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
                
                // Add class to document for CSS targeting
                if (this.supportsWebP) {
                    document.documentElement.classList.add('webp');
                } else {
                    document.documentElement.classList.add('no-webp');
                }
                
                console.log('WebP support:', this.supportsWebP);
                
            } catch (error) {
                ErrorHandler.log(error, 'WebP Detection');
                this.supportsWebP = false;
            }
        },
        
        setupLazyLoading: function() {
            try {
                // Check if Intersection Observer is supported
                if ('IntersectionObserver' in window) {
                    this.lazyImageObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                this.loadImage(entry.target);
                                this.lazyImageObserver.unobserve(entry.target);
                            }
                        });
                    }, {
                        rootMargin: '50px 0px',
                        threshold: 0.01
                    });
                    
                    // Observe all lazy images
                    const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');
                    lazyImages.forEach(img => {
                        this.lazyImageObserver.observe(img);
                    });
                } else {
                    // Fallback for browsers without Intersection Observer
                    this.loadAllImages();
                }
                
            } catch (error) {
                ErrorHandler.log(error, 'Lazy Loading Setup');
                this.loadAllImages();
            }
        },
        
        loadImage: function(element) {
            try {
                if (element.tagName === 'IMG') {
                    // Handle img elements
                    if (element.dataset.src) {
                        element.src = element.dataset.src;
                        element.removeAttribute('data-src');
                    }
                    if (element.dataset.srcset) {
                        element.srcset = element.dataset.srcset;
                        element.removeAttribute('data-srcset');
                    }
                } else if (element.tagName === 'SOURCE') {
                    // Handle source elements
                    if (element.dataset.srcset) {
                        element.srcset = element.dataset.srcset;
                        element.removeAttribute('data-srcset');
                    }
                }
                
                // Add loaded class for CSS animations
                element.classList.add('loaded');
                
            } catch (error) {
                ErrorHandler.log(error, 'Load Image');
            }
        },
        
        loadAllImages: function() {
            try {
                const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');
                lazyImages.forEach(img => {
                    this.loadImage(img);
                });
                
            } catch (error) {
                ErrorHandler.log(error, 'Load All Images');
            }
        },
        
        optimizeExistingImages: function() {
            try {
                // Update existing images to use WebP if supported
                const images = document.querySelectorAll('img[src*=\".png\"], img[src*=\".jpg\"], img[src*=\".jpeg\"]');
                
                images.forEach(img => {
                    if (this.supportsWebP) {
                        // Create WebP version path
                        const webpSrc = img.src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
                        
                        // Test if WebP version exists
                        this.testImageExists(webpSrc).then(exists => {
                            if (exists) {
                                img.src = webpSrc;
                            }
                        });
                    }
                });
                
            } catch (error) {
                ErrorHandler.log(error, 'Optimize Existing Images');
            }
        },
        
        testImageExists: function(src) {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = src;
            });
        },
        
        createPictureElement: function(src, alt = '', className = '') {
            try {
                const picture = document.createElement('picture');
                
                // Create WebP source
                if (this.supportsWebP) {
                    const webpSource = document.createElement('source');
                    webpSource.type = 'image/webp';
                    webpSource.setAttribute('data-srcset', src.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
                    picture.appendChild(webpSource);
                }
                
                // Create fallback img
                const img = document.createElement('img');
                img.setAttribute('data-src', src);
                img.alt = alt;
                img.className = className;
                img.loading = 'lazy';
                picture.appendChild(img);
                
                return picture;
                
            } catch (error) {
                ErrorHandler.log(error, 'Create Picture Element');
                return null;
            }
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            ImageOptimization.init();
        });
    } else {
        ImageOptimization.init();
    }
    
    // Export for external use
    window.ProBuildImageOptimization = ImageOptimization;
    
})();