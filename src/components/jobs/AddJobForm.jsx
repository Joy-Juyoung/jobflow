import { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

function getInitialFormData(editingJob) {
  if (editingJob) {
    return {
      company: editingJob.company || "",
      position: editingJob.position || "",
      status: editingJob.status || "Applied",
      location: editingJob.location || "",
      appliedDate: editingJob.appliedDate || "",
      interviewDate: editingJob.interviewDate || "",
      offerDate: editingJob.offerDate || "",
      rejectedDate: editingJob.rejectedDate || "",
    };
  }

  return {
    company: "",
    position: "",
    status: "Applied",
    location: "",
    appliedDate: "",
    interviewDate: "",
    offerDate: "",
    rejectedDate: "",
  };
}

function AddJobForm({ onAddJob, onUpdateJob, onClose, editingJob }) {
  const [formData, setFormData] = useState(() =>
    getInitialFormData(editingJob),
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };

      if (name === "status") {
        if (value !== "Interview") updatedForm.interviewDate = "";
        if (value !== "Offer") updatedForm.offerDate = "";
        if (value !== "Rejected") updatedForm.rejectedDate = "";
      }

      return updatedForm;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedCompany = formData.company.trim();
    const trimmedPosition = formData.position.trim();
    const trimmedLocation = formData.location.trim();

    if (
      !trimmedCompany ||
      !trimmedPosition ||
      !trimmedLocation ||
      !formData.appliedDate
    ) {
      return;
    }

    const normalizedJob = {
      company: trimmedCompany,
      position: trimmedPosition,
      status: formData.status,
      location: trimmedLocation,
      appliedDate: formData.appliedDate,
      interviewDate:
        formData.status === "Interview" ? formData.interviewDate : "",
      offerDate: formData.status === "Offer" ? formData.offerDate : "",
      rejectedDate: formData.status === "Rejected" ? formData.rejectedDate : "",
    };

    if (editingJob) {
      onUpdateJob({
        ...editingJob,
        ...normalizedJob,
      });
      onClose();
      return;
    }

    onAddJob({
      id: Date.now(),
      ...normalizedJob,
    });
    onClose();
  }

  const isEditing = Boolean(editingJob);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isEditing ? "Edit Application" : "Add New Application"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {isEditing
              ? "Update the details of your selected job application."
              : "Add a new job application to your dashboard."}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close form"
          title="Close"
        >
          <HiOutlineXMark className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="company"
              className="text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Shopify"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="position"
              className="text-sm font-medium text-gray-700"
            >
              Position
            </label>
            <input
              id="position"
              name="position"
              type="text"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="location"
              className="text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Remote or Calgary"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="appliedDate"
              className="text-sm font-medium text-gray-700"
            >
              Applied Date
            </label>
            <input
              id="appliedDate"
              name="appliedDate"
              type="date"
              value={formData.appliedDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {formData.status === "Interview" && (
            <div className="space-y-2">
              <label
                htmlFor="interviewDate"
                className="text-sm font-medium text-gray-700"
              >
                Interview Date
              </label>
              <input
                id="interviewDate"
                name="interviewDate"
                type="date"
                value={formData.interviewDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              />
            </div>
          )}

          {formData.status === "Offer" && (
            <div className="space-y-2">
              <label
                htmlFor="offerDate"
                className="text-sm font-medium text-gray-700"
              >
                Offer Date
              </label>
              <input
                id="offerDate"
                name="offerDate"
                type="date"
                value={formData.offerDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              />
            </div>
          )}

          {formData.status === "Rejected" && (
            <div className="space-y-2">
              <label
                htmlFor="rejectedDate"
                className="text-sm font-medium text-gray-700"
              >
                Rejected Date
              </label>
              <input
                id="rejectedDate"
                name="rejectedDate"
                type="date"
                value={formData.rejectedDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            {isEditing ? "Save Changes" : "Add Job"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddJobForm;
