# Project Planning Phase - Project Planning Template (Product Backlog, Sprint Planning, Stories, Story points)

**Date:** 18 October 2022  
**Team ID:** PNT2022TMID51974  
**Project Name:** Quotes Recommendation Chatbot Using NLP  
**Maximum Marks:** 8 Marks

---

## Product Backlog, Sprint Schedule, and Estimation

Use the below template to create product backlog and sprint schedule.

---

## Sprint Planning

### Sprint 1: Foundation & Core Functionality

| Sprint | Functional Requirement (Epic) | User Story Number | User Story / Task | Story Points | Priority | Team Members |
|--------|--------------------------------|-------------------|-------------------|--------------|----------|--------------|
| Sprint-1 | Quote Categories | USN-1 | As a user, I can request a motivational quote | 2 | High | Meet Shah |
| Sprint-1 | Quote Categories | USN-2 | As a user, I can request an inspirational quote | 2 | High | Naisargi Meshram |
| Sprint-1 | Quote Categories | USN-3 | As a user, I can request a love quote | 2 | High | Mayuresh Kulkarni |
| Sprint-1 | Quote Categories | USN-4 | As a user, I can request a funny quote | 2 | High | Mohit Mukane |
| Sprint-1 | Quote Categories | USN-5 | As a user, I can request a success quote | 2 | High | Meet Shah |
| Sprint-1 | Conversation6 | As a | USN- user, I can greet the bot | 1 | High | Meet Shah |
| Sprint-1 | Conversation | USN-7 | As a user, I can say goodbye | 1 | High | Naisargi Meshram |
| Sprint-1 | Setup | ENV-1 | Set up Rasa NLU environment | 3 | High | All Team |
| Sprint-1 | Setup | ENV-2 | Configure NLU pipeline | 2 | High | Mayuresh Kulkarni |

**Sprint 1 Total Points:** 17

---

### Sprint 2: Enhanced Features & UI

| Sprint | Functional Requirement (Epic) | User Story Number | User Story / Task | Story Points | Priority | Team Members |
|--------|--------------------------------|-------------------|-------------------|--------------|----------|--------------|
| Sprint-2 | Feedback | USN-8 | As a user, I can express satisfaction | 2 | Medium | Meet Shah |
| Sprint-2 | Feedback | USN-9 | As a user, I can express dissatisfaction | 2 | Medium | Mohit Mukane |
| Sprint-2 | Bot Identity | USN-10 | As a user, I can ask about the bot | 1 | Low | Naisargi Meshram |
| Sprint-2 | Web UI | UI-1 | Create web interface | 5 | High | Mayuresh Kulkarni |
| Sprint-2 | Web UI | UI-2 | Style the chat interface | 3 | High | Meet Shah |
| Sprint-2 | Web UI | UI-3 | Integrate API with frontend | 3 | High | Mohit Mukane |
| Sprint-2 | Training | TR-1 | Add more NLU training examples | 2 | Medium | All Team |
| Sprint-2 | Testing | TS-1 | Test conversation flows | 2 | Medium | All Team |

**Sprint 2 Total Points:** 20

---

### Sprint 3: Refinement & Deployment

| Sprint | Functional Requirement (Epic) | User Story Number | User Story / Task | Story Points | Priority | Team Members |
|--------|--------------------------------|-------------------|-------------------|--------------|----------|--------------|
| Sprint-3 | Refinement | RF-1 | Improve intent classification accuracy | 3 | Medium | Mayuresh Kulkarni |
| Sprint-3 | Refinement | RF-2 | Add more response variations | 2 | Medium | Naisargi Meshram |
| Sprint-3 | Deployment | DP-1 | Deploy to local server | 3 | High | Meet Shah |
| Sprint-3 | Documentation | DOC-1 | Create README documentation | 2 | Medium | Mohit Mukane |
| Sprint-3 | Testing | TS-2 | Perform user acceptance testing | 2 | Medium | All Team |
| Sprint-3 | Optimization | OP-1 | Optimize response time | 2 | Low | Mayuresh Kulkarni |
| Sprint-3 | Demo | DM-1 | Create demo video | 1 | Low | All Team |

**Sprint 3 Total Points:** 15

---

## Story Points Summary

| Sprint | Total Story Points | Duration |
|--------|-------------------|----------|
| Sprint-1 | 17 | 6 Days |
| Sprint-2 | 20 | 6 Days |
| Sprint-3 | 15 | 6 Days |
| **Total** | **52** | **18 Days** |

---

## Team Member Assignments

| Team Member | Role | Responsibilities |
|-------------|------|-----------------|
| Meet Shah | Project Lead | Development, Integration, Deployment |
| Mohit Mukane | Documentation | Documentation, Testing, UI |
| Naisargi Meshram | Content | Quote collection, Stories creation |
| Mayuresh Kulkarni | Model Training | NLU training, Configuration, Validation |

---

## Velocity Calculation

**Assumption:** 6-day sprint duration

| Sprint | Story Points | Velocity (points/day) |
|--------|--------------|----------------------|
| Sprint-1 | 17 | 2.83 |
| Sprint-2 | 20 | 3.33 |
| Sprint-3 | 15 | 2.50 |

**Average Velocity:** (17 + 20 + 15) / 18 = 2.89 points per day

---

## Priority Definitions

| Priority | Description |
|----------|-------------|
| High | Must have for MVP |
| Medium | Should have for full release |
| Low | Nice to have, can be deferred |

---

## Definition of Done

Each user story is considered complete when:

1. Code implemented and reviewed
2. Unit tests passed
3. Integrated with main branch
4. Documentation updated
5. Tested on staging environment

---

## Sprint Goals

### Sprint 1 Goals

- Set up Rasa NLU development environment
- Configure NLU pipeline with DIETClassifier
- Implement core quote category intents
- Create basic conversation flows

### Sprint 2 Goals

- Implement user feedback system
- Build web interface for chatbot
- Integrate frontend with Rasa API
- Add more training data

### Sprint 3 Goals

- Optimize performance
- Deploy to production
- Complete documentation
- Conduct user testing
