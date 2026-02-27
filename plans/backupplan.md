# Quotes Recommendation Chatbot - Backup Plan

## Overview

This document outlines contingency plans and alternative approaches for the Quotes Recommendation Chatbot project. It addresses potential failures, resource constraints, and alternative solutions to ensure project delivery.

---

## 1. Technical Backup Plans

### 1.1 Rasa Installation Issues

**Problem:** Rasa fails to install due to dependency conflicts or system compatibility issues.

**Primary Solution:**
```bash
pip install rasa
```

**Backup Solutions:**

| Approach | Command/Action |
|----------|----------------|
| Use Conda | `conda install -c conda-forge rasa` |
| Specific Version | `pip install rasa==3.6.0` |
| Docker Installation | `docker run -v $(pwd):/app rasa/rasa:3.6.0-full init` |
| Virtual Environment Reset | Delete venv and recreate with Python 3.8-3.10 |

**Fallback:** Use Google Colab or cloud-based Jupyter notebook for development.

---

### 1.2 Model Training Failures

**Problem:** `rasa train` fails or produces low-quality model.

**Primary Approach:** Standard training with default configuration.

**Backup Solutions:**

| Issue | Backup Solution |
|-------|-----------------|
| Insufficient training data | Augment with synonym variations, use ChatGPT to generate examples |
| Overfitting | Reduce epochs, add more validation data |
| Underfitting | Add more diverse examples, increase epochs |
| Pipeline errors | Use simplified pipeline: `WhitespaceTokenizer` + `KeywordIntentClassifier` |
| Memory errors | Reduce batch size in config.yml |

**Minimal Viable Pipeline:**
```yaml
pipeline:
- name: WhitespaceTokenizer
- name: RegexFeaturizer
- name: LexicalSyntacticFeaturizer
- name: CountVectorsFeaturizer
- name: DIETClassifier
  epochs: 50
```

---

### 1.3 Web Interface Issues

**Problem:** REST API connection fails or web interface doesn't load.

**Primary Approach:** HTML + JavaScript frontend with Rasa REST API.

**Backup Solutions:**

| Issue | Backup Solution |
|-------|-----------------|
| CORS errors | Use Rasa X for testing, or deploy with nginx proxy |
| API not responding | Use `rasa shell` for CLI testing |
| Frontend issues | Use pre-built Rasa Webchat widget |
| Server crashes | Implement health checks and auto-restart |

**Alternative Frontend Options:**
1. **Rasa Webchat** - Embeddable widget
2. **Telegram Bot** - Alternative channel
3. **Slack Integration** - For team environments
4. **Command Line Only** - Fallback to `rasa shell`

---

## 2. Data Backup Plans

### 2.1 Insufficient Training Examples

**Problem:** NLU model doesn't recognize user intents accurately.

**Backup Strategies:**

| Strategy | Implementation |
|----------|----------------|
| Data Augmentation | Use synonym replacement, paraphrasing tools |
| Transfer Learning | Use pre-trained models (Spacy, BERT) |
| Rule-based Fallback | Implement `RegexEntityExtractor` for pattern matching |
| Keyword Matching | Use `KeywordIntentClassifier` as fallback |

**Quick Intent Recognition Backup:**
```yaml
# In config.yml - simplified pipeline
pipeline:
- name: WhitespaceTokenizer
- name: KeywordIntentClassifier
```

---

### 2.2 Quote Database Issues

**Problem:** Limited or repetitive quotes.

**Backup Solutions:**

1. **External Quote APIs:**
   - Zen Quotes API
   - Quotable API
   - Forismatic API

2. **Web Scraping (with permission):**
   - BrainyQuote
   - Goodreads
   - Quote Garden

3. **Manual Curation:**
   - Create categorized CSV files
   - Load quotes from JSON files

**Backup Quote Storage Structure:**
```json
{
  "quotes": [
    {
      "category": "motivation",
      "text": "The only way to do great work is to love what you do.",
      "author": "Steve Jobs"
    }
  ]
}
```

---

## 3. Deployment Backup Plans

### 3.1 Local Deployment Fails

**Primary:** Local Rasa server + HTML interface.

**Backup Options:**

| Option | Use Case |
|--------|----------|
| Rasa X | Local testing and conversation review |
| Docker Compose | Containerized deployment |
| Heroku | Free cloud deployment |
| AWS EC2 | Scalable cloud deployment |
| Google Cloud Run | Serverless deployment |

**Docker Compose Backup:**
```yaml
version: '3.0'
services:
  rasa:
    image: rasa/rasa:3.6.0-full
    ports:
      - 5005:5005
    volumes:
      - ./:/app
    command: run --enable-api --cors "*"
  
  action_server:
    image: rasa/rasa-sdk:3.6.0
    volumes:
      - ./actions:/app/actions
```

---

### 3.2 Performance Issues

**Problem:** Slow response times or high memory usage.

**Optimization Backups:**

| Issue | Solution |
|-------|----------|
| Slow responses | Reduce model complexity, use smaller pipeline |
| High memory | Use `CountVectorsFeaturizer` instead of transformer models |
| Long training | Reduce epochs, use `TEDPolicy` with fewer epochs |
| Large model size | Prune unused intents, compress model |

**Lightweight Config:**
```yaml
pipeline:
- name: WhitespaceTokenizer
- name: RegexFeaturizer
- name: CountVectorsFeaturizer
- name: LogisticRegressionClassifier

policies:
- name: MemoizationPolicy
- name: TEDPolicy
  max_history: 3
  epochs: 50
```

---

## 4. Functional Backup Plans

### 4.1 Intent Recognition Failures

**Fallback Strategy:**

```yaml
# In domain.yml
responses:
  utter_default:
    - text: "I'm not sure I understood. Could you rephrase?"
    - text: "I didn't catch that. Try asking for motivation, inspiration, love quotes, or funny quotes."

# In config.yml
policies:
- name: RulePolicy
  core_fallback_threshold: 0.3
  core_fallback_action_name: "action_default_fallback"
  enable_fallback_prediction: true
```

---

### 4.2 Rules-Based Fallback

**Problem:** Stories-based dialogue management is too complex or unpredictable.

**Backup Solution - Use Rules:**

```yaml
# rules.yml
version: "3.1"

rules:
- rule: Say goodbye anytime the user says goodbye
  steps:
  - intent: goodbye
  - action: utter_goodbye

- rule: Say 'I am a bot' anytime the user challenges
  steps:
  - intent: bot_challenge
  - action: utter_iamabot

- rule: repeat the task when the user is not satisfied
  steps:
  - intent: not_satisfied
  - action: utter_notsatisfied

- rule: say thanks when the user is satisfied
  steps:
  - intent: satisfied
  - action: utter_satisfied
```

**Advantages of Rules:**
- Predictable behavior
- Easier to debug
- No training required for fixed patterns
- Good for satisfaction/bot identity handling

---

### 4.3 Category Expansion

**Problem:** Need to add new quote categories quickly.

**Rapid Addition Process:**

1. Add new intent in `nlu.yml` (10-15 examples)
2. Add response in `domain.yml`
3. Add story in `stories.yml`
4. Add rule in `rules.yml` (if fixed pattern)
5. Retrain: `rasa train`

**Modular Approach:**
Create a separate `quotes.py` action file to dynamically load quotes from external sources:

```python
# actions/actions.py
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import random

class ActionGetQuote(Action):
    def name(self) -> Text:
        return "action_get_quote"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        intent = tracker.latest_message['intent'].get('name')
        quotes = self.load_quotes(intent)
        quote = random.choice(quotes)
        dispatcher.utter_message(text=quote)
        return []
    
    def load_quotes(self, category: Text) -> List[Text]:
        # Load from file or API
        pass
```

---

## 5. Team & Resource Backup Plans

### 5.1 Team Member Unavailability

| Role | Backup Plan |
|------|-------------|
| NLU Developer | Use pre-built templates from Rasa docs |
| Frontend Developer | Use basic HTML/JS without frameworks |
| Testing Lead | Implement automated testing with `rasa test` |
| Deployment Lead | Use Docker for simplified deployment |

---

### 5.2 Timeline Compression

**If time is limited, prioritize:**

**Phase 1 (Must Have):**
- Basic intents: greet, goodbye, motivation, inspiration
- Rules for: goodbye, bot_challenge
- Simple responses
- CLI testing only

**Phase 2 (Should Have):**
- Additional categories: love, funny, success
- Rules for: satisfied, not_satisfied
- Web interface
- REST API

**Phase 3 (Nice to Have):**
- Custom actions
- Database integration
- Advanced NLU pipeline

---

## 6. Testing Backup Plans

### 6.1 Automated Testing Failure

**Primary:** `rasa test` with story evaluation.

**Backup Testing:**

```bash
# Manual testing checklist
rasa shell

# Test each intent:
# 1. greet -> expect greeting
# 2. motivation -> expect motivational quote
# 3. inspiration -> expect inspirational quote
# 4. love -> expect love quote
# 5. funny -> expect funny quote
# 6. success -> expect success quote
# 7. goodbye -> expect farewell
# 8. bot_challenge -> expect "I am a bot" response
# 9. not_satisfied -> expect alternative quote
# 10. satisfied -> expect thank you response
```

---

### 6.2 Validation Script

Create a quick validation script:

```python
# test_bot.py
import requests

TEST_CASES = [
    ("hello", "greet"),
    ("motivate me", "motivation"),
    ("inspire me", "inspiration"),
    ("love quote", "love"),
    ("tell me a joke", "funny"),
    ("success quote", "success"),
    ("are you a bot", "bot_challenge"),
    ("this is not helpful", "not_satisfied"),
    ("thank you", "satisfied"),
]

url = "http://localhost:5005/model/parse"

for text, expected_intent in TEST_CASES:
    response = requests.post(url, json={"text": text})
    result = response.json()
    predicted = result['intent']['name']
    confidence = result['intent']['confidence']
    status = "✓" if predicted == expected_intent else "✗"
    print(f"{status} '{text}' -> {predicted} ({confidence:.2f})")
```

---

## 7. Recovery Procedures

### 7.1 Complete Project Reset

If the project becomes corrupted:

```bash
# 1. Backup current work
cp -r quotes-chatbot quotes-chatbot-backup

# 2. Clean slate
rm -rf quotes-chatbot
mkdir quotes-chatbot
cd quotes-chatbot

# 3. Reinitialize
python -m venv venv
venv\Scripts\activate
pip install rasa
rasa init

# 4. Restore your data files from backup
cp ../quotes-chatbot-backup/data/nlu.yml data/
cp ../quotes-chatbot-backup/data/stories.yml data/
cp ../quotes-chatbot-backup/data/rules.yml data/
cp ../quotes-chatbot-backup/domain.yml .

# 5. Retrain
rasa train
```

---

### 7.2 Model Rollback

If new model performs worse:

```bash
# List available models
ls models/

# Use specific model
rasa shell -m models/older-model.tar.gz

# Or copy older model as default
cp models/older-model.tar.gz models/model.tar.gz
```

---

## 8. Alternative Architectures

### 8.1 Minimal Architecture (No Custom Actions)

Use only `domain.yml` responses without Python actions:

```yaml
# domain.yml only
responses:
  utter_motivation:
    - text: "Believe you can and you're halfway there."
    - text: "The future belongs to those who believe in the beauty of their dreams."
```

### 8.2 API-Only Architecture

If web interface fails, expose API only:

```bash
rasa run --enable-api --port 5005
```

Test with curl:
```bash
curl -X POST http://localhost:5005/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{"sender": "user1", "message": "hello"}'
```

---

## 9. Documentation Backup

### 9.1 Essential Documentation

Keep these files versioned (Git):
- `nlu.yml`
- `stories.yml`
- `rules.yml`
- `domain.yml`
- `config.yml`
- `requirements.txt`

### 9.2 Quick Reference Card

```
RASA QUICK COMMANDS:
-------------------
Train:     rasa train
Shell:     rasa shell
API:       rasa run --enable-api --cors "*"
Actions:   rasa run actions
Test:      rasa test
Validate:  rasa data validate
```

---

## 10. External Dependencies Backup

### 10.1 Internet Connectivity Issues

- Download all required packages beforehand
- Keep offline copies of documentation
- Use local quote databases (JSON/CSV files)

### 10.2 API Rate Limits

If using external quote APIs:
- Implement local caching
- Use fallback to local quote database
- Implement request queuing

---

## Summary of Critical Backups

| Component | Primary | Backup |
|-----------|---------|--------|
| Framework | Rasa 3.x | Rasa 3.6.0 (stable) |
| Training | DIETClassifier | KeywordIntentClassifier |
| Dialogue | Stories | Rules |
| Storage | domain.yml | External JSON/CSV |
| Interface | HTML/JS | Rasa Webchat |
| Deployment | Local server | Docker/Heroku |
| Testing | Automated | Manual checklist |

## Intents and Actions Reference

### Core Intents
- `greet`, `goodbye` - Basic conversation
- `motivation`, `inspiration`, `love`, `funny`, `success` - Quote categories
- `bot_challenge` - Bot identity verification
- `not_satisfied`, `satisfied` - User feedback

### Core Actions/Responses
- `utter_greet`, `utter_goodbye`, `utter_ask`
- `utter_motivation`, `utter_inspiration`, `utter_love`, `utter_funny`, `utter_success`
- `utter_helpful`, `utter_iamabot`, `utter_notsatisfied`, `utter_satisfied`

---

*Last Updated: 2026-02-27*
*Version: 1.0*
