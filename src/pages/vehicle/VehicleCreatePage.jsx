import { useState, useRef } from "react";
import VehicleForm from "../../components/vehicle-component/VehicleForm";
import Toast from "../../components/common/Toast";
import { createVehicle } from "../../services/vehicleApi";

function VehicleCreatePage() {

  const [loading, setLoading] = useState(false);

  // toast state
  const [toast, setToast] = useState(null);

  // form reset trigger
  const [resetKey, setResetKey] = useState(0);

  // create vehicle handler
  async function handleCreate(vehicleData) {
    setLoading(true);

    try {
      await createVehicle(vehicleData);

      // show success toast
      setToast({ type: "success", message: "Vehicle created successfully" });

      // force form reset by changing key
      setResetKey(prev => prev + 1);

    } catch (err) {
      setToast({ type: "error", message: err.message || "Create failed" });
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="max-w-3xl mx-auto mt-12">

    {toast && (
      <Toast
        type={toast.type}
        message={toast.message}
        onClose={() => setToast(null)}
      />
    )}

    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-white">
        Create Vehicle
      </h2>
      <p className="text-sm text-gray-400 mt-1">
        Add a new vehicle to the system
      </p>
    </div>

    {/* No extra white wrapper */}
    <VehicleForm
      onSubmit={handleCreate}
      loading={loading}
    />

  </div>
);
}

export default VehicleCreatePage;