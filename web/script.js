// Rasa server endpoint
const RASA_SERVER_URL = 'http://localhost:5005/webhooks/rest/webhook';
const SENDER_ID = 'user_' + Math.random().toString(36).substr(2, 9);

// State
let soundEnabled = true;
let messageHistory = [];

// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
    // Check connection status
    checkConnection();
    
    // Set up periodic connection checks
    setInterval(checkConnection, 5000);
    
    // Enter key to send message
    document.getElementById('user-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Focus input on load
    document.getElementById('user-input').focus();
});

// Check Rasa server connection
async function checkConnection() {
    const statusEl = document.getElementById('connection-status');
    const statusText = document.getElementById('status-text');
    
    try {
        const response = await fetch('http://localhost:5005/', {
            method: 'GET',
            mode: 'no-cors'
        });
        
        statusEl.className = 'connection-status connected';
        statusText.textContent = 'Connected';
        
        // Send initial greeting if this is first connection
        if (!window.initialGreetingSent) {
            window.initialGreetingSent = true;
            setTimeout(() => {
                showTypingIndicator();
                setTimeout(() => {
                    removeTypingIndicator();
                    addMessage("Hello! 👋 I'm QuoteBot, your personal quote assistant. I can help you find inspiring, funny, love, or success quotes. What type of quote are you looking for today?", 'bot');
                }, 1500);
            }, 500);
        }
    } catch (error) {
        statusEl.className = 'connection-status disconnected';
        statusText.textContent = 'Disconnected';
    }
}

// Get current time formatted
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

// Play notification sound
function playSound() {
    if (!soundEnabled) return;
    
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    audio.volume = 0.3;
    audio.play().catch(() => {});
}

// Toggle sound
function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = event.target;
    btn.textContent = soundEnabled ? '🔊' : '🔇';
    btn.title = soundEnabled ? 'Sound on' : 'Sound off';
}

// Clear chat
function clearChat() {
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = `
        <div class="welcome-message">
            <div class="welcome-icon">✨</div>
            <h3>Chat cleared!</h3>
            <p>I'm ready to help you discover amazing quotes. What would you like to explore?</p>
        </div>
    `;
    messageHistory = [];
}

// Send quick message from buttons
function sendQuickMessage(message) {
    document.getElementById('user-input').value = message;
    sendMessage();
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-container';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">💬</div>
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Add message to chat
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    
    // Remove welcome message if it exists
    const welcomeMsg = messagesContainer.querySelector('.welcome-message');
    if (welcomeMsg && messageHistory.length === 0) {
        welcomeMsg.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const time = getCurrentTime();
    const avatar = sender === 'bot' ? '💬' : '👤';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">${escapeHtml(text)}</div>
    `;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = time;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.appendChild(timeDiv);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    messageHistory.push({ sender, text, time });
    
    if (sender === 'bot') {
        playSound();
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Send message to Rasa server
async function sendMessage() {
    const inputElement = document.getElementById('user-input');
    const message = inputElement.value.trim();
    
    if (!message) return;
    
    // Clear input
    inputElement.value = '';
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Send to Rasa
        const response = await fetch(RASA_SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: SENDER_ID,
                message: message
            })
        });
        
        // Remove typing indicator
        removeTypingIndicator();
        
        if (response.ok) {
            const data = await response.json();
            
            // Add bot responses with slight delay for natural feel
            if (data.length === 0) {
                addMessage("I'm not sure how to respond to that. Try asking for inspiration, funny quotes, love quotes, or success quotes!", 'bot');
            } else {
                data.forEach((botMessage, index) => {
                    if (botMessage.text) {
                        setTimeout(() => {
                            addMessage(botMessage.text, 'bot');
                        }, index * 500);
                    }
                });
            }
        } else {
            addMessage('Sorry, I\'m having trouble connecting to the server. Please make sure Rasa is running on localhost:5005', 'bot');
        }
    } catch (error) {
        removeTypingIndicator();
        addMessage('Connection error. Please start the Rasa server with: rasa run --enable-api --cors "*"', 'bot');
        
        // Update connection status
        const statusEl = document.getElementById('connection-status');
        const statusText = document.getElementById('status-text');
        statusEl.className = 'connection-status disconnected';
        statusText.textContent = 'Disconnected';
    }
}
