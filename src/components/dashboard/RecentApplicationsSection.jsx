import { Link } from "react-router-dom";
import JobCard from "../jobs/JobCard";

function RecentApplicationsSection({ recentJobs }) {
  return (
    <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Applications
          </h2>
          <p className="text-sm text-gray-500">
            Showing the 5 most recent job applications
          </p>
        </div>

        <Link
          to="/applications"
          className="group inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          Go to Applications
        </Link>
      </div>

      {recentJobs.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {recentJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              company={job.company}
              position={job.position}
              status={job.status}
              location={job.location}
              appliedDate={job.appliedDate}
              showActions={false}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500">
          No recent applications yet.
        </div>
      )}
    </section>
  );
}

export default RecentApplicationsSection;
