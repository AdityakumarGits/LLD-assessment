const { GoogleGenerativeAI } = require("@google/generative-ai");
const Evaluator = require("./evaluator");

class AIEvaluator extends Evaluator {
  constructor() {
    super();

    this.apiKey = process.env.GEMINI_API_KEY;

    if (this.apiKey) {
      this.client = new GoogleGenerativeAI(this.apiKey);
    }
  }

  async evaluate(problem, submission) {
    if (!this.client) {
      throw new Error("GEMINI_API_KEY is missing.");
    }

    const model = this.client.getGenerativeModel({
      model:  "gemini-3.8-flash"
    });

    const prompt = `
You are an experienced Low-Level Design interviewer and mentor.

Evaluate the learner's LLD design using the problem requirements and fixed rubric.

Important rules:
- There can be multiple valid LLD designs.
- Do not penalize the learner simply because their design differs from a reference solution.
- Give evidence from the learner's submission.
- Do not reward unnecessary design patterns.
- Suggestions must be actionable.
- Return ONLY valid JSON.
- Scores must be between 0 and 10.

Problem:
${JSON.stringify(problem, null, 2)}

Learner submission:
${JSON.stringify(submission, null, 2)}

Rubric:
1. Requirement Understanding - 15%
2. Class Responsibilities - 20%
3. Encapsulation & Abstraction - 15%
4. Coupling / Cohesion - 15%
5. Extensibility - 15%
6. Edge Cases - 10%
7. Explanation / Trade-offs - 10%

Return exactly this shape:
{
  "overallScore": 0,
  "overallSummary": "",
  "criteria": [
    {
      "name": "",
      "score": 0,
      "maxScore": 10,
      "evidence": "",
      "concern": "",
      "suggestion": "",
      "confidence": 0
    }
  ],
  "strengths": [],
  "improvements": [],
  "nextChallenge": ""
}
`;

let result;

try {
  result = await model.generateContent(prompt);
} catch (error) {
  console.error("Gemini first attempt failed:", error.message);

  // Retry once after 3 seconds if Gemini is temporarily unavailable
  if (error.status === 503) {
    console.log("Gemini is busy. Retrying after 3 seconds...");

    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    result = await model.generateContent(prompt);
  } else {
    throw error;
  }
}

const text = result.response.text();

console.log("GEMINI RESPONSE:");
console.log(text);

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanText);
  }
}

module.exports = AIEvaluator;
