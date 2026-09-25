function validateSubmission(submission) {
  const errors = [];

  if (!submission) {
    return {
      valid: false,
      errors: ["Submission is required."]
    };
  }

  if (!submission.assumptions?.trim()) {
    errors.push("Assumptions are required.");
  }

  if (!Array.isArray(submission.classes) || submission.classes.length === 0) {
    errors.push("At least one class is required.");
  }

  if (Array.isArray(submission.classes)) {
    submission.classes.forEach((item, index) => {
      if (!item.name?.trim()) {
        errors.push(`Class ${index + 1} needs a name.`);
      }

      if (!item.responsibility?.trim()) {
        errors.push(`Class ${index + 1} needs a responsibility.`);
      }
    });
  }

  if (!submission.relationships?.trim()) {
    errors.push("Relationships are required.");
  }

  if (!submission.designDecisions?.trim()) {
    errors.push("Design decisions are required.");
  }

  if (!submission.extensibility?.trim()) {
    errors.push("Extensibility response is required.");
  }

  if (!submission.edgeCases?.trim()) {
    errors.push("Edge cases are required.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateSubmission
};
