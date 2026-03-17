import { useEffect, useState } from "react";
import VehicleForm from "../../components/vehicle-component/VehicleForm";
import Toast from "../../components/common/Toast";
import Spinner from "../../components/common/Spinner";
import {
  getAllVehicles,
  deleteVehicle,
  updateVehicle
} from "../../services/vehicleApi";

function VehicleListPage() {

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 5;

  const [categoryFilter, setCategoryFilter] = useState("");
  const [driveFilter, setDriveFilter] = useState("");

  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  const filterStyle =
    "h-10 px-4 rounded-md border border-premium-border bg-premium-card text-premium-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-premium-accent transition";

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    setLoading(true);
    try {
      const data = await getAllVehicles();
      setVehicles(data);
    } catch (err) {
      setToast({
        type: "error",
        message: err.message || "Failed to load vehicles"
      });
    } finally {
      setLoading(false);
    }
  }

  async function confirmDelete() {

    if (!vehicleToDelete) return;

    try {

      await deleteVehicle(vehicleToDelete.id);

      const updated = vehicles.filter(v => v.id !== vehicleToDelete.id);
      setVehicles(updated);

      const newTotalPages = Math.ceil(updated.length / vehiclesPerPage);

      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }

      setToast({
        type: "success",
        message: "Vehicle deleted successfully"
      });

    } catch (err) {

      setToast({
        type: "error",
        message: err.message || "Delete failed"
      });

    } finally {

      setVehicleToDelete(null);

    }
  }

  async function handleUpdate(vehicleData) {

    setSaving(true);

    try {

      await updateVehicle(editingVehicle.id, vehicleData);

      setEditingVehicle(null);

      fetchVehicles();

      setToast({
        type: "success",
        message: "Vehicle updated successfully"
      });

    } catch (err) {

      setToast({
        type: "error",
        message: err.message || "Update failed"
      });

    } finally {

      setSaving(false);

    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleString();
  }

  const filteredVehicles = vehicles.filter(vehicle => {

    if (categoryFilter && vehicle.category !== categoryFilter) return false;
    if (driveFilter && vehicle.driveType !== driveFilter) return false;

    return true;
  });

  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);

  const indexOfLast = currentPage * vehiclesPerPage;
  const indexOfFirst = indexOfLast - vehiclesPerPage;

  const currentVehicles = filteredVehicles.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-6">

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <h2 className="text-2xl font-semibold text-premium-textPrimary mb-8">
        Vehicle Management
      </h2>

      <div className="flex gap-4 mb-8">

        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className={filterStyle}
        >
          <option value="">All Categories</option>
          <option value="CAR">CAR</option>
          <option value="SUV">SUV</option>
          <option value="TRUCK">TRUCK</option>
          <option value="VAN">VAN</option>
        </select>

        <select
          value={driveFilter}
          onChange={(e) => {
            setDriveFilter(e.target.value);
            setCurrentPage(1);
          }}
          className={filterStyle}
        >
          <option value="">All Drive Types</option>
          <option value="TWO_WHEEL">TWO_WHEEL</option>
          <option value="ALL_WHEEL">ALL_WHEEL</option>
        </select>

      </div>

      {loading ? (

        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>

      ) : (

        <>
          <div className="bg-premium-card border border-premium-border rounded-xl shadow-sm">

            <div className="overflow-x-auto">

              <table className="min-w-full text-sm whitespace-nowrap">

                <thead>
                  <tr className="border-b border-premium-border text-premium-textSecondary uppercase tracking-wide text-xs">
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Size</th>
                    <th className="px-6 py-4 text-left">Rental</th>
                    <th className="px-6 py-4 text-left">Drive</th>
                    <th className="px-6 py-4 text-left">Duration</th>
                    <th className="px-6 py-4 text-left">Price</th>
                    <th className="px-6 py-4 text-left">From</th>
                    <th className="px-6 py-4 text-left">To</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {currentVehicles.length === 0 ? (

                    <tr>
                      <td colSpan="9" className="text-center py-8 text-premium-textSecondary">
                        No vehicles found
                      </td>
                    </tr>

                  ) : (

                    currentVehicles.map(vehicle => (

                      <tr
                        key={vehicle.id}
                        className="border-b border-premium-border hover:bg-premium-border/40 transition"
                      >

                        <td className="px-6 py-4 text-premium-textPrimary">{vehicle.category}</td>
                        <td className="px-6 py-4 text-premium-textPrimary">{vehicle.size}</td>
                        <td className="px-6 py-4 text-premium-textPrimary">{vehicle.rentalType}</td>
                        <td className="px-6 py-4 text-premium-textPrimary">{vehicle.driveType}</td>
                        <td className="px-6 py-4 text-premium-textPrimary">{vehicle.durationType}</td>
                        <td className="px-6 py-4 text-premium-textPrimary font-semibold">${vehicle.price}</td>
                        <td className="px-6 py-4 text-premium-textPrimary">{formatDate(vehicle.availableFrom)}</td>
                        <td className="px-6 py-4 text-premium-textPrimary">{formatDate(vehicle.availableTo)}</td>

                        <td className="px-6 py-4 flex gap-3">

                          <button
                            onClick={() => setEditingVehicle(vehicle)}
                            className="bg-premium-accent hover:bg-premium-accentHover text-white px-4 py-2 rounded-md text-xs transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => setVehicleToDelete(vehicle)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-xs transition"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

          <div className="flex justify-between items-center mt-8">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className={`px-5 py-2 border rounded-md text-sm transition ${
                currentPage === 1
                  ? "border-premium-border text-premium-textSecondary opacity-40 cursor-not-allowed"
                  : "border-premium-border text-premium-textPrimary hover:bg-premium-border/40"
              }`}
            >
              Previous
            </button>

            <span className="text-sm text-premium-textSecondary">
              Page {currentPage} of {totalPages || 1}
            </span>

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className={`px-5 py-2 border rounded-md text-sm transition ${
                currentPage === totalPages || totalPages === 0
                  ? "border-premium-border text-premium-textSecondary opacity-40 cursor-not-allowed"
                  : "border-premium-border text-premium-textPrimary hover:bg-premium-border/40"
              }`}
            >
              Next
            </button>

          </div>

          {editingVehicle && (
            <div className="mt-12">
              <VehicleForm
                initialData={editingVehicle}
                onSubmit={handleUpdate}
                loading={saving}
              />
              <button
                onClick={() => setEditingVehicle(null)}
                className="mt-4 text-sm text-premium-textSecondary hover:text-premium-textPrimary transition"
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}

      {vehicleToDelete && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-premium-card border border-premium-border rounded-xl p-8 w-96">

            <h3 className="text-lg font-semibold text-premium-textPrimary mb-4">
              Confirm Delete
            </h3>

            <p className="text-sm text-premium-textSecondary mb-6">
              Are you sure you want to delete this vehicle?
            </p>

            <div className="flex justify-end gap-4">

              <button
                onClick={() => setVehicleToDelete(null)}
                className="px-4 py-2 border border-premium-border rounded-md text-premium-textSecondary hover:text-premium-textPrimary transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
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

export default VehicleListPage;