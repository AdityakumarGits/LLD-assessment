const Attempt = require("../models/Attempt");
const Evaluation = require("../models/Evaluation");
const AIEvaluator = require("./aiEvaluator");
const RuleBasedEvaluator = require("./ruleBasedEvaluator");

const evaluateAttempt = async (attemptId) => {
  const attempt = await Attempt.findById(attemptId).populate("problem");

  if (!attempt) {
    throw new Error("Attempt not found.");
  }

  attempt.status = "EVALUATING";
  await attempt.save();

  try {
    // --------------------------------
    // First try AI evaluation
    // --------------------------------

    const aiEvaluator = new AIEvaluator();

    let result;
    let evaluationType = "AI";

    try {
      result = await aiEvaluator.evaluate(
        attempt.problem,
        attempt.submission
      );

      console.log("AI evaluation successful.");
    } catch (aiError) {
      console.error(
        "AI evaluation failed:",
        aiError.message
      );

      // --------------------------------
      // Fallback to rule-based evaluator
      // --------------------------------

      console.log(
        "Using rule-based evaluator as fallback..."
      );

      const ruleEvaluator = new RuleBasedEvaluator();

      result = ruleEvaluator.evaluate(
        attempt.problem,
        attempt.submission
      );

      evaluationType = "RULE_BASED";
    }

    // --------------------------------
    // Normalize score
    // --------------------------------

    const rawScore = Number(result.overallScore || 0);

    const overallScore =
      rawScore <= 10
        ? Math.round(rawScore * 10)
        : Math.round(rawScore);

    // --------------------------------
    // Normalize summary
    // --------------------------------

    const summary =
      result.summary ||
      result.overallSummary ||
      "Evaluation completed successfully.";

    // Save evaluation

    const evaluation = await Evaluation.create({
      attempt: attempt._id,
      overallScore,
      summary,
      strengths: result.strengths || [],
      improvements: result.improvements || [],
      criteria: result.criteria || [],
      evaluatorType: evaluationType
    });

    
    // Update attempt

    attempt.evaluation = evaluation._id;
    attempt.status = "COMPLETED";

    await attempt.save();
    return evaluation;

  } catch (error) {
    console.error(
      "EVALUATION SERVICE ERROR:",
      error
    );

    attempt.status = "FAILED";
    await attempt.save();

    throw error;
  }
};

module.exports = {
  evaluateAttempt
};