import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";

const emptyClass = {
  name: "",
  responsibility: "",
  methods: ""
};

function Practice() {
  const { problemId } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [classes, setClasses] = useState([{ ...emptyClass }]);
  const [form, setForm] = useState({
    assumptions: "",
    relationships: "",
    designDecisions: "",
    extensibility: "",
    edgeCases: "",
    pseudocode: ""
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProblem = async () => {
      try {
        const response = await api.get(`/problems/${problemId}`);
        setProblem(response.data);
      } catch (err) {
        setError("Could not load the problem.");
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [problemId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const updateClass = (index, field, value) => {
    setClasses((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const addClass = () => {
    setClasses((current) => [...current, { ...emptyClass }]);
  };

  const removeClass = (index) => {
    if (classes.length === 1) {
      return;
    }

    setClasses((current) =>
      current.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const attemptResponse = await api.post("/attempts", {
        problemId,
        userId: "demo-user"
      });

      const attemptId = attemptResponse.data._id;

      await api.post(`/attempts/${attemptId}/submit`, {
        submission: {
          ...form,
          classes: classes.map((item) => ({
            ...item,
            methods: item.methods
              .split(",")
              .map((method) => method.trim())
              .filter(Boolean)
          }))
        }
      });

      navigate(`/feedback/${attemptId}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Could not submit your solution."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading text="Loading practice..." />;
  }

  if (!problem) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-xl bg-red-50 p-5 text-red-700">
          {error || "Problem not found."}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <p className="font-semibold text-[#6f9f71]">Practice</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-800">
          {problem.title}
        </h1>
        <p className="mt-3 text-gray-600">
          Explain your design clearly. There can be more than one valid solution.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        <section className="rounded-2xl border border-[#dce8dc] bg-white p-6">
          <h2 className="text-xl font-bold">1. Assumptions</h2>
          <textarea
            name="assumptions"
            value={form.assumptions}
            onChange={handleChange}
            placeholder="What assumptions are you making?"
            className="mt-4 min-h-32 w-full rounded-lg border border-gray-300 p-4 outline-none focus:border-[#7cae7e]"
            required
          />
        </section>

        <section className="rounded-2xl border border-[#dce8dc] bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">2. Classes / Interfaces</h2>
              <p className="mt-1 text-sm text-gray-500">
                Add the important classes and what each class is responsible for.
              </p>
            </div>

            <button
              type="button"
              onClick={addClass}
              className="rounded-lg border border-[#b9d2b9] px-4 py-2 font-semibold text-[#5f8f61]"
            >
              + Add Class
            </button>
          </div>

          <div className="mt-5 space-y-5">
            {classes.map((item, index) => (
              <div
                key={index}
                className="rounded-xl bg-[#f7faf7] p-5"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    Class {index + 1}
                  </h3>

                  {classes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeClass(index)}
                      className="text-sm text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <input
                  value={item.name}
                  onChange={(event) =>
                    updateClass(index, "name", event.target.value)
                  }
                  placeholder="Class name"
                  className="mt-4 w-full rounded-lg border border-gray-300 p-3"
                  required
                />

                <textarea
                  value={item.responsibility}
                  onChange={(event) =>
                    updateClass(index, "responsibility", event.target.value)
                  }
                  placeholder="Responsibility"
                  className="mt-3 min-h-24 w-full rounded-lg border border-gray-300 p-3"
                  required
                />

                <input
                  value={item.methods}
                  onChange={(event) =>
                    updateClass(index, "methods", event.target.value)
                  }
                  placeholder="Methods, separated by commas"
                  className="mt-3 w-full rounded-lg border border-gray-300 p-3"
                />
              </div>
            ))}
          </div>
        </section>

        {[
          ["relationships", "3. Relationships", "How do your classes interact?"],
          ["designDecisions", "4. Design Decisions", "Why did you choose this design? Mention patterns only when they solve a real problem."],
          ["edgeCases", "5. Edge Cases", "What unusual or failure cases should your design handle?"],
          ["extensibility", "6. Extension Challenge", problem.extensionScenario],
          ["pseudocode", "7. Optional Pseudocode", "Add small pseudocode snippets if they help explain important behavior."]
        ].map(([name, title, placeholder]) => (
          <section
            key={name}
            className="rounded-2xl border border-[#dce8dc] bg-white p-6"
          >
            <h2 className="text-xl font-bold">{title}</h2>

            <textarea
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="mt-4 min-h-32 w-full rounded-lg border border-gray-300 p-4"
              required={name !== "pseudocode"}
            />
          </section>
        ))}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-[#a8cfa8] px-6 py-3 font-semibold text-[#234225] hover:bg-[#96c396] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Design"}
        </button>
      </form>
    </main>
  );
}

export default Practice;
