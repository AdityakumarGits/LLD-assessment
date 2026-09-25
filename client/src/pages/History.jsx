import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";

function History() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await api.get("/attempts?userId=demo-user");
        setAttempts(response.data);
      } catch (err) {
        setAttempts([]);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800">Attempt History</h1>
      <p className="mt-2 text-gray-600">
        Review your previous practice attempts.
      </p>

      {loading && <Loading text="Loading history..." />}

      {!loading && attempts.length === 0 && (
        <div className="mt-8 rounded-2xl border border-[#dce8dc] bg-white p-8 text-center">
          <h2 className="text-xl font-bold">No attempts yet</h2>
          <p className="mt-2 text-gray-600">
            Solve your first LLD problem to see your progress here.
          </p>
          <Link
            to="/problems"
            className="mt-5 inline-block rounded-lg bg-[#a8cfa8] px-5 py-2.5 font-semibold text-[#234225]"
          >
            Start Practicing
          </Link>
        </div>
      )}

      {!loading && attempts.length > 0 && (
        <div className="mt-8 space-y-4">
          {attempts.map((attempt) => (
            <div
              key={attempt._id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#dce8dc] bg-white p-6"
            >
              <div>
                <h2 className="text-lg font-bold">
                  {attempt.problem?.title || "LLD Problem"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(attempt.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {attempt.evaluation?.overallScore != null && (
                  <span className="font-bold text-[#5f8f61]">
                    {attempt.evaluation.overallScore}/100
                  </span>
                )}

                <span className="rounded-full bg-[#edf6ed] px-3 py-1 text-xs font-semibold text-[#5f8f61]">
                  {attempt.status}
                </span>

                <Link
                  to={`/feedback/${attempt._id}`}
                  className="rounded-lg border border-[#cddfcd] px-4 py-2 text-sm font-semibold"
                >
                  Review
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default History;
