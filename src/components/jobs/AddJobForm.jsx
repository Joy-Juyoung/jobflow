import { useEffect, useState } from "react";

function AddJobForm({ onAddJob, onUpdateJob, onClose, editingJob }) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    location: "",
  });

  useEffect(() => {
    if (editingJob) {
      setFormData({
        company: editingJob.company,
        position: editingJob.position,
        status: editingJob.status,
        location: editingJob.location,
      });
      return;
    }

    setFormData({
      company: "",
      position: "",
      status: "Applied",
      location: "",
    });
  }, [editingJob]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedCompany = formData.company.trim();
    const trimmedPosition = formData.position.trim();
    const trimmedLocation = formData.location.trim();

    if (!trimmedCompany || !trimmedPosition || !trimmedLocation) {
      return;
    }

    if (editingJob) {
      const updatedJob = {
        ...editingJob,
        company: trimmedCompany,
        position: trimmedPosition,
        status: formData.status,
        location: trimmedLocation,
      };

      onUpdateJob(updatedJob);
      onClose();
      return;
    }

    const newJob = {
      id: Date.now(),
      company: trimmedCompany,
      position: trimmedPosition,
      status: formData.status,
      location: trimmedLocation,
    };

    onAddJob(newJob);

    setFormData({
      company: "",
      position: "",
      status: "Applied",
      location: "",
    });

    onClose();
  }

  const isEditing = Boolean(editingJob);

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
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
          className="rounded-lg px-3 py-2 text-sm text-gray-500 transition hover:bg-gray-100"
        >
          Close
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="company"
            className="mb-1.5 block text-sm font-medium text-gray-700"
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
            className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="position"
            className="mb-1.5 block text-sm font-medium text-gray-700"
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
            className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="location"
            className="mb-1.5 block text-sm font-medium text-gray-700"
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
            className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400"
          />
        </div>

        <div className="flex justify-end gap-3 md:col-span-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
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
