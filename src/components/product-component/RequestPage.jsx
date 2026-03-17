import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EligibleForm from "./EligibleForm";
import Spinner from "../common/Spinner";
import { fetchEligibleProducts } from "../../services/productApi";

function RequestPage() {

  const navigate = useNavigate();

  // Loading + error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Submit eligibility form
  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      const result = await fetchEligibleProducts(data);

      // Navigate to response page with products
      navigate("/response", { state: { products: result } });

    } catch {
      setError("Failed to fetch eligible vehicles.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-premium-page py-20 px-6">

      <div className="max-w-5xl mx-auto">

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl text-center font-light mb-12 text-premium-textPrimary">
          Hertz Reservation — Vehicle Eligibility
        </h1>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-900/30 border border-red-600 text-red-400 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Spinner */}
        {loading && <Spinner />}

        {/* Eligibility Form */}
        <EligibleForm onSubmit={handleSubmit} loading={loading} />

      </div>

    </div>
  );
}

export default RequestPage;