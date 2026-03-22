import jobs from "../data/jobs";
import JobCard from "../components/jobs/JobCard";
import StatCard from "../components/jobs/StatCard";
import MainLayout from "../components/layout/MainLayout";
import dashboardStats from "../data/dashboardStats";
import { useMemo, useState } from "react";
import StatusFilter from "../components/jobs/StatusFilter";

function DashboardPage() {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filterOptions = ["All", "Applied", "Interview", "Offer", "Rejected"];

  const filteredJobs = useMemo(() => {
    if (selectedStatus === "All") {
      return jobs;
    }

    return jobs.filter((job) => job.status === selectedStatus);
  }, [selectedStatus]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <section>
          <h1 className="text-2xl font-bold">Job Dashboard</h1>
          <p className="text-sm text-gray-600">
            Track your applications and job search progress.
          </p>
        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500 ">
            {dashboardStats.map((stat) => (
              <StatCard
                key={stat.id}
                label={stat.label}
                value={stat.value}
                description={stat.description}
              />
            ))}
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold">Recent Applications</h2>

            <StatusFilter
              options={filterOptions}
              selectedStatus={selectedStatus}
              onSelect={setSelectedStatus}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                company={job.company}
                position={job.position}
                status={job.status}
                location={job.location}
              />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
