/**
 * Pro Build Digital - n8n Chat Widget Configuration
 * Handles n8n chat integration and customization
 */

(function() {
    'use strict';
    
    const N8nChatConfig = {
        // n8n Chat Configuration
        config: {
            // n8n chat webhook URL
            webhookUrl: 'https://zax76.app.n8n.cloud/webhook/2849cef6-17a0-4fd2-8577-8642a5df8cc4',
            
            // Chat widget settings
            widget: {
                title: 'Pro Build Digital Assistant',
                subtitle: 'Ask me about websites, chatbots, or automation!',
                primaryColor: '#0B1F3A', // Your brand primary color
                textColor: '#333333',
                backgroundColor: '#FFFFFF',
                position: 'bottom-right', // or 'bottom-left'
                
                // Custom messages
                welcomeMessage: 'Hi! I\'m here to help with your digital needs. What can I help you with today?',
                placeholderText: 'Type your message here...',
                offlineMessage: 'We\'re currently offline. Leave a message and we\'ll get back to you!',
                
                // Behavior settings
                autoOpen: false, // Set to true to open automatically
                showOnPages: ['all'], // or specific pages like ['index.html', 'services.html']
                delayBeforeShow: 3000, // 3 seconds delay before showing
            }
        },
        
        init: function() {
            try {
                console.log('Initializing n8n chat widget...');
                this.loadChatWidget();
                this.setupEventListeners();
                this.applyCustomStyling();
                
                // Show widget after delay if configured
                if (this.config.widget.delayBeforeShow > 0 && !this.config.widget.autoOpen) {
                    setTimeout(() => {
                        this.showChatButton();
                    }, this.config.widget.delayBeforeShow);
                }
                
            } catch (error) {
                console.error('n8n Chat initialization error:', error);
            }
        },
        
        loadChatWidget: function() {
            try {
                // Create chat widget HTML
                this.createChatWidget();
                
                // If you have an n8n chat script URL, load it here
                // this.loadN8nScript();
                
            } catch (error) {
                console.error('Error loading chat widget:', error);
            }
        },
        
        createChatWidget: function() {
            // Create chat container
            const chatContainer = document.createElement('div');
            chatContainer.id = 'n8n-chat-widget';
            chatContainer.className = 'n8n-chat-widget';
            
            chatContainer.innerHTML = `
                <!-- Chat Button -->
                <div id="chat-button" class="chat-button">
                    <div class="chat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"/>
                            <path d="M7 9H17V11H7V9ZM7 12H13V14H7V12Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="chat-notification" id="chat-notification" style="display: none;">
                        <span>1</span>
                    </div>
                </div>
                
                <!-- Chat Window -->
                <div id="chat-window" class="chat-window" style="display: none;">
                    <div class="chat-header">
                        <div class="chat-header-info">
                            <h3>${this.config.widget.title}</h3>
                            <p>${this.config.widget.subtitle}</p>
                        </div>
                        <button id="close-chat" class="close-chat">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="chat-messages" id="chat-messages">
                        <div class="message bot-message">
                            <div class="message-content">
                                ${this.config.widget.welcomeMessage}
                            </div>
                            <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <input type="text" id="chat-input" placeholder="${this.config.widget.placeholderText}" maxlength="1000">
                        <button id="send-message" class="send-button">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M2.01 21L23 12 2.01 3 2 10L17 12 2 14L2.01 21Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(chatContainer);
        },
        
        setupEventListeners: function() {
            try {
                // Chat button click
                const chatButton = document.getElementById('chat-button');
                const chatWindow = document.getElementById('chat-window');
                const closeChat = document.getElementById('close-chat');
                const sendButton = document.getElementById('send-message');
                const chatInput = document.getElementById('chat-input');
                
                if (chatButton) {
                    chatButton.addEventListener('click', () => {
                        this.toggleChatWindow();
                    });
                }
                
                if (closeChat) {
                    closeChat.addEventListener('click', () => {
                        this.closeChatWindow();
                    });
                }
                
                if (sendButton) {
                    sendButton.addEventListener('click', () => {
                        this.sendMessage();
                    });
                }
                
                if (chatInput) {
                    chatInput.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') {
                            this.sendMessage();
                        }
                    });
                }
                
            } catch (error) {
                console.error('Error setting up chat event listeners:', error);
            }
        },
        
        toggleChatWindow: function() {
            const chatWindow = document.getElementById('chat-window');
            const notification = document.getElementById('chat-notification');
            
            if (chatWindow.style.display === 'none') {
                chatWindow.style.display = 'block';
                chatWindow.classList.add('chat-open');
                
                // Hide notification badge
                if (notification) {
                    notification.style.display = 'none';
                }
                
                // Focus on input
                const chatInput = document.getElementById('chat-input');
                if (chatInput) {
                    setTimeout(() => chatInput.focus(), 100);
                }
                
                // Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'chat_opened', {
                        event_category: 'Chatbot',
                        event_label: 'Chat Widget Opened'
                    });
                }
            } else {
                this.closeChatWindow();
            }
        },
        
        closeChatWindow: function() {
            const chatWindow = document.getElementById('chat-window');
            chatWindow.style.display = 'none';
            chatWindow.classList.remove('chat-open');
        },
        
        sendMessage: function() {
            try {
                const chatInput = document.getElementById('chat-input');
                const message = chatInput.value.trim();
                
                if (!message) return;
                
                // Add user message to chat
                this.addMessageToChat(message, 'user');
                
                // Clear input
                chatInput.value = '';
                
                // Send to n8n webhook
                this.sendToN8n(message);
                
                // Show typing indicator
                this.showTypingIndicator();
                
            } catch (error) {
                console.error('Error sending message:', error);
                this.addMessageToChat('Sorry, there was an error sending your message. Please try again.', 'bot', 'error');
            }
        },
        
        addMessageToChat: function(message, sender, type = 'normal') {
            const messagesContainer = document.getElementById('chat-messages');
            const messageDiv = document.createElement('div');
            const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            messageDiv.className = `message ${sender}-message ${type === 'error' ? 'error-message' : ''}`;
            messageDiv.innerHTML = `
                <div class="message-content">${this.sanitizeMessage(message)}</div>
                <div class="message-time">${currentTime}</div>
            `;
            
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        },
        
        sanitizeMessage: function(message) {
            // Basic HTML sanitization
            const div = document.createElement('div');
            div.textContent = message;
            return div.innerHTML;
        },
        
        getOrCreateSessionId: function() {
            // Check if session ID exists in localStorage
            let sessionId = localStorage.getItem('probuild_chat_session_id');
            
            if (!sessionId) {
                // Generate a new session ID
                sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('probuild_chat_session_id', sessionId);
            }
            
            return sessionId;
        },
        
        sendToN8n: function(message) {
            try {
                // Replace with your actual n8n webhook URL
                const webhookUrl = this.config.webhookUrl;
                
                if (webhookUrl === 'YOUR_N8N_WEBHOOK_URL_HERE') {
                    // Demo response for testing
                    setTimeout(() => {
                        this.hideTypingIndicator();
                        this.addMessageToChat('Thanks for your message! This is a demo response. Please configure your n8n webhook URL to enable real chat functionality.', 'bot');
                    }, 1500);
                    return;
                }
                
                // Prepare data for n8n
                const chatData = {
                    message: message,
                    sessionId: this.getOrCreateSessionId(),
                    timestamp: new Date().toISOString(),
                    page: window.location.pathname,
                    userAgent: navigator.userAgent,
                    referrer: document.referrer
                };
                
                // Log the data being sent (for debugging)
                console.log('Sending to n8n:', chatData);
                
                // Send to n8n webhook
                fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(chatData)
                })
                .then(response => {
                    console.log('n8n response status:', response.status);
                    return response.json();
                })
                .then(data => {
                    console.log('n8n response data:', data);
                    this.hideTypingIndicator();
                    
                    if (data.response) {
                        this.addMessageToChat(data.response, 'bot');
                    } else if (data.message) {
                        // Some n8n workflows return 'message' instead of 'response'
                        this.addMessageToChat(data.message, 'bot');
                    } else if (data.output) {
                        // Alternative response format
                        this.addMessageToChat(data.output, 'bot');
                    } else {
                        this.addMessageToChat('Thank you for your message! We\'ll get back to you soon.', 'bot');
                    }
                })
                .catch(error => {
                    console.error('n8n webhook error:', error);
                    this.hideTypingIndicator();
                    this.addMessageToChat('Thank you for your message! We\'ve received it and will respond shortly.', 'bot');
                });
                
            } catch (error) {
                console.error('Error sending to n8n:', error);
                this.hideTypingIndicator();
                this.addMessageToChat('There was an error processing your message. Please try again.', 'bot', 'error');
            }
        },
        
        showTypingIndicator: function() {
            const messagesContainer = document.getElementById('chat-messages');
            const typingDiv = document.createElement('div');
            typingDiv.id = 'typing-indicator';
            typingDiv.className = 'message bot-message typing';
            typingDiv.innerHTML = `
                <div class="message-content">
                    <div class="typing-animation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            
            messagesContainer.appendChild(typingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        },
        
        hideTypingIndicator: function() {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        },
        
        showChatButton: function() {
            const chatWidget = document.getElementById('n8n-chat-widget');
            if (chatWidget) {
                chatWidget.classList.add('visible');
            }
        },
        
        applyCustomStyling: function() {
            // Custom CSS will be applied through the separate CSS file
            // This method can be used for dynamic styling based on configuration
            
            const chatWidget = document.getElementById('n8n-chat-widget');
            if (chatWidget) {
                chatWidget.style.setProperty('--primary-color', this.config.widget.primaryColor);
                chatWidget.style.setProperty('--text-color', this.config.widget.textColor);
                chatWidget.style.setProperty('--bg-color', this.config.widget.backgroundColor);
            }
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            N8nChatConfig.init();
        });
    } else {
        N8nChatConfig.init();
    }
    
    // Export for external use
    window.N8nChatConfig = N8nChatConfig;
    
})();