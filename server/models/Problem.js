const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },

    difficulty: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    requirements: {
      type: [String],
      required: true
    },

    constraints: {
      type: [String],
      required: true
    },

    extensionScenario: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Problem", problemSchema);
