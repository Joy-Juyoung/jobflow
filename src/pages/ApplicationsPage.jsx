import { useMemo, useState } from "react";
import AddJobForm from "../components/jobs/AddJobForm";
import JobCard from "../components/jobs/JobCard";
import ApplicationsControls from "../components/jobs/ApplicationsControls";

function ApplicationsPage({ jobList, onAddJob, onUpdateJob, onDeleteJob }) {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const filterOptions = ["All", "Applied", "Interview", "Offer", "Rejected"];

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

  function handleSubmitNewJob(newJob) {
    onAddJob(newJob);
  }

  function handleSubmitUpdatedJob(updatedJob) {
    onUpdateJob(updatedJob);
    setEditingJob(null);
  }

  function handleDelete(jobId) {
    onDeleteJob(jobId);

    if (editingJob && editingJob.id === jobId) {
      setEditingJob(null);
      setIsFormOpen(false);
    }
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

  const totalVisibleJobs = filteredJobs.length;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Application Management
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Applications
            </h1>
            <p className="mt-3 text-sm text-gray-600">
              Manage your full job application list with filters, search, edit,
              and delete actions.
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
          onAddJob={handleSubmitNewJob}
          onUpdateJob={handleSubmitUpdatedJob}
          onClose={handleCloseForm}
          editingJob={editingJob}
        />
      )}

      <section className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
        <ApplicationsControls
          totalVisibleJobs={totalVisibleJobs}
          filterOptions={filterOptions}
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={() => setSearchTerm("")}
          onResetFilters={handleResetFilters}
        />

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
                onDelete={handleDelete}
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
  );
}

export default ApplicationsPage;
