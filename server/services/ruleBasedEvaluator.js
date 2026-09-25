class RuleBasedEvaluator {
  evaluate(problem, submission) {
    const strengths = [];
    const improvements = [];
    const criteria = [];

    // =====================================================
    // Helper functions
    // =====================================================

    const hasText = (value, minLength = 20) => {
      return (
        typeof value === "string" &&
        value.trim().length >= minLength
      );
    };

    const getClassCount = () => {
      return Array.isArray(submission.classes)
        ? submission.classes.length
        : 0;
    };

    const getClassesWithResponsibilities = () => {
      if (!Array.isArray(submission.classes)) {
        return [];
      }

      return submission.classes.filter(
        (item) =>
          item &&
          typeof item.responsibilities === "string" &&
          item.responsibilities.trim().length > 10
      );
    };

    // =====================================================
    // 1. Requirement Understanding
    // =====================================================

    let requirementScore = 0;

    if (hasText(submission.assumptions)) {
      requirementScore = 15;

      strengths.push(
        "You clearly documented your assumptions."
      );

      criteria.push({
        name: "Requirement Understanding",
        score: requirementScore,
        maxScore: 15,

        evidence:
          "The submission contains a clear assumptions section that explains important system constraints and expected behaviour.",

        concern:
          "No major concern was detected from the submitted assumptions.",

        suggestion:
          "Continue making assumptions explicit, especially around transaction flow, validation rules and system boundaries."
      });
    } else {
      requirementScore = 8;

      improvements.push(
        "Add more detailed assumptions to clarify the system requirements."
      );

      criteria.push({
        name: "Requirement Understanding",
        score: requirementScore,
        maxScore: 15,

        evidence:
          "The submission contains limited information about assumptions and system requirements.",

        concern:
          "Important behaviour may remain ambiguous because the assumptions are not sufficiently detailed.",

        suggestion:
          "Document assumptions such as valid inputs, transaction behaviour, inventory rules and failure conditions."
      });
    }

    // =====================================================
    // 2. Class Responsibilities
    // =====================================================

    let classScore = 0;

    const classCount = getClassCount();
    const classesWithResponsibilities =
      getClassesWithResponsibilities();

    if (classCount >= 3) {
      classScore = 20;

      strengths.push(
        "You identified multiple domain classes with responsibilities."
      );

      criteria.push({
        name: "Class Responsibilities",
        score: classScore,
        maxScore: 20,

        evidence:
          `The submission defines ${classCount} domain classes. ${classesWithResponsibilities.length} class(es) contain explicit responsibility descriptions.`,

        concern:
          classesWithResponsibilities.length < classCount
            ? "Some classes do not have sufficiently detailed responsibility descriptions."
            : "The responsibilities are documented, although they could be made more precise where responsibilities overlap.",

        suggestion:
          "Keep each class focused on one clear responsibility and avoid placing unrelated business logic inside a single class."
      });
    } else {
      classScore = 10;

      improvements.push(
        "Consider identifying more domain classes and their responsibilities."
      );

      criteria.push({
        name: "Class Responsibilities",
        score: classScore,
        maxScore: 20,

        evidence:
          `The submission defines only ${classCount} domain class(es).`,

        concern:
          "The design may be placing too much responsibility into a small number of classes.",

        suggestion:
          "Identify the main domain objects and give each one a clear responsibility."
      });
    }

    // =====================================================
    // 3. Encapsulation & Abstraction
    // =====================================================

    let abstractionScore = 0;

    if (classesWithResponsibilities.length >= 2) {
      abstractionScore = 15;

      strengths.push(
        "Classes contain clearly defined responsibilities."
      );

      criteria.push({
        name: "Encapsulation and Abstraction",
        score: abstractionScore,
        maxScore: 15,

        evidence:
          `${classesWithResponsibilities.length} class(es) contain explicit responsibility descriptions, showing an attempt to separate behaviour across domain objects.`,

        concern:
          "The submission does not provide enough implementation detail to fully verify private state, public APIs or interface boundaries.",

        suggestion:
          "Clearly define which data each class owns and expose only the operations needed by other classes. Use interfaces where behaviour is expected to vary."
      });
    } else {
      abstractionScore = 8;

      improvements.push(
        "Define clearer responsibilities for each class."
      );

      criteria.push({
        name: "Encapsulation and Abstraction",
        score: abstractionScore,
        maxScore: 15,

        evidence:
          "Only limited class responsibility information is available in the submission.",

        concern:
          "The design does not clearly demonstrate strong encapsulation or abstraction boundaries.",

        suggestion:
          "Define the state owned by each class and the operations that other classes are allowed to use."
      });
    }

    // =====================================================
    // 4. Coupling & Cohesion
    // =====================================================

    let couplingScore = 0;

    if (hasText(submission.relationships)) {
      couplingScore = 15;

      strengths.push(
        "Relationships between classes are documented."
      );

      criteria.push({
        name: "Coupling and Cohesion",
        score: couplingScore,
        maxScore: 15,

        evidence:
          "The submission explains relationships and interactions between the domain classes.",

        concern:
          "The written relationships do not provide enough detail to verify every dependency direction or interaction boundary.",

        suggestion:
          "Prefer dependencies on abstractions where appropriate and keep each class focused on closely related behaviour."
      });
    } else {
      couplingScore = 8;

      improvements.push(
        "Explain how the classes interact with each other."
      );

      criteria.push({
        name: "Coupling and Cohesion",
        score: couplingScore,
        maxScore: 15,

        evidence:
          "The submission contains limited information about class relationships.",

        concern:
          "It is difficult to determine how responsibilities are distributed across the classes.",

        suggestion:
          "Document which class owns, uses or depends on each other class and explain the direction of important interactions."
      });
    }

    // =====================================================
    // 5. Extensibility
    // =====================================================

    let extensibilityScore = 0;

    if (hasText(submission.extensibility)) {
      extensibilityScore = 15;

      strengths.push(
        "You explained how the design can be extended."
      );

      criteria.push({
        name: "Extensibility",
        score: extensibilityScore,
        maxScore: 15,

        evidence:
          "The submission includes an extension strategy describing how additional functionality could be introduced.",

        concern:
          "The exact abstraction boundaries for future extensions may need more detail.",

        suggestion:
          "Identify likely points of change and isolate them behind interfaces or dedicated components when that reduces modification of existing code."
      });
    } else {
      extensibilityScore = 7;

      improvements.push(
        "Explain how new features can be added without major changes."
      );

      criteria.push({
        name: "Extensibility",
        score: extensibilityScore,
        maxScore: 15,

        evidence:
          "The submission contains limited discussion of future extensions.",

        concern:
          "It is unclear how the design would accommodate new behaviours without modifying existing classes.",

        suggestion:
          "Describe one concrete future change and explain which abstraction would isolate that change."
      });
    }

    // =====================================================
    // 6. Edge Cases
    // =====================================================

    let edgeCaseScore = 0;

    if (hasText(submission.edgeCases)) {
      edgeCaseScore = 10;

      strengths.push(
        "You considered important edge cases."
      );

      criteria.push({
        name: "Edge Cases",
        score: edgeCaseScore,
        maxScore: 10,

        evidence:
          "The submission identifies multiple failure and boundary scenarios.",

        concern:
          "The submission does not necessarily describe the exact state transition for every edge case.",

        suggestion:
          "For important failures, describe both the expected result and how system state should remain consistent."
      });
    } else {
      edgeCaseScore = 5;

      improvements.push(
        "Add more edge cases and failure scenarios."
      );

      criteria.push({
        name: "Edge Cases",
        score: edgeCaseScore,
        maxScore: 10,

        evidence:
          "Few or no edge cases are documented.",

        concern:
          "Failure scenarios and boundary conditions are not sufficiently covered.",

        suggestion:
          "Add invalid input, unavailable resources, insufficient payment and failed transaction scenarios where applicable."
      });
    }

    // =====================================================
    // 7. Explanation & Trade-offs
    // =====================================================

    let explanationScore = 0;

    if (hasText(submission.designDecisions)) {
      explanationScore = 10;

      strengths.push(
        "Design decisions and trade-offs are explained."
      );

      criteria.push({
        name: "Explanation and Trade-offs",
        score: explanationScore,
        maxScore: 10,

        evidence:
          "The submission explains important design decisions and provides reasoning behind the chosen structure.",

        concern:
          "Some trade-offs could be made more concrete by describing what would change under an alternative design.",

        suggestion:
          "For major decisions, briefly explain the alternative considered and why the selected approach was preferred."
      });
    } else {
      explanationScore = 5;

      improvements.push(
        "Explain why you selected the proposed design."
      );

      criteria.push({
        name: "Explanation and Trade-offs",
        score: explanationScore,
        maxScore: 10,

        evidence:
          "Limited design reasoning is provided.",

        concern:
          "The evaluator cannot clearly determine why the selected design was chosen.",

        suggestion:
          "Explain the reasoning behind major class boundaries, abstractions and design patterns."
      });
    }

    // =====================================================
    // Overall Score
    // =====================================================

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