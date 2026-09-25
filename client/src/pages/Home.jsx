import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="bg-[#f7faf7]">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="font-semibold text-[#6f9f71]">
            Practice. Design. Improve.
          </p>

          <h1 className="mt-4 text-5xl font-bold leading-tight text-gray-800 md:text-6xl">
            Practice Low-Level Design with useful feedback.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Solve real-world LLD problems, explain your design, receive
            structured feedback, and retry to improve.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/problems"
              className="rounded-lg bg-[#a8cfa8] px-6 py-3 font-semibold text-[#234225] hover:bg-[#96c396]"
            >
              Explore Problems
            </Link>

            <Link
              to="/history"
              className="rounded-lg border border-[#cddfcd] bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-[#f0f6f0]"
            >
              View History
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 md:grid-cols-3">
        {[
          ["01", "Choose a problem", "Start with a realistic LLD problem and clear requirements."],
          ["02", "Design your solution", "Explain classes, responsibilities, relationships and trade-offs."],
          ["03", "Get useful feedback", "Review structured feedback and try the problem again."]
        ].map(([number, title, text]) => (
          <div
            key={number}
            className="rounded-2xl border border-[#dce8dc] bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-bold text-[#6f9f71]">{number}</p>
            <h2 className="mt-3 text-xl font-bold">{title}</h2>
            <p className="mt-2 leading-7 text-gray-600">{text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;
