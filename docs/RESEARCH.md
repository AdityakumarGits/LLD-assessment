# Research Notes

## 1. Problem Domain

The project is designed as a practice platform for Low-Level Design (LLD).

LLD focuses on designing classes, interfaces, relationships, responsibilities, and interactions within a software system.

The platform therefore evaluates areas such as:

- Requirement understanding
- Class responsibilities
- Encapsulation
- Abstraction
- Coupling
- Cohesion
- Extensibility
- Edge-case handling
- Design trade-offs

---

## 2. Evaluation Approach

A structured evaluation approach was selected instead of evaluating submissions only using a single overall score.

The evaluation is divided into multiple criteria so that learners can understand which areas of their design need improvement.

The scoring model is:

| Criterion | Weight |
|---|---:|
| Requirement Understanding | 15 |
| Class Responsibilities | 20 |
| Encapsulation & Abstraction | 15 |
| Coupling & Cohesion | 15 |
| Extensibility | 15 |
| Edge Cases | 10 |
| Explanation & Trade-offs | 10 |
| Total | 100 |

---

## 3. Deterministic Validation

A validation layer is used before AI evaluation.

The validator checks whether the required sections of a submission are present.

This provides two benefits:

1. Incomplete submissions can be rejected early.
2. Unnecessary AI API calls can be avoided.

---

## 4. AI Evaluation

AI evaluation is useful for design feedback because LLD submissions contain explanations and design decisions that are difficult to evaluate using simple rules.

The AI evaluator receives the problem statement and candidate submission and produces structured feedback.

However, AI evaluation can fail because of:

- API availability
- Rate limits
- Network errors
- Invalid responses
- Temporary service issues

Therefore, AI is not treated as the only evaluation mechanism.

---

## 5. Fallback Strategy

A deterministic rule-based evaluator is used when AI evaluation is unavailable.

This creates a more reliable application:

```text
Primary Evaluator
      |
      v
   Gemini AI
      |
      | failure
      v
Rule-Based Evaluator

6. Separation of Concerns

The project separates:

HTTP handling
Business logic
Validation
Evaluation
Database models

This makes the application easier to understand and maintain.

For example, controllers should not contain the complete evaluation logic.

Instead:

Controller
    ↓
Evaluation Service
    ↓
Evaluator
7. Extensibility

The evaluator abstraction allows additional evaluation strategies to be introduced later.

Potential future evaluators include:

Human evaluator
Another AI provider
Advanced rule-based evaluator

Similarly, new submission formats can be added without redesigning the complete platform.

8. Scope Decisions

The project intentionally focuses on LLD rather than High-Level System Design.

Therefore, the implementation does not focus on:

Distributed systems
Load balancing
Database sharding
Message queues
Microservices

The goal is to provide a small, understandable platform for practicing object-oriented and domain-level design.

9. Key Design Takeaways

The main design decisions were influenced by the following principles:

Single Responsibility

Each module should have a focused responsibility.

Separation of Concerns

Validation, evaluation, persistence, and HTTP handling are kept separate.

Abstraction

The evaluator abstraction allows different evaluation implementations.

Extensibility

New problems and evaluator strategies should be addable without large changes to the existing system.

Graceful Failure

Temporary external service failures should not cause loss of user submissions.

10. Conclusion

The research and design process resulted in a lightweight architecture that balances simplicity with extensibility.

The application demonstrates how LLD principles can be applied not only to the practice problems themselves, but also to the architecture of the practice platform.