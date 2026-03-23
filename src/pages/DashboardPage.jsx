import { useEffect, useMemo, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import StatCard from "../components/jobs/StatCard";
import JobCard from "../components/jobs/JobCard";
import StatusFilter from "../components/jobs/StatusFilter";
import AddJobForm from "../components/jobs/AddJobForm";
import initialJobs from "../data/jobs";

function DashboardPage() {
  const [jobList, setJobList] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");

    if (savedJobs) {
      return JSON.parse(savedJobs);
    }

    return initialJobs;
  });

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const filterOptions = ["All", "Applied", "Interview", "Offer", "Rejected"];

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobList));
  }, [jobList]);

  function handleAddJob(newJob) {
    setJobList((prev) => [newJob, ...prev]);
  }

  function handleUpdateJob(updatedJob) {
    setJobList((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job)),
    );
    setEditingJob(null);
  }

  function handleDeleteJob(jobId) {
    setJobList((prev) => prev.filter((job) => job.id !== jobId));

    if (editingJob && editingJob.id === jobId) {
      setEditingJob(null);
      setIsFormOpen(false);
    }
  }

  function handleResetFilters() {
    setSelectedStatus("All");
    setSearchTerm("");
  }

  function handleStartEdit(job) {
    setEditingJob(job);
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingJob(null);
  }

  const dashboardStats = useMemo(() => {
    const totalApplications = jobList.length;
    const interviews = jobList.filter(
      (job) => job.status === "Interview",
    ).length;
    const offers = jobList.filter((job) => job.status === "Offer").length;

    const responseStatuses = ["Interview", "Offer", "Rejected"];
    const responses = jobList.filter((job) =>
      responseStatuses.includes(job.status),
    ).length;

    const responseRate =
      totalApplications === 0
        ? "0%"
        : `${Math.round((responses / totalApplications) * 100)}%`;

    return [
      {
        id: 1,
        label: "Applications Sent",
        value: totalApplications,
        description: "Total applications submitted",
      },
      {
        id: 2,
        label: "Interviews",
        value: interviews,
        description: "Interview stages in progress",
      },
      {
        id: 3,
        label: "Offers",
        value: offers,
        description: "Current offers received",
      },
      {
        id: 4,
        label: "Response Rate",
        value: responseRate,
        description: "Replies from submitted applications",
      },
    ];
  }, [jobList]);

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

  const totalVisibleJobs = filteredJobs.length;

  return (
    <MainLayout>
      <div className="space-y-8">
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-gray-500">
                Frontend Job Search Tracker
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                Job Dashboard
              </h1>
              <p className="mt-3 text-sm text-gray-600">
                Track your applications, monitor progress, and stay organized
                during your job search.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (isFormOpen && !editingJob) {
                  handleCloseForm();
                  return;
                }

                setEditingJob(null);
                setIsFormOpen((prev) => !prev);
              }}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              {isFormOpen && !editingJob ? "Close Form" : "Add New Job"}
            </button>
          </div>
        </section>

        {isFormOpen && (
          <AddJobForm
            onAddJob={handleAddJob}
            onUpdateJob={handleUpdateJob}
            onClose={handleCloseForm}
            editingJob={editingJob}
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

        <section className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Applications
                </h2>
                <p className="text-sm text-gray-500">
                  Showing {totalVisibleJobs} application
                  {totalVisibleJobs === 1 ? "" : "s"}
                </p>
              </div>

              <StatusFilter
                options={filterOptions}
                selectedStatus={selectedStatus}
                onSelect={setSelectedStatus}
              />
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                placeholder="Search by company or position"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400"
              />

              <div className="flex gap-2">
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="rounded-lg border bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    Clear Search
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="rounded-lg border bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Reset Filters
                </button>
              </div>
            </div>
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
                  onEdit={handleStartEdit}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed bg-gray-50 p-8 text-center text-sm text-gray-500">
              No applications match your current filters.
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
