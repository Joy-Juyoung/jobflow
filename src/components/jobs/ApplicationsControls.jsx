import StatusFilter from "./StatusFilter";

function ApplicationsControls({
  totalVisibleJobs,
  filterOptions,
  selectedStatus,
  onSelectStatus,
  searchTerm,
  onSearchChange,
  onClearSearch,
  onResetFilters,
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            All Applications
          </h2>
          <p className="text-sm text-gray-500">
            Showing {totalVisibleJobs} application
            {totalVisibleJobs === 1 ? "" : "s"}
          </p>
        </div>

        <StatusFilter
          options={filterOptions}
          selectedStatus={selectedStatus}
          onSelect={onSelectStatus}
        />
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search by company or position"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400"
        />

        <div className="flex gap-2">
          {searchTerm && (
            <button
              type="button"
              onClick={onClearSearch}
              className="rounded-lg border bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Clear Search
            </button>
          )}

          <button
            type="button"
            onClick={onResetFilters}
            className="rounded-lg border bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationsControls;
