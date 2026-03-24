import { formatDate } from "../../utils/formatDate";

function JobSummary({
  company,
  position,
  location,
  appliedDate,
  secondaryLabel,
  compact = false,
}) {
  return (
    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-gray-500">{company}</p>

      <h3
        className={`truncate font-semibold text-gray-900 ${
          compact ? "mt-1 text-lg" : "mt-1 text-lg"
        }`}
      >
        {position}
      </h3>

      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
        <span>{location}</span>

        {appliedDate && <span>Applied: {formatDate(appliedDate)}</span>}

        {secondaryLabel && <span>{secondaryLabel}</span>}
      </div>
    </div>
  );
}

export default JobSummary;
