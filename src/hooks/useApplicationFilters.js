import { useMemo, useState } from "react";

function useApplicationFilters(jobList) {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filterOptions = ["All", "Applied", "Interview", "Offer", "Rejected"];

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
  }, [jobList, searchTerm, selectedStatus]);

  function resetFilters() {
    setSelectedStatus("All");
    setSearchTerm("");
  }

  return {
    selectedStatus,
    setSelectedStatus,
    searchTerm,
    setSearchTerm,
    filterOptions,
    filteredJobs,
    totalVisibleJobs: filteredJobs.length,
    resetFilters,
  };
}

export default useApplicationFilters;
