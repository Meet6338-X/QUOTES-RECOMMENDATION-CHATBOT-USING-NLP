# Project Design Phase-II - Solution Requirements (Functional & Non-functional)

**Date:** 31 January 2025  
**Team ID:** PNT2022TMID51974  
**Project Name:** Quotes Recommendation Chatbot Using NLP  
**Maximum Marks:** 4 Marks

---

## Functional Requirements

Following are the functional requirements of the proposed solution.

### FR-1: Intent Recognition

| FR No. | Functional Requirement (Epic) | Sub Requirement (Story / Sub-Task) |
|--------|------------------------------|-------------------------------------|
| FR-1.1 | User Greeting | Bot should recognize greeting intents (hello, hi, hey) |
| FR-1.2 | Quote Request | Bot should understand different quote category requests |
| FR-1.3 | Farewell | Bot should recognize goodbye intents |
| FR-1.4 | Feedback | Bot should understand user satisfaction/dissatisfaction |

### FR-2: Quote Categories

| FR No. | Functional Requirement (Epic) | Sub Requirement (Story / Sub-Task) |
|--------|------------------------------|-------------------------------------|
| FR-2.1 | Motivation Quotes | Provide motivational quotes on request |
| FR-2.2 | Inspiration Quotes | Provide inspirational quotes on request |
| FR-2.3 | Love Quotes | Provide love quotes on request |
| FR-2.4 | Funny Quotes | Provide humorous quotes on request |
| FR-2.5 | Success Quotes | Provide success-oriented quotes on request |

### FR-3: Conversation Flow

| FR No. | Functional Requirement (Epic) | Sub Requirement (Story / Sub-Task) |
|--------|------------------------------|-------------------------------------|
| FR-3.1 | Greeting Flow | Respond to user greeting appropriately |
| FR-3.2 | Quote Delivery | Deliver quotes from predefined response set |
| FR-3.3 | Follow-up | Offer additional quotes after delivery |
| FR-3.4 | Goodbye | Handle user farewell gracefully |

### FR-4: User Feedback System

| FR No. | Functional Requirement (Epic) | Sub Requirement (Story / Sub-Task) |
|--------|------------------------------|-------------------------------------|
| FR-4.1 | Positive Feedback | Acknowledge when user is satisfied |
| FR-4.2 | Negative Feedback | Provide alternative quote when dissatisfied |
| FR-4.3 | Thank You Response | Handle expressions of gratitude |

### FR-5: Bot Identity

| FR No. | Functional Requirement (Epic) | Sub Requirement (Story / Sub-Task) |
|--------|------------------------------|-------------------------------------|
| FR-5.1 | Bot Identification | Respond when user asks about bot identity |
| FR-5.2 | Technology Explanation | Explain Rasa NLU powers the chatbot |

---

## Non-functional Requirements

Following are the non-functional requirements of the proposed solution.

### NFR-1: Usability

| NFR No. | Non-Functional Requirement | Description |
|---------|---------------------------|-------------|
| NFR-1.1 | Easy Interface | Web interface should be intuitive and easy to use |
| NFR-1.2 | Clear Responses | Bot responses should be readable and well-formatted |
| NFR-1.3 | Quick Response | Response time should be under 2 seconds |
| NFR-1.4 | Mobile Friendly | Interface should work on mobile devices |

### NFR-2: Performance

| NFR No. | Non-Functional Requirement | Description |
|---------|---------------------------|-------------|
| NFR-2.1 | Intent Classification | Should correctly classify intents with >80% accuracy |
| NFR-2.2 | Response Time | API response time under 1 second |
| NFR-2.3 | Concurrent Users | Support multiple simultaneous conversations |
| NFR-2.4 | Model Training | Training should complete within reasonable time |

### NFR-3: Reliability

| NFR No. | Non-Functional Requirement | Description |
|---------|---------------------------|-------------|
| NFR-3.1 | Uptime | System should be available 99% of the time |
| NFR-3.2 | Error Handling | Graceful handling of unrecognized inputs |
| NFR-3.3 | Fallback | Provide fallback response for low confidence |
| NFR-3.4 | Data Integrity | Quote data should remain consistent |

### NFR-4: Security

| NFR No. | Non-Functional Requirement | Description |
|---------|---------------------------|-------------|
| NFR-4.1 | Input Validation | Sanitize user inputs to prevent injection |
| NFR-4.2 | CORS Policy | Configure appropriate CORS settings |
| NFR-4.3 | API Security | Secure REST API endpoints |

### NFR-5: Maintainability

| NFR No. | Non-Functional Requirement | Description |
|---------|---------------------------|-------------|
| NFR-5.1 | Modular Code | Clear separation between components |
| NFR-5.2 | Configuration | Easy configuration through YAML files |
| NFR-5.3 | Extensibility | Easy to add new quote categories |
| NFR-5.4 | Documentation | Clear documentation for future updates |

### NFR-6: Scalability

| NFR No. | Non-Functional Requirement | Description |
|---------|---------------------------|-------------|
| NFR-6.1 | Horizontal Scaling | Can add more Rasa server instances |
| NFR-6.2 | Database Ready | Architecture supports future database integration |
| NFR-6.3 | API Expansion | Can add more endpoints for features |

---

## Requirements Summary Table

| Category | Count |
|----------|-------|
| Functional Requirements | 5 Epics / 17 Stories |
| Non-functional Requirements | 6 Categories / 17 Items |

---

## Implementation Priority

| Priority | Requirements |
|----------|-------------|
| **High** | FR-1 (Intent Recognition), FR-2 (Quote Categories), NFR-2 (Performance) |
| **Medium** | FR-3 (Conversation Flow), FR-4 (User Feedback), NFR-1 (Usability) |
| **Low** | FR-5 (Bot Identity), NFR-3 (Reliability), NFR-4 (Security) |

---

## Requirements Traceability

| User Story | Functional Requirement | Non-Functional Requirement |
|------------|----------------------|---------------------------|
| USN-1 | FR-2.1 | NFR-2.1 |
| USN-2 | FR-2.2 | NFR-2.1 |
| USN-3 | FR-2.3 | NFR-2.1 |
| USN-4 | FR-2.4 | NFR-2.1 |
| USN-5 | FR-2.5 | NFR-2.1 |
| USN-6 | FR-1.1 | NFR-1.3 |
| USN-7 | FR-1.3 | NFR-1.3 |
| USN-8 | FR-4.1 | NFR-1.3 |
| USN-9 | FR-4.2 | NFR-3.3 |
| USN-10 | FR-5.1 | NFR-1.2 |
