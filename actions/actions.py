# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import random

# Import quotes data
MOTIVATION_QUOTES = [
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
]

INSPIRATION_QUOTES = [
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
    "The best way to predict the future is to create it. - Peter Drucker",
    "You miss 100% of the shots you don't take. - Wayne Gretzky",
    "Whether you think you can or you think you can't, you're right. - Henry Ford",
    "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison",
]

class ActionGetRandomQuote(Action):
    """Custom action to return a random quote from a category."""

    def name(self) -> Text:
        return "action_get_random_quote"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # Get the intent that triggered this action
        intent = tracker.latest_message['intent'].get('name')
        
        # Select appropriate quote list based on intent
        if intent == 'motivation':
            quote = random.choice(MOTIVATION_QUOTES)
        elif intent == 'inspiration':
            quote = random.choice(INSPIRATION_QUOTES)
        else:
            quote = "Keep pushing forward!"
        
        dispatcher.utter_message(text=quote)
        
        return []


class ActionLogConversation(Action):
    """Custom action to log conversation for analytics."""

    def name(self) -> Text:
        return "action_log_conversation"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # This is a placeholder for conversation logging
        # In production, you might send this to a database or analytics service
        user_message = tracker.latest_message.get('text')
        intent = tracker.latest_message['intent'].get('name')
        
        print(f"[LOG] User: {user_message} | Intent: {intent}")
        
        return []
