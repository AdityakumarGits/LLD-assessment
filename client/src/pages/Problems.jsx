import { useEffect, useState } from "react";
import api from "../services/api";
import ProblemCard from "../components/ProblemCard";
import Loading from "../components/Loading";

function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const response = await api.get("/problems");
        setProblems(response.data);
      } catch (err) {
        setError("Could not load problems. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800">LLD Problems</h1>
      <p className="mt-2 text-gray-600">
        Pick a problem and start designing.
      </p>

      {loading && <Loading text="Loading problems..." />}

      {error && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <ProblemCard key={problem._id} problem={problem} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Problems;
