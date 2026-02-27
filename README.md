# Quotes Recommendation Chatbot Using NLP

An intelligent conversational chatbot built with **Rasa NLU** that provides users with personalized quotes based on their emotional state and preferences.

## Features

- 🤖 **AI-Powered Conversations** - Natural language understanding for seamless interactions
- 💪 **Motivation Quotes** - Get inspired with powerful motivational quotes
- ✨ **Inspiration Quotes** - Find inspiration from great minds
- ❤️ **Love Quotes** - Beautiful quotes about love and relationships
- 😄 **Funny Quotes** - Humorous content to brighten your day
- 🎯 **Success Quotes** - Wisdom for achieving your goals
- 🌐 **Web Interface** - Beautiful, responsive web chat interface
- ⚡ **Real-time Responses** - Instant quote recommendations
- 👍 **User Feedback** - Rate quotes as satisfied or not satisfied

## Tech Stack

- **Rasa NLU** - Natural Language Understanding framework
- **Python** - Backend programming language
- **HTML/CSS/JavaScript** - Frontend web interface
- **REST API** - Communication between frontend and backend

## Project Structure

```
quotes-chatbot/
├── actions/                # Custom actions
│   ├── __init__.py
│   └── actions.py
├── data/                   # Training data
│   ├── nlu.yml            # NLU training examples
│   ├── stories.yml        # Conversation stories
│   └── rules.yml          # Conversation rules
├── models/                 # Trained Rasa models
├── tests/                  # Test files
├── web/                    # Web interface
│   ├── index.html         # Chat interface
│   ├── style.css          # Styling
│   └── script.js          # Frontend logic
├── config.yml             # Rasa pipeline configuration
├── credentials.yml        # Channel credentials
├── domain.yml             # Domain configuration
├── endpoints.yml          # Endpoint configuration
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

## Installation

### Prerequisites

- Python 3.8 - 3.10
- pip (Python package manager)
- Virtual environment (recommended)

### Setup Instructions

1. **Clone or download the project**
   ```bash
   cd quotes-recommendation-chatbot
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   
   On Windows:
   ```bash
   venv\Scripts\activate
   ```
   
   On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Train the Rasa model**
   ```bash
   rasa train
   ```

> **Note about models folder:** The [`models/`](models/) folder is intentionally empty in the repository. The Rasa model file is created automatically when you run the `rasa train` command above. The trained model will be saved in this folder with a timestamped filename (e.g., `20240227-135008.tar.gz`).

> **Python Version Requirements:** This project requires Python 3.8 - 3.10 for Rasa compatibility. Using Python 3.11 or higher may cause installation issues with some Rasa dependencies.

> **About demo.html:** The [`web/demo.html`](web/demo.html) file works as a standalone JavaScript demo without requiring the trained Rasa model. It provides a client-side preview of the chatbot interface using mock responses, making it useful for testing the UI independently of the backend.

## Running the Chatbot

### Option 1: Command Line Interface

```bash
rasa shell
```

### Option 2: Web Interface

1. **Start the Rasa server** (in one terminal):
   ```bash
   rasa run --enable-api --cors "*"
   ```

2. **Open the web interface**:
   - Open [`web/index.html`](web/index.html) in your browser
   - Or use a local server:
     ```bash
     cd web
     python -m http.server 8080
     ```
   - Then visit: http://localhost:8080

### Option 3: Test Stories

```bash
rasa test
```

## Usage Examples

### Sample Conversations

**Greeting:**
```
User: Hello
Bot: Hey! How can I brighten your day today?
```

**Request Motivation:**
```
User: I need motivation
Bot: "Believe you can and you're halfway there. - Theodore Roosevelt"
      Was this helpful? Let me know if you'd like another quote!
```

**Request Funny Quote:**
```
User: Tell me a joke
Bot: "I am so clever that sometimes I don't understand a single word of what I am saying. - Oscar Wilde"
      Hope this resonated with you! Would you like more quotes?
```

**Feedback:**
```
User: thank you
Bot: You're welcome! I'm glad you liked it. Feel free to ask for more anytime!
```

## Intents Supported

| Intent | Description | Example |
|--------|-------------|---------|
| `greet` | User greetings | "hello", "hi" |
| `goodbye` | User farewells | "bye", "goodbye" |
| `motivation` | Request motivational quotes | "motivate me" |
| `inspiration` | Request inspirational quotes | "inspire me" |
| `love` | Request love quotes | "love quote" |
| `funny` | Request funny quotes | "tell me a joke" |
| `success` | Request success quotes | "success quote" |
| `bot_challenge` | Questions about bot identity | "are you a bot?" |
| `not_satisfied` | User not satisfied with quote | "not helpful" |
| `satisfied` | User satisfied with quote | "thank you" |

## Configuration Files

### NLU Pipeline (`config.yml`)

The chatbot uses a DIETClassifier for intent classification with the following pipeline:
- WhitespaceTokenizer
- RegexFeaturizer
- LexicalSyntacticFeaturizer
- CountVectorsFeaturizer
- DIETClassifier
- ResponseSelector
- FallbackClassifier

### Domain (`domain.yml`)

Contains all intents, responses, and session configuration with 10+ variations for each quote category.

## Troubleshooting

### Common Issues

**1. Rasa installation fails**
```bash
pip install rasa==3.6.0 --no-cache-dir
```

**2. Training fails**
- Check YAML syntax in data files
- Ensure all intents in stories/rules are defined in domain.yml

**3. Web interface not connecting**
- Verify Rasa server is running on port 5005
- Check CORS settings: `--cors "*"`
- Check firewall settings

**4. Low intent confidence**
- Add more training examples to `nlu.yml`
- Retrain the model: `rasa train`

## Future Enhancements

- [ ] Integration with external quote APIs
- [ ] User preference storage
- [ ] Sentiment analysis for better recommendations
- [ ] Multi-language support
- [ ] Voice interface
- [ ] Database integration for quote management

## Team

- **Meet Shah** - Project Lead & Developer
- **Mohit Mukane** - Documentation & Testing
- **Naisargi Meshram** - Content & Stories
- **Mayuresh Kulkarni** - Model Training & Validation

## License

This project is created for educational purposes.

## Acknowledgments

- [Rasa](https://rasa.com/) - Open source conversational AI
- All the great minds whose quotes inspire us daily

---

**Happy Chatting! 💬✨**
