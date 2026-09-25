# AI Usage

## Purpose

AI was used in this project in two different ways:

1. During development to assist with implementation and debugging.
2. Inside the application as an optional evaluator for LLD submissions.

---

## 1. AI-Assisted Development

AI assistance was used during development for:

- Understanding the assignment requirements
- Planning the application architecture
- Generating initial project structure
- Reviewing implementation approaches
- Debugging frontend and backend issues
- Improving error handling
- Suggesting test cases
- Improving documentation

All generated code was reviewed, tested, and adjusted during implementation.

---

## 2. AI Evaluation

The application uses Google's Gemini API to evaluate LLD submissions.

The AI evaluator reviews the submission using these criteria:

- Requirement Understanding
- Class Responsibilities
- Encapsulation and Abstraction
- Coupling and Cohesion
- Extensibility
- Edge Cases
- Explanation and Trade-offs

The total evaluation score is 100.

---

## 3. AI Evaluation Flow

```text
User Submission
       |
       v
Submission Validation
       |
       v
Evaluation Service
       |
       v
Gemini AI Evaluator
       |
       +---- Success ----> AI Feedback
       |
       +---- Failure ----> Rule-Based Evaluator
                              |
                              v
                         Deterministic Feedbac
                         

 4. Fallback Evaluation

AI services can temporarily become unavailable.

To avoid losing the user's submission, the platform uses a rule-based evaluator as a fallback.

If the Gemini API fails:

The submission remains saved.
The system retries the AI evaluation.
If the AI evaluation still fails, the rule-based evaluator is used.
The evaluation is saved with RULE_BASED as the evaluator type.

This allows the platform to continue providing feedback even when the external AI service is unavailable.                        



5. AI Output

The AI evaluator is instructed to return structured JSON containing:

Overall score
Summary
Strengths
Improvements
Criterion-wise scores
Criterion-wise feedback

The backend processes this structured response and stores it in MongoDB.

6. API Key Security

The Gemini API key is stored in the backend environment variables.

Example:

GEMINI_API_KEY=your_api_key

The API key is not exposed in the React frontend.

The .env file is excluded from Git using .gitignore.

7. Human Review

AI-generated feedback is intended to support learning and practice.

It is not intended to replace a human LLD interviewer or reviewer.

The rule-based evaluator provides deterministic structural feedback, while the AI evaluator provides more contextual feedback about the submitted design.

8. Limitations

AI evaluation may have limitations such as:

Temporary API availability issues
Incorrect interpretation of a design
Inconsistent feedback
JSON/output formatting issues
Differences in evaluation between attempts

For this reason, the application validates submissions before evaluation and provides a deterministic fallback evaluator.

9. Transparency

AI is used as an evaluation component, not as the only source of truth.

The application architecture keeps the evaluator separate from the core submission and attempt-management logic so that other evaluation strategies can be added later.