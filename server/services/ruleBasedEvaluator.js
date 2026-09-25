class RuleBasedEvaluator {
  evaluate(problem, submission) {
    const strengths = [];
    const improvements = [];
    const criteria = [];

    // -----------------------------
    // 1. Requirement Understanding
    // -----------------------------

    let requirementScore = 0;

    if (
      submission.assumptions &&
      submission.assumptions.trim().length > 20
    ) {
      requirementScore = 15;
      strengths.push("You clearly documented your assumptions.");
    } else {
      requirementScore = 8;
      improvements.push(
        "Add more detailed assumptions to clarify the system requirements."
      );
    }

    criteria.push({
      name: "Requirement Understanding",
      score: requirementScore,
      maxScore: 15,
      feedback:
        requirementScore === 15
          ? "Requirements and assumptions are clearly documented."
          : "Requirements need more explicit assumptions."
    });

    // -----------------------------
    // 2. Class Responsibilities
    // -----------------------------

    let classScore = 0;

    if (
      Array.isArray(submission.classes) &&
      submission.classes.length >= 3
    ) {
      classScore = 20;
      strengths.push(
        "You identified multiple domain classes with responsibilities."
      );
    } else {
      classScore = 10;
      improvements.push(
        "Consider identifying more domain classes and their responsibilities."
      );
    }

    criteria.push({
      name: "Class Responsibilities",
      score: classScore,
      maxScore: 20,
      feedback:
        classScore === 20
          ? "The submission contains a reasonable number of domain classes."
          : "More domain classes may be required for a complete design."
    });

    // -----------------------------
    // 3. Encapsulation & Abstraction
    // -----------------------------

    let abstractionScore = 0;

    if (
      submission.classes &&
      submission.classes.some(
        (item) =>
          item.responsibilities &&
          item.responsibilities.trim().length > 10
      )
    ) {
      abstractionScore = 15;
      strengths.push(
        "Classes contain clearly defined responsibilities."
      );
    } else {
      abstractionScore = 8;
      improvements.push(
        "Define clearer responsibilities for each class."
      );
    }

    criteria.push({
      name: "Encapsulation and Abstraction",
      score: abstractionScore,
      maxScore: 15,
      feedback:
        abstractionScore === 15
          ? "Responsibilities are reasonably separated between classes."
          : "Responsibilities should be made more explicit."
    });

    // -----------------------------
    // 4. Coupling & Cohesion
    // -----------------------------

    let couplingScore = 0;

    if (
      submission.relationships &&
      submission.relationships.trim().length > 20
    ) {
      couplingScore = 15;
      strengths.push(
        "Relationships between classes are documented."
      );
    } else {
      couplingScore = 8;
      improvements.push(
        "Explain how the classes interact with each other."
      );
    }

    criteria.push({
      name: "Coupling and Cohesion",
      score: couplingScore,
      maxScore: 15,
      feedback:
        couplingScore === 15
          ? "Class relationships are documented clearly."
          : "Add more details about class interactions."
    });

    // -----------------------------
    // 5. Extensibility
    // -----------------------------

    let extensibilityScore = 0;

    if (
      submission.extensibility &&
      submission.extensibility.trim().length > 20
    ) {
      extensibilityScore = 15;
      strengths.push(
        "You explained how the design can be extended."
      );
    } else {
      extensibilityScore = 7;
      improvements.push(
        "Explain how new features can be added without major changes."
      );
    }

    criteria.push({
      name: "Extensibility",
      score: extensibilityScore,
      maxScore: 15,
      feedback:
        extensibilityScore === 15
          ? "The design includes an extensibility discussion."
          : "Add a clear extension strategy."
    });

    // -----------------------------
    // 6. Edge Cases
    // -----------------------------

    let edgeCaseScore = 0;

    if (
      submission.edgeCases &&
      submission.edgeCases.trim().length > 20
    ) {
      edgeCaseScore = 10;
      strengths.push(
        "You considered important edge cases."
      );
    } else {
      edgeCaseScore = 5;
      improvements.push(
        "Add more edge cases and failure scenarios."
      );
    }

    criteria.push({
      name: "Edge Cases",
      score: edgeCaseScore,
      maxScore: 10,
      feedback:
        edgeCaseScore === 10
          ? "Multiple edge cases are considered."
          : "More failure and edge-case scenarios should be documented."
    });

    // -----------------------------
    // 7. Explanation & Trade-offs
    // -----------------------------

    let explanationScore = 0;

    if (
      submission.designDecisions &&
      submission.designDecisions.trim().length > 20
    ) {
      explanationScore = 10;
      strengths.push(
        "Design decisions and trade-offs are explained."
      );
    } else {
      explanationScore = 5;
      improvements.push(
        "Explain why you selected the proposed design."
      );
    }

    criteria.push({
      name: "Explanation and Trade-offs",
      score: explanationScore,
      maxScore: 10,
      feedback:
        explanationScore === 10
          ? "The design decisions are reasonably explained."
          : "Add reasoning behind the major design decisions."
    });

    // -----------------------------
    // Overall Score
    // -----------------------------

    const overallScore = criteria.reduce(
      (total, item) => total + item.score,
      0
    );

    return {
      overallScore,
      summary:
        "The submission was evaluated using the platform's rule-based evaluator because the AI evaluator was temporarily unavailable.",
      strengths,
      improvements,
      criteria
    };
  }
}

module.exports = RuleBasedEvaluator;