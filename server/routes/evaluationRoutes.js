const express = require("express");
const { getEvaluation } = require("../controllers/evaluationController");

const router = express.Router();

router.get("/:id", getEvaluation);

module.exports = router;
