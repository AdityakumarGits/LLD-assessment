const Problem = require("../models/Problem");

const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: 1 });
    res.json(problems);
  } catch (error) {
    res.status(500).json({
      message: "Could not load problems."
    });
  }
};

const getProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found."
      });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({
      message: "Could not load problem."
    });
  }
};

module.exports = {
  getProblems,
  getProblem
};
