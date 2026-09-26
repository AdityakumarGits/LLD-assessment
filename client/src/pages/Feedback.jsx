import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";
import FeedbackCard from "../components/FeedbackCard";

function Feedback() {
  const { attemptId } = useParams();

  const [attempt, setAttempt] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/attempts/${attemptId}`);

        console.log("Feedback API Response:", response.data);
        setAttempt(response.data);
        setEvaluation(response.data.evaluation);
      } catch (err) {
        console.error("Failed to fetch feedback:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load feedback. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (attemptId) {
      fetchFeedback();
    }
  }, [attemptId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-3">
            Unable to Load Feedback
          </h2>

          <p className="text-gray-600 mb-6">{error}</p>

          <Link
            to="/history"
            className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Back to History
          </Link>
        </div>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <p className="text-gray-600">Attempt not found.</p>
      </div>
    );
  }

  const isCompleted = attempt.status === "COMPLETED";

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/history"
            className="text-green-700 hover:text-green-900 text-sm font-medium"
          >
            ← Back to History
          </Link>

          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Evaluation Feedback
          </h1>

          <p className="text-gray-600 mt-2">
            Review your LLD submission and improve your design.
          </p>
        </div>

        {/* Evaluation not completed */}
        {!isCompleted && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Evaluation is not completed yet
            </h2>

            <p className="text-gray-600 mb-4">
              Current status:
              <span className="font-semibold ml-2 text-green-700">
                {attempt.status}
              </span>
            </p>

            <Link
              to="/history"
              className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
              Back to History
            </Link>
          </div>
        )}

        {/* Completed Evaluation */}
        {isCompleted && evaluation && (
          <>
            {/* Score Card */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Overall Score
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Based on your LLD submission
                  </p>
                </div>

                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-green-600">
                    {evaluation.overallScore}
                  </span>

                  <span className="ml-2 text-gray-500 text-lg">/ 100</span>
                </div>
              </div>

              {/* Evaluator Type */}
              <div className="mt-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  Evaluated by:{" "}
                  {evaluation.evaluatorType === "AI"
                    ? "AI Evaluator"
                    : "Rule-Based Evaluator"}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Summary
              </h2>

              <p className="text-gray-600 leading-7">
                {evaluation.summary ||
                  "No overall summary was provided for this evaluation."}
              </p>
            </div>

            {/* Strengths */}
            {evaluation.strengths?.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Strengths
                </h2>

                <ul className="space-y-3">
                  {evaluation.strengths.map((strength, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-green-600 font-bold">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {evaluation.improvements?.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Areas for Improvement
                </h2>

                <ul className="space-y-3">
                  {evaluation.improvements.map((improvement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-orange-500 font-bold">→</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Criteria */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-5">
                Detailed Evaluation
              </h2>

              {evaluation.criteria?.length > 0 ? (
                <div className="space-y-5">
                  {evaluation.criteria.map((criterion, index) => (
                    <FeedbackCard
                      key={criterion._id || index}
                      criterion={criterion}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <p className="text-gray-500">
                    No detailed criteria feedback available.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link
                to="/problems"
                className="bg-green-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-green-700 transition"
              >
                Practice Another Problem
              </Link>

              <Link
                to="/history"
                className="border border-green-600 text-green-700 px-6 py-3 rounded-lg text-center font-medium hover:bg-green-50 transition"
              >
                View History
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Feedback;
