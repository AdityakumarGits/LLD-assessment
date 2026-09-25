// const Attempt = require("../models/Attempt");
// const Evaluation = require("../models/Evaluation");
// const { validateSubmission } = require("../services/submissionValidator");
// const { evaluateAttempt } = require("../services/evaluationService");

// const createAttempt = async (req, res) => {
//   try {
//     const { problemId, userId } = req.body;

//     if (!problemId || !userId) {
//       return res.status(400).json({
//         message: "problemId and userId are required."
//       });
//     }

//     const attempt = await Attempt.create({
//       problem: problemId,
//       userId,
//       status: "DRAFT"
//     });

//     res.status(201).json(attempt);
//   } catch (error) {
//     res.status(500).json({
//       message: "Could not create attempt."
//     });
//   }
// };

// const getAttempts = async (req, res) => {
//   try {
//     const filter = {};

//     if (req.query.userId) {
//       filter.userId = req.query.userId;
//     }

//     const attempts = await Attempt.find(filter)
//       .populate("problem", "title difficulty")
//       .populate("evaluation")
//       .sort({ createdAt: -1 });

//     res.json(attempts);
//   } catch (error) {
//     res.status(500).json({
//       message: "Could not load attempts."
//     });
//   }
// };

// const getAttempt = async (req, res) => {
//   try {
//     const attempt = await Attempt.findById(req.params.id)
//       .populate("problem")
//       .populate("evaluation");

//     if (!attempt) {
//       return res.status(404).json({
//         message: "Attempt not found."
//       });
//     }

//     res.json(attempt);
//   } catch (error) {
//     res.status(500).json({
//       message: "Could not load attempt."
//     });
//   }
// };

// const submitAttempt = async (req, res) => {
//   try {
//     const attempt = await Attempt.findById(req.params.id);

//     if (!attempt) {
//       return res.status(404).json({
//         message: "Attempt not found."
//       });
//     }

//     if (attempt.status === "COMPLETED" || attempt.status === "EVALUATING") {
//       return res.status(400).json({
//         message: "This attempt is already being evaluated or is completed."
//       });
//     }

//     const validation = validateSubmission(req.body.submission);

//     if (!validation.valid) {
//       return res.status(400).json({
//         message: "Submission validation failed.",
//         errors: validation.errors
//       });
//     }

//     attempt.submission = req.body.submission;
//     attempt.status = "SUBMITTED";

//     await attempt.save();

//     try {
//       await evaluateAttempt(attempt._id);
//     } catch (error) {
//       // Evaluation failure is stored on the attempt.
//       // The submission itself is not lost.
//     }

//     const updatedAttempt = await Attempt.findById(attempt._id)
//       .populate("problem")
//       .populate("evaluation");

//     res.json(updatedAttempt);
//   } catch (error) {
//     res.status(500).json({
//       message: "Could not submit attempt."
//     });
//   }
// };

// const retryEvaluation = async (req, res) => {
//   try {
//     const attempt = await Attempt.findById(req.params.id);

//     if (!attempt) {
//       return res.status(404).json({
//         message: "Attempt not found."
//       });
//     }

//     if (!attempt.submission) {
//       return res.status(400).json({
//         message: "No submission exists for this attempt."
//       });
//     }

//     await Evaluation.deleteMany({
//       attempt: attempt._id
//     });

//     attempt.evaluation = null;
//     attempt.status = "SUBMITTED";

//     await attempt.save();

//     try {
//       await evaluateAttempt(attempt._id);
//     } catch (error) {
//       // Failure is stored.
//     }

//     const updatedAttempt = await Attempt.findById(attempt._id)
//       .populate("problem")
//       .populate("evaluation");

//     res.json(updatedAttempt);
//   } catch (error) {
//     res.status(500).json({
//       message: "Could not retry evaluation."
//     });
//   }
// };

// module.exports = {
//   createAttempt,
//   getAttempts,
//   getAttempt,
//   submitAttempt,
//   retryEvaluation
// };
const Attempt = require("../models/Attempt");
const Evaluation = require("../models/Evaluation");

const { validateSubmission } = require("../services/submissionValidator");
const { evaluateAttempt } = require("../services/evaluationService");

const createAttempt = async (req, res) => {
  try {
    const { problemId, userId } = req.body;

    if (!problemId || !userId) {
      return res.status(400).json({
        message: "problemId and userId are required."
      });
    }

    const attempt = await Attempt.create({
      problem: problemId,
      userId,
      status: "DRAFT"
    });

    res.status(201).json(attempt);
  } catch (error) {
    console.error("CREATE ATTEMPT ERROR:", error);

    res.status(500).json({
      message: "Could not create attempt."
    });
  }
};

const getAttempts = async (req, res) => {
  try {
    const filter = {};

    if (req.query.userId) {
      filter.userId = req.query.userId;
    }

    const attempts = await Attempt.find(filter)
      .populate("problem", "title difficulty")
      .populate("evaluation")
      .sort({ createdAt: -1 });

    res.json(attempts);
  } catch (error) {
    console.error("GET ATTEMPTS ERROR:", error);

    res.status(500).json({
      message: "Could not load attempts."
    });
  }
};

const getAttempt = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id)
      .populate("problem")
      .populate("evaluation");

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found."
      });
    }

    res.json(attempt);
  } catch (error) {
    console.error("GET ATTEMPT ERROR:", error);

    res.status(500).json({
      message: "Could not load attempt."
    });
  }
};

const submitAttempt = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id);

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found."
      });
    }

    if (
      attempt.status === "COMPLETED" ||
      attempt.status === "EVALUATING"
    ) {
      return res.status(400).json({
        message: "This attempt is already being evaluated or is completed."
      });
    }

    const validation = validateSubmission(req.body.submission);

    if (!validation.valid) {
      return res.status(400).json({
        message: "Submission validation failed.",
        errors: validation.errors
      });
    }

    attempt.submission = req.body.submission;
    attempt.status = "SUBMITTED";

    await attempt.save();

    // Start evaluation
    try {
      await evaluateAttempt(attempt._id);
    } catch (error) {
      console.error("EVALUATION ERROR:", error);
      console.error("ERROR MESSAGE:", error.message);
      console.error("ERROR STACK:", error.stack);
    }

    const updatedAttempt = await Attempt.findById(attempt._id)
      .populate("problem")
      .populate("evaluation");

    res.json(updatedAttempt);
  } catch (error) {
    console.error("SUBMIT ATTEMPT ERROR:", error);

    res.status(500).json({
      message: "Could not submit attempt."
    });
  }
};

const retryEvaluation = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id);

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found."
      });
    }

    if (!attempt.submission) {
      return res.status(400).json({
        message: "No submission exists for this attempt."
      });
    }

    await Evaluation.deleteMany({
      attempt: attempt._id
    });

    attempt.evaluation = null;
    attempt.status = "SUBMITTED";

    await attempt.save();

    // Retry evaluation
    try {
      await evaluateAttempt(attempt._id);
    } catch (error) {
      console.error("RETRY EVALUATION ERROR:", error);
      console.error("ERROR MESSAGE:", error.message);
      console.error("ERROR STACK:", error.stack);
    }

    const updatedAttempt = await Attempt.findById(attempt._id)
      .populate("problem")
      .populate("evaluation");

    res.json(updatedAttempt);
  } catch (error) {
    console.error("RETRY ATTEMPT ERROR:", error);

    res.status(500).json({
      message: "Could not retry evaluation."
    });
  }
};

module.exports = {
  createAttempt,
  getAttempts,
  getAttempt,
  submitAttempt,
  retryEvaluation
};