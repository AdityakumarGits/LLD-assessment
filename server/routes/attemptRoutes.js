const express = require("express");

const {
  createAttempt,
  getAttempts,
  getAttempt,
  submitAttempt,
  retryEvaluation
} = require("../controllers/attemptController");

const router = express.Router();

router.get("/", getAttempts);
router.get("/:id", getAttempt);
router.post("/", createAttempt);
router.post("/:id/submit", submitAttempt);
router.post("/:id/retry-evaluation", retryEvaluation);

module.exports = router;
