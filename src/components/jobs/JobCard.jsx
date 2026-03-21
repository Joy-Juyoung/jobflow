import StatusBadge from "./StatusBadge";

function JobCard({ company, position, status, location }) {
  return (
    <article className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{position}</h3>
          <p className="mt-2 text-sm text-gray-600">{company}</p>
          <p className="mt-1 text-sm text-gray-500">{location}</p>
        </div>

        <StatusBadge status={status} />
      </div>
    </article>
  );
}

export default JobCard;
