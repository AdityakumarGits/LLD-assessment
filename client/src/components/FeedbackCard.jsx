function FeedbackCard({ criterion }) {
  return (
    <div className="rounded-xl border border-[#dce8dc] bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-gray-800">{criterion.name}</h3>
        <span className="rounded-full bg-[#edf6ed] px-3 py-1 text-sm font-bold text-[#5f8f61]">
          {criterion.score}/{criterion.maxScore}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-700">
        <strong>Evidence:</strong> {criterion.evidence}
      </p>

      <p className="mt-3 text-sm text-gray-700">
        <strong>Concern:</strong> {criterion.concern}
      </p>

      <p className="mt-3 text-sm text-gray-700">
        <strong>Suggestion:</strong> {criterion.suggestion}
      </p>
    </div>
  );
}

export default FeedbackCard;
