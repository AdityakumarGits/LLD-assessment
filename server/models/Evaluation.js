const mongoose = require("mongoose");

const EvaluationSchema = new mongoose.Schema(
  {
    attempt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attempt",
      required: true
    },

    overallScore: {
      type: Number,
      required: true
    },

    summary: {
      type: String,
      required: true
    },

    strengths: [
      {
        type: String
      }
    ],

    improvements: [
      {
        type: String
      }
    ],

    criteria: [
      {
        name: String,
        score: Number,
        maxScore: Number,
        feedback: String
      }
    ],

    evaluatorType: {
      type: String,
      enum: ["AI", "RULE_BASED"],
      default: "AI"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Evaluation",
  EvaluationSchema
);