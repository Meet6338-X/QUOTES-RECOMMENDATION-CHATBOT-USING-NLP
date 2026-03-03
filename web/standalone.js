/**
 * Standalone QuoteBot - Works without Rasa server
 * This provides the same functionality as the Rasa chatbot but runs entirely client-side
 */

// Quotes database (same as Rasa actions)
const QUOTES = {
    motivation: [
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
        "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
        "Your limitation—it's only your imagination.",
        "Push yourself, because no one else is going to do it for you."
    ],
    inspiration: [
        "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
        "The best way to predict the future is to create it. - Peter Drucker",
        "You miss 100% of the shots you don't take. - Wayne Gretzky",
        "Whether you think you can or you think you can't, you're right. - Henry Ford",
        "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison",
        "The only impossible journey is the one you never begin. - Tony Robbins",
        "Everything you've ever wanted is on the other side of fear. - George Addair",
        "Believe in yourself! Have faith in your abilities!"
    ],
    funny: [
        "I used to think I was indecisive, but now I'm not too sure.",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "I'm reading a book on anti-gravity. It's impossible to put down!",
        "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
        "Why don't scientists trust atoms? Because they make up everything!",
        "I would tell you a construction joke, but I'm still working on it.",
        "Why did the scarecrow win an award? He was outstanding in his field!",
        "I used to be a banker, but I lost interest."
    ],
    love: [
        "Love is composed of a single soul inhabiting two bodies. - Aristotle",
        "The best thing to hold onto in life is each other. - Audrey Hepburn",
        "Love is when the other person's happiness is more important than your own. - H. Jackson Brown Jr.",
        "You know you're in love when you can't fall asleep because reality is finally better than your dreams. - Dr. Seuss",
        "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more. - Angelita Lim",
        "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
        "To love and be loved is to feel the sun from both sides. - David Viscott",
        "In all the world, there is no heart for me like yours. - Maya Angelou"
    ],
    success: [
        "Success is not how high you have climbed, but how you make a positive difference to the world. - Roy T. Bennett",
        "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
        "Don't be afraid to give up the good to go for the great. - John D. Rockefeller",
        "I find that the harder I work, the more luck I seem to have. - Thomas Jefferson",
        "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
        "The way to get started is to quit talking and begin doing. - Walt Disney",
        "If you really look closely, most overnight successes took a long time. - Steve Jobs",
        "The secret of success is to do the common thing uncommonly well. - John D. Rockefeller Jr."
    ]
};

// Intent patterns for matching user input
const INTENT_PATTERNS = {
    greeting: /^(hi|hello|hey|good morning|good afternoon|good evening|greetings|howdy)/i,
    motivation: /(motivat|inspir|encourag|uplift|positiv|hope|strength|believe|confidence)/i,
    inspiration: /(inspir|inspire|dream|achiev|goal|ambition|passion|purpose|meaning)/i,
    funny: /(funny|humor|joke|laugh|smile|fun|hilarious|comedy|amusing|cheer me up)/i,
    love: /(love|romantic|heart|relationship|couple|valentine|affection|crush)/i,
    success: /(success|successful|achievement|accomplish|win|victory|triumph|excel)/i,
    goodbye: /(bye|goodbye|see you|farewell|take care|later|good night)/i,
    thanks: /(thank|thanks|appreciate|grateful)/i,
    help: /(help|assist|support|what can you do|how do you work)/i
};

// Bot responses
const RESPONSES = {
    greeting: [
        "Hello! 👋 I'm QuoteBot, your personal quote assistant. I can help you find inspiring, funny, love, or success quotes. What type of quote are you looking for today?",
        "Hi there! 👋 Ready to discover some amazing quotes? Ask me for motivation, inspiration, funny quotes, love quotes, or success quotes!",
        "Hey! 👋 I'm here to brighten your day with quotes. What would you like to hear?"
    ],
    help: "I can provide you with quotes in these categories:\n\n🌟 **Motivation** - For when you need a push\n✨ **Inspiration** - To spark your creativity\n😄 **Funny** - To make you laugh\n❤️ **Love** - Romantic and heartwarming\n🎯 **Success** - For achieving your goals\n\nJust tell me what you're looking for!",
    goodbye: [
        "Goodbye! 👋 Remember: \"The best way to predict the future is to create it.\" Come back anytime for more inspiration!",
        "Take care! Keep shining bright! ✨",
        "See you later! Stay inspired! 🌟"
    ],
    thanks: [
        "You're welcome! 😊 I'm glad I could help!",
        "Anytime! Feel free to come back for more quotes!",
        "My pleasure! Keep spreading the positivity!"
    ],
    fallback: [
        "I'm not sure how to respond to that. Try asking for:\n• Motivation\n• Inspiration\n• Funny quotes\n• Love quotes\n• Success quotes",
        "Hmm, I didn't quite catch that. Would you like:\n🌟 Motivation\n✨ Inspiration\n😄 Funny quotes\n❤️ Love quotes\n🎯 Success quotes?"
    ],
    followUp: [
        "Was this helpful? Let me know if you'd like another quote or a different type of inspiration!",
        "Hope you enjoyed that! Want more quotes or something different?",
        "That's one of my favorites! Would you like another?"
    ]
};

// Get random item from array
function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Detect intent from user message
function detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [intent, pattern] of Object.entries(INTENT_PATTERNS)) {
        if (pattern.test(lowerMessage)) {
            return intent;
        }
    }
    
    return 'fallback';
}

// Generate bot response
function generateResponse(userMessage, intent) {
    // Check for category keywords directly in message
    const lowerMessage = userMessage.toLowerCase();
    
    // Direct category detection
    if (lowerMessage.includes('motivat') || lowerMessage.includes('motivation')) {
        return getRandom(QUOTES.motivation);
    }
    if (lowerMessage.includes('inspir') && !lowerMessage.includes('motivat')) {
        return getRandom(QUOTES.inspiration);
    }
    if (lowerMessage.includes('funny') || lowerMessage.includes('joke') || lowerMessage.includes('laugh')) {
        return getRandom(QUOTES.funny);
    }
    if (lowerMessage.includes('love') || lowerMessage.includes('romantic') || lowerMessage.includes('heart')) {
        return getRandom(QUOTES.love);
    }
    if (lowerMessage.includes('success') || lowerMessage.includes('achievement')) {
        return getRandom(QUOTES.success);
    }
    
    // Intent-based responses
    switch (intent) {
        case 'greeting':
            return getRandom(RESPONSES.greeting);
        case 'goodbye':
            return getRandom(RESPONSES.goodbye);
        case 'thanks':
            return getRandom(RESPONSES.thanks);
        case 'help':
            return RESPONSES.help;
        case 'motivation':
            return getRandom(QUOTES.motivation);
        case 'inspiration':
            return getRandom(QUOTES.inspiration);
        case 'funny':
            return getRandom(QUOTES.funny);
        case 'love':
            return getRandom(QUOTES.love);
        case 'success':
            return getRandom(QUOTES.success);
        default:
            return getRandom(RESPONSES.fallback);
    }
}

// Process user message and return bot response
function processMessage(userMessage) {
    const intent = detectIntent(userMessage);
    const response = generateResponse(userMessage, intent);
    
    // Check if this is a quote response (not a greeting, help, etc.)
    const isQuote = ['motivation', 'inspiration', 'funny', 'love', 'success'].includes(intent) ||
                    ['motivat', 'inspir', 'funny', 'love', 'success'].some(word => 
                        userMessage.toLowerCase().includes(word));
    
    return {
        text: response,
        intent: intent,
        isQuote: isQuote
    };
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { processMessage, QUOTES, RESPONSES };
}
