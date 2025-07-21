/**
 * Checkbox Debug and Fix Module
 * Ensures checkboxes work properly
 */

(function() {
    'use strict';
    
    const CheckboxDebug = {
        init: function() {
            console.log('Initializing checkbox debug...');
            this.findCheckboxes();
            this.addEventListeners();
            this.testCheckboxes();
        },
        
        findCheckboxes: function() {
            const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
            console.log('Found service checkboxes:', serviceCheckboxes.length);
            
            serviceCheckboxes.forEach((checkbox, index) => {
                console.log(`Checkbox ${index}:`, {
                    value: checkbox.value,
                    checked: checkbox.checked,
                    disabled: checkbox.disabled,
                    visible: checkbox.offsetParent !== null
                });
            });
        },
        
        addEventListeners: function() {
            const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
            
            serviceCheckboxes.forEach((checkbox, index) => {
                // Add click listener
                checkbox.addEventListener('click', (e) => {
                    console.log(`Checkbox ${index} clicked:`, {
                        value: checkbox.value,
                        checked: e.target.checked,
                        event: e
                    });
                });
                
                // Add change listener
                checkbox.addEventListener('change', (e) => {
                    console.log(`Checkbox ${index} changed:`, {
                        value: checkbox.value,
                        checked: e.target.checked
                    });
                    
                    // Update visual state
                    this.updateVisualState(checkbox);
                });
                
                // Also add listener to the label
                const label = checkbox.closest('label');
                if (label) {
                    label.addEventListener('click', (e) => {
                        console.log(`Label ${index} clicked for:`, checkbox.value);
                        // Let the browser handle the default behavior
                    });
                }
            });
        },
        
        updateVisualState: function(checkbox) {
            const label = checkbox.closest('label');
            if (label) {
                if (checkbox.checked) {
                    label.classList.add('selected');
                    label.style.backgroundColor = '#EBF8FF'; // blue-50
                    label.style.borderColor = '#3B82F6'; // blue-500
                } else {
                    label.classList.remove('selected');
                    label.style.backgroundColor = '';
                    label.style.borderColor = '';
                }
            }
        },
        
        testCheckboxes: function() {
            console.log('Testing checkbox functionality...');
            
            const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
            
            // Test if checkboxes can be programmatically changed
            setTimeout(() => {
                if (serviceCheckboxes.length > 0) {
                    const firstCheckbox = serviceCheckboxes[0];
                    console.log('Testing first checkbox programmatically...');
                    firstCheckbox.checked = !firstCheckbox.checked;
                    this.updateVisualState(firstCheckbox);
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        firstCheckbox.checked = !firstCheckbox.checked;
                        this.updateVisualState(firstCheckbox);
                        console.log('Reset first checkbox');
                    }, 2000);
                }
            }, 1000);
        },
        
        // Fix common issues
        fixCommonIssues: function() {
            const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
            
            serviceCheckboxes.forEach(checkbox => {
                // Ensure checkbox is not disabled
                checkbox.disabled = false;
                
                // Ensure proper tab index
                checkbox.tabIndex = 0;
                
                // Add pointer cursor
                checkbox.style.cursor = 'pointer';
                
                // Ensure the label is clickable
                const label = checkbox.closest('label');
                if (label) {
                    label.style.cursor = 'pointer';
                }
            });
            
            console.log('Applied common checkbox fixes');
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            CheckboxDebug.init();
            CheckboxDebug.fixCommonIssues();
        });
    } else {
        CheckboxDebug.init();
        CheckboxDebug.fixCommonIssues();
    }
    
    // Make available globally for debugging
    window.CheckboxDebug = CheckboxDebug;
    
})();