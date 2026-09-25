import { Link } from "react-router-dom";

function ProblemCard({ problem }) {
  return (
    <div className="rounded-2xl border border-[#dce8dc] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-[#edf6ed] px-3 py-1 text-xs font-semibold text-[#5f8f61]">
          {problem.difficulty}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-800">
        {problem.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
        {problem.description}
      </p>

      <Link
        to={`/problems/${problem._id}`}
        className="mt-5 inline-block rounded-lg bg-[#a8cfa8] px-5 py-2.5 font-semibold text-[#234225] hover:bg-[#96c396]"
      >
        View Problem
      </Link>
    </div>
  );
}

export default ProblemCard;
