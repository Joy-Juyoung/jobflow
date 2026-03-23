import StatusBadge from "./StatusBadge";

function JobCard({ id, company, position, status, location, onDelete }) {
  return (
    <article className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{position}</h3>
          <p className="mt-2 text-sm text-gray-600">{company}</p>
          <p className="mt-1 text-sm text-gray-500">{location}</p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <StatusBadge status={status} />

          <button
            type="button"
            onClick={() => onDelete(id)}
            className="rounded-lg border px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default JobCard;
