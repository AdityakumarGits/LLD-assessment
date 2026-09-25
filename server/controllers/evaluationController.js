const Evaluation = require("../models/Evaluation");

const getEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);

    if (!evaluation) {
      return res.status(404).json({
        message: "Evaluation not found."
      });
    }

    res.json(evaluation);
  } catch (error) {
    res.status(500).json({
      message: "Could not load evaluation."
    });
  }
};

module.exports = {
  getEvaluation
};
