import { useEffect, useMemo, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import StatCard from "../components/jobs/StatCard";
import JobCard from "../components/jobs/JobCard";
import StatusFilter from "../components/jobs/StatusFilter";
import AddJobForm from "../components/jobs/AddJobForm";
import dashboardStats from "../data/dashboardStats";
import initialJobs from "../data/jobs";

function DashboardPage() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filterOptions = ["All", "Applied", "Interview", "Offer", "Rejected"];

  const [jobList, setJobList] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");

    if (savedJobs) {
      return JSON.parse(savedJobs);
    }

    return initialJobs;
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobList));
  }, [jobList]);

  function handleAddJob(newJob) {
    setJobList((prev) => [newJob, ...prev]);
  }

  function handleDeleteJob(jobId) {
    setJobList((prev) => prev.filter((job) => job.id !== jobId));
  }

  const filteredJobs = useMemo(() => {
    return jobList.filter((job) => {
      const matchesStatus =
        selectedStatus === "All" || job.status === selectedStatus;

      const normalizedSearchTerm = searchTerm.toLowerCase().trim();

      const matchesSearch =
        job.company.toLowerCase().includes(normalizedSearchTerm) ||
        job.position.toLowerCase().includes(normalizedSearchTerm);

      return matchesStatus && matchesSearch;
    });
  }, [jobList, selectedStatus, searchTerm]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <section>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Job Dashboard</h1>
              <p className="text-sm text-gray-600">
                Track your applications and job search progress.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsFormOpen((prev) => !prev)}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              {isFormOpen ? "Close Form" : "Add New Job"}
            </button>
          </div>
        </section>

        {isFormOpen && (
          <AddJobForm
            onAddJob={handleAddJob}
            onClose={() => setIsFormOpen(false)}
          />
        )}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              description={stat.description}
            />
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-semibold">Recent Applications</h2>

              <StatusFilter
                options={filterOptions}
                selectedStatus={selectedStatus}
                onSelect={setSelectedStatus}
              />
            </div>

            <input
              type="text"
              placeholder="Search by company or position"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400"
            />
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  company={job.company}
                  position={job.position}
                  status={job.status}
                  location={job.location}
                  onDelete={handleDeleteJob}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border bg-white p-6 text-sm text-gray-500 shadow-sm">
              No applications match your current filters.
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
