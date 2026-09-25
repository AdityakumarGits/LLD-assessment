const mongoose = require("mongoose");

const classDesignSchema = new mongoose.Schema(
  {
    name: String,
    responsibility: String,
    methods: [String]
  },
  { _id: false }
);

const submissionSchema = new mongoose.Schema(
  {
    assumptions: String,
    classes: [classDesignSchema],
    relationships: String,
    designDecisions: String,
    extensibility: String,
    edgeCases: String,
    pseudocode: String
  },
  { _id: false }
);

const attemptSchema = new mongoose.Schema(
  {
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true
    },

    userId: {
      type: String,
      required: true
    },

    submission: submissionSchema,

    status: {
      type: String,
      enum: [
        "DRAFT",
        "SUBMITTED",
        "EVALUATING",
        "COMPLETED",
        "FAILED"
      ],
      default: "DRAFT"
    },

    evaluation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evaluation",
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Attempt", attemptSchema);
