import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../services/api";
import Loading from "../components/Loading";
import FeedbackCard from "../components/FeedbackCard";

function Feedback() {
  const { attemptId } = useParams();

  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState("");

  const loadAttempt = async () => {
    try {
      const response = await api.get(`/attempts/${attemptId}`);

      console.log("ATTEMPT DATA:", response.data);

      setAttempt(response.data);
    } catch (err) {
      console.error("LOAD ATTEMPT ERROR:", err);

      setError("Could not load this attempt.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttempt();
  }, [attemptId]);

  const retryEvaluation = async () => {
    setRetrying(true);
    setError("");

    try {
      await api.post(`/attempts/${attemptId}/retry-evaluation`);

      await loadAttempt();
    } catch (err) {
      console.error("RETRY ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Could not retry evaluation."
      );
    } finally {
      setRetrying(false);
    }
  };

  if (loading) {
    return <Loading text="Loading evaluation..." />;
  }

  if (!attempt) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-xl bg-red-50 p-5 text-red-700">
          {error || "Attempt not found."}
        </div>
      </main>
    );
  }

  const evaluation = attempt.evaluation;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-[#6f9f71]">
            Evaluation
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-800">
            {attempt.problem?.title || "LLD Problem"}
          </h1>
        </div>

        <span className="rounded-full bg-[#edf6ed] px-4 py-2 text-sm font-bold text-[#5f8f61]">
          {attempt.status}
        </span>
      </div>

      {/* Evaluation in progress */}
      {attempt.status === "EVALUATING" && (
        <div className="mt-8 rounded-2xl border border-[#dce8dc] bg-white p-6">
          <h2 className="text-xl font-bold">
            Evaluation in progress
          </h2>

          <p className="mt-2 text-gray-600">
            Your submission is safe. We are waiting for the evaluator.
          </p>
        </div>
      )}

      {/* Evaluation failed */}
      {attempt.status === "FAILED" && (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-bold text-red-800">
            Evaluation failed
          </h2>

          <p className="mt-2 text-red-700">
            Your submission was saved. You can retry the evaluation.
          </p>

          <button
            onClick={retryEvaluation}
            disabled={retrying}
            className="mt-4 rounded-lg bg-white px-5 py-2 font-semibold text-red-700"
          >
            {retrying ? "Retrying..." : "Retry Evaluation"}
          </button>
        </div>
      )}

      {/* Evaluation completed */}
      {evaluation && attempt.status === "COMPLETED" && (
        <>
          {/* Overall Score */}
          <section className="mt-8 rounded-2xl border border-[#dce8dc] bg-white p-6">
            <p className="text-sm text-gray-500">
              Overall Score
            </p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-bold text-[#5f8f61]">
                {evaluation.overallScore}
              </span>

              <span className="mb-2 text-gray-500">
                / 100
              </span>
            </div>

            <p className="mt-5 leading-7 text-gray-700">
              {evaluation.summary}
            </p>

            {/* Evaluator type */}
            <p className="mt-4 text-sm text-gray-500">
              Evaluated by:{" "}
              <span className="font-semibold text-[#5f8f61]">
                {evaluation.evaluatorType === "RULE_BASED"
                  ? "Rule-Based Evaluator"
                  : "AI Evaluator"}
              </span>
            </p>
          </section>

          {/* Criteria */}
          <section className="mt-6">
            <h2 className="mb-4 text-2xl font-bold">
              Criterion Feedback
            </h2>

            <div className="space-y-4">
              {evaluation.criteria?.map((criterion, index) => (
                <FeedbackCard
                  key={index}
                  criterion={criterion}
                />
              ))}
            </div>
          </section>

          {/* Strengths and Improvements */}
          <section className="mt-6 grid gap-6 md:grid-cols-2">

            {/* Strengths */}
            <div className="rounded-2xl border border-[#dce8dc] bg-white p-6">
              <h2 className="text-xl font-bold">
                Strengths
              </h2>

              <ul className="mt-4 space-y-3">
                {evaluation.strengths?.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-700"
                  >
                    <span className="mr-2 text-[#6f9f71]">
                      ✓
                    </span>

                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="rounded-2xl border border-[#dce8dc] bg-white p-6">
              <h2 className="text-xl font-bold">
                Improvements
              </h2>

              <ul className="mt-4 space-y-3">
                {evaluation.improvements?.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-700"
                  >
                    <span className="mr-2 text-amber-600">
                      !
                    </span>

                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </section>
        </>
      )}

      {/* Bottom buttons */}
      <div className="mt-8 flex flex-wrap gap-4">

        <Link
          to="/problems"
          className="rounded-lg bg-[#a8cfa8] px-5 py-3 font-semibold text-[#234225]"
        >
          Practice Another Problem
        </Link>

        <Link
          to="/history"
          className="rounded-lg border border-[#cddfcd] bg-white px-5 py-3 font-semibold"
        >
          View History
        </Link>

      </div>
    </main>
  );
}

export default Feedback;