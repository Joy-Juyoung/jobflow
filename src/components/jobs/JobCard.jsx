import StatusBadge from "./StatusBadge";
import JobSummary from "./JobSummary";

function JobCard({
  id,
  company,
  position,
  status,
  location,
  appliedDate,
  onDelete,
  onEdit,
  showActions = true,
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <JobSummary
          company={company}
          position={position}
          location={location}
          appliedDate={appliedDate}
        />

        <div className="flex shrink-0 flex-col items-end gap-3">
          <StatusBadge status={status} />

          {showActions && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  onEdit({
                    id,
                    company,
                    position,
                    status,
                    location,
                    appliedDate,
                  })
                }
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(id)}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default JobCard;
