import StatusBadge from "./StatusBadge";

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

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
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">{company}</p>
          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            {position}
          </h3>
          <p className="mt-2 text-sm text-gray-500">{location}</p>

          {appliedDate && (
            <p className="mt-1 text-xs text-gray-500">
              Applied: {formatDate(appliedDate)}
            </p>
          )}
        </div>

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
