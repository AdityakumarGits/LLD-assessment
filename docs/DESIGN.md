# Design Document

## 1. Overview

LLD Practice Platform is a web application that allows users to practice Low-Level Design problems and receive structured feedback on their solutions.

The application is divided into three main parts:

- React frontend
- Express.js backend
- MongoDB database

An optional Gemini-based evaluator is used for AI feedback.

---

## 2. Architecture

```text
                React Frontend
                      |
                      | HTTP / REST API
                      v
                Express Backend
                      |
          +-----------+-----------+
          |                       |
          v                       v
     Application              MongoDB
      Services
          |
          v
   Evaluation Service
          |
     +----+----+
     |         |
     v         v
  Gemini    Rule-Based
 Evaluator   Evaluator
3. Frontend

The frontend is built using React and Vite.

Main pages:

Home
Problems
Problem Details
Practice
Feedback
History

The frontend communicates with the backend using Axios.

React Router is used for page navigation.

4. Backend

The backend is built using Express.js.

The backend is responsible for:

Problem management
Attempt management
Submission validation
Evaluation
Feedback storage
Error handling

The backend follows a simple separation between:

Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
MongoDB
5. Domain Models
Problem

Represents an LLD practice problem.

Important fields:

title
description
difficulty
requirements
Attempt

Represents one user's attempt at solving a problem.

Important fields:

problem
userId
submission
status
evaluation

Attempt statuses:

DRAFT
SUBMITTED
EVALUATING
COMPLETED
FAILED
Evaluation

Stores the result of evaluating an attempt.

Important fields:

attempt
overallScore
summary
strengths
improvements
criteria
evaluatorType
6. Submission Validation

Before evaluation, the backend validates the submission.

Required sections include:

Assumptions
Classes
Responsibilities
Relationships
Design Decisions
Extensibility
Edge Cases

This prevents incomplete submissions from being sent directly to the evaluator.

7. Evaluation Design

Evaluation is separated from the attempt controller.

The main evaluation flow is:

Attempt
   ↓
Evaluation Service
   ↓
Evaluator
   ↓
Evaluation Result
   ↓
MongoDB

The application supports two evaluator implementations:

Evaluator
   |
   +--- AIEvaluator
   |
   +--- RuleBasedEvaluator

This makes the evaluation system easier to extend.

8. AI Evaluator

The AI evaluator uses Google's Gemini API.

It receives:

Problem information
User submission
Evaluation criteria

It returns structured feedback containing:

Overall score
Summary
Strengths
Improvements
Criterion scores
Criterion feedback

The API key is kept on the backend.

9. Rule-Based Evaluator

The rule-based evaluator provides deterministic feedback.

It checks whether important sections of the submission are present and sufficiently detailed.

It is used as a fallback when the AI evaluator is unavailable.

This prevents temporary external API failures from preventing users from receiving feedback.

10. Failure Handling

The application preserves the user's submission even if evaluation fails.

The flow is:

Submission
    ↓
Saved
    ↓
AI Evaluation
    ↓
Failure
    ↓
Rule-Based Evaluation
    ↓
Evaluation Saved

The user can also retry evaluation when required.

11. Extensibility

The design allows new evaluator types to be added without changing the core attempt workflow.

For example:

Evaluator
   |
   +--- AIEvaluator
   |
   +--- RuleBasedEvaluator
   |
   +--- HumanEvaluator

Additional submission formats can also be introduced later, such as:

UML diagrams
Code submissions
Class diagrams
Pseudocode
12. Why This Design

The application intentionally uses a simple architecture suitable for a small LLD practice platform.

The design avoids unnecessary complexity such as:

Microservices
Event-driven architecture
Complex authentication
Distributed queues

The focus is on:

Clear responsibilities
Maintainability
Extensibility
Simple failure handling
Easy local development
13. Future Extensions

Possible future improvements include:

Authentication and user profiles
More LLD problems
UML diagram support
Human evaluation
Advanced AI evaluation
Progress analytics
Evaluation comparison
Leaderboards