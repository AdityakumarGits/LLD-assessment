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
        name: {
          type: String,
          required: true
        },

        score: {
          type: Number,
          required: true
        },

        maxScore: {
          type: Number,
          required: true
        },

        evidence: {
          type: String,
          default: ""
        },

        concern: {
          type: String,
          default: ""
        },

        suggestion: {
          type: String,
          default: ""
        }
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