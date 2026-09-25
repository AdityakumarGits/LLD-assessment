import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";

function ProblemDetails() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProblem = async () => {
      try {
        const response = await api.get(`/problems/${id}`);
        setProblem(response.data);
      } catch (err) {
        setProblem(null);
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [id]);

  if (loading) {
    return <Loading text="Loading problem..." />;
  }

  if (!problem) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-xl bg-red-50 p-5 text-red-700">
          Problem not found.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <span className="rounded-full bg-[#edf6ed] px-3 py-1 text-sm font-semibold text-[#5f8f61]">
        {problem.difficulty}
      </span>

      <h1 className="mt-5 text-4xl font-bold text-gray-800">
        {problem.title}
      </h1>

      <p className="mt-4 leading-8 text-gray-600">
        {problem.description}
      </p>

      <section className="mt-8 rounded-2xl border border-[#dce8dc] bg-white p-6">
        <h2 className="text-xl font-bold">Requirements</h2>

        <ul className="mt-4 space-y-3">
          {problem.requirements.map((item, index) => (
            <li key={index} className="flex gap-3 text-gray-700">
              <span className="text-[#6f9f71]">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-[#dce8dc] bg-white p-6">
        <h2 className="text-xl font-bold">Constraints</h2>

        <ul className="mt-4 space-y-3">
          {problem.constraints.map((item, index) => (
            <li key={index} className="text-gray-700">
              • {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-[#dce8dc] bg-[#f0f7f0] p-6">
        <h2 className="text-xl font-bold">Extension Challenge</h2>
        <p className="mt-3 leading-7 text-gray-700">
          {problem.extensionScenario}
        </p>
      </section>

      <Link
        to={`/attempt/new/${problem._id}`}
        className="mt-8 inline-block rounded-lg bg-[#a8cfa8] px-6 py-3 font-semibold text-[#234225] hover:bg-[#96c396]"
      >
        Start Practice
      </Link>
    </main>
  );
}

export default ProblemDetails;
