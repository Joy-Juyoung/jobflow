function StatusBadge({ status }) {
  const baseClasses = "inline-flex rounded-full px-3 py-1 text-xs font-medium";

  const statusClasses = {
    Applied: "bg-blue-100 text-blue-700",
    Interview: "bg-yellow-100 text-yellow-700",
    Offer: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`${baseClasses} ${statusClasses[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
