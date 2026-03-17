import { useState } from "react";

function CustomerTable({ customers, onEdit, onDelete, loading }) {

  // State to store the ID of the customer selected for deletion
  const [confirmId, setConfirmId] = useState(null);

  // Function triggered when user confirms deletion in the modal
  const handleConfirmDelete = async () => {
    if (!confirmId) return; // safety check
    await onDelete(confirmId); // call parent delete function with customer ID
    setConfirmId(null); // close modal after deletion
  };

  const formatDate = (date) => {
  if (!date) return "";

  const [year, month, day] = date.split("-");

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  return `${months[month - 1]} ${day}, ${year}`;
};

  // Show message if no customers are available and not currently loading
  if (!customers.length && !loading) {
    return (
      <div className="bg-premium-card border border-premium-border p-6 rounded-xl text-premium-textSecondary">
        No customers found.
      </div>
    );
  }

  return (
    <div className="bg-premium-card border border-premium-border rounded-xl shadow-sm">

      {/* Table header section */}
      <div className="px-8 py-6 border-b border-premium-border">
        <h2 className="text-xl font-semibold text-premium-textPrimary">
          Customer List
        </h2>
      </div>

      {/* Table wrapper to allow horizontal scroll on small screens */}
      <div className="overflow-x-auto">

        <table className="min-w-full text-sm">

          {/* Column headings */}
          <thead>
            <tr className="border-b border-premium-border text-premium-textSecondary uppercase tracking-wide text-xs">
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Date of Birth</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Rentals</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {/* Loop through customer list and render table rows */}
            {customers.map((c) => (
              <tr
                key={c.id} // unique key required for React rendering
                className="border-b border-premium-border hover:bg-premium-border/40 transition"
              >

                {/* Customer full name */}
                <td className="px-6 py-4 text-premium-textPrimary">
                  {c.firstName} {c.lastName}
                </td>

                {/* Customer dob */}
                <td className="px-6 py-4 text-premium-textPrimary">
                  {formatDate(c.dateOfBirth)}
                </td>

                {/* Customer email */}
                <td className="px-6 py-4 text-premium-textPrimary">
                  {c.email}
                </td>

                {/* Rentals completed in last year */}
                <td className="px-6 py-4 text-premium-textPrimary">
                  {c.rentalsLastYear}
                </td>

                {/* Action buttons */}
                <td className="px-6 py-4 flex gap-3">

                  {/* Edit button sends the entire customer object to parent */}
                  <button
                    onClick={() => onEdit(c)}
                    className="bg-premium-accent hover:bg-premium-accentHover text-white px-4 py-2 rounded-md text-xs transition"
                  >
                    Edit
                  </button>

                  {/* Delete button stores the selected customer's ID */}
                  <button
                    onClick={() => setConfirmId(c.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-xs transition"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Loading indicator while API request is running */}
      {loading && (
        <div className="px-8 py-4 text-sm text-premium-textSecondary">
          Loading...
        </div>
      )}

      {/* Delete confirmation modal */}
      {confirmId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-premium-card border border-premium-border rounded-xl p-8 w-96">

            {/* Modal title */}
            <h3 className="text-lg font-semibold text-premium-textPrimary mb-4">
              Confirm Delete
            </h3>

            {/* Modal message */}
            <p className="text-sm text-premium-textSecondary mb-6">
              Are you sure you want to delete this customer?
            </p>

            {/* Modal action buttons */}
            <div className="flex justify-end gap-4">

              {/* Cancel button closes modal */}
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 border border-premium-border rounded-md text-premium-textSecondary hover:text-premium-textPrimary transition"
              >
                Cancel
              </button>

              {/* Delete button triggers backend delete */}
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default CustomerTable;