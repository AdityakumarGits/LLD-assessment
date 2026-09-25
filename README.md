# LLD Practice Platform

A learner-focused web application for practicing Low-Level Design (LLD) problems and receiving structured feedback on design submissions.

The platform allows users to:

- Browse LLD problems
- Read problem requirements
- Submit a structured LLD solution
- Validate submissions before evaluation
- Evaluate submissions using AI
- Fall back to a deterministic rule-based evaluator when AI is unavailable
- View scores and criterion-wise feedback
- Review previous attempts
- Retry failed evaluations

---

## Features

### 1. Problem Library

The platform currently provides practice problems such as:

- Parking Lot System
- Vending Machine
- Elevator System
- Library Management System
- Food Delivery System

Each problem contains:

- Problem statement
- Requirements
- Difficulty
- Expected design considerations

---

### 2. LLD Practice Submission

Users can submit their solution using structured fields:

- Assumptions
- Classes
- Class responsibilities
- Relationships
- Design decisions
- Extensibility
- Edge cases

The structured format makes the submission easier to evaluate and compare.

---

### 3. Submission Validation

Before evaluation, the backend validates the submission.

The validator checks for required sections such as:

- Assumptions
- Classes
- Responsibilities
- Relationships
- Design decisions
- Extensibility
- Edge cases

Invalid submissions are rejected before reaching the evaluator.

---

### 4. Evaluation System

The platform uses two evaluation approaches.

#### AI Evaluator

The primary evaluator uses Google's Gemini API to analyze the submitted LLD solution.

The evaluation considers:

| Criterion | Weight |
|---|---:|
| Requirement Understanding | 15 |
| Class Responsibilities | 20 |
| Encapsulation & Abstraction | 15 |
| Coupling & Cohesion | 15 |
| Extensibility | 15 |
| Edge Cases | 10 |
| Explanation & Trade-offs | 10 |
| **Total** | **100** |

#### Rule-Based Fallback

If the AI service is temporarily unavailable, the platform automatically uses a deterministic rule-based evaluator.

This prevents temporary AI/API failures from making the entire application unusable.

The evaluator type is stored with the evaluation:

- `AI`
- `RULE_BASED`

---

## Evaluation Flow

```text
User Submission
       |
       v
Submission Validator
       |
       v
Evaluation Service
       |
       +----------------------+
       |                      |
       v                      v
  AI Evaluator          Rule-Based Evaluator
       |                      |
       | AI available         | AI unavailable
       +----------+-----------+
                  |
                  v
             Evaluation
                  |
                  v
          Feedback + History