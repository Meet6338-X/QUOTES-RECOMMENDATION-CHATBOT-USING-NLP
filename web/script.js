// Rasa server endpoint
const RASA_SERVER_URL = 'http://localhost:5005/webhooks/rest/webhook';
const SENDER_ID = 'user_' + Math.random().toString(36).substr(2, 9);

// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
    // Set welcome message time
    document.getElementById('welcome-time').textContent = getCurrentTime();
    
    // Enter key to send message
    document.getElementById('user-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// Get current time formatted
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

// Send quick message from buttons
function sendQuickMessage(message) {
    document.getElementById('user-input').value = message;
    sendMessage();
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
            
            // Add bot responses
            data.forEach(botMessage => {
                if (botMessage.text) {
                    addMessage(botMessage.text, 'bot');
                }
            });
        } else {
            addMessage('Sorry, I\'m having trouble connecting. Please make sure the Rasa server is running on localhost:5005', 'bot');
        }
    } catch (error) {
        removeTypingIndicator();
        addMessage('Connection error. Please start the Rasa server with: rasa run --enable-api --cors "*"', 'bot');
        console.error('Error:', error);
    }
}

// Add message to chat
function addMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = formatMessage(text);
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = getCurrentTime();
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    scrollToBottom();
}

// Format message with HTML
function formatMessage(text) {
    // Convert newlines to <br>
    text = text.replace(/\n/g, '<br>');
    
    // Bold text between **
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    return text;
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing';
    typingDiv.id = 'typing-indicator';
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    
    typingDiv.appendChild(typingIndicator);
    chatMessages.appendChild(typingDiv);
    
    scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Scroll to bottom of chat
function scrollToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
