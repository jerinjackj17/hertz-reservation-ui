import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EligibleForm from "./EligibleForm";
import Spinner from "../common/Spinner";
import { fetchEligibleProducts } from "../../services/productApi";

function RequestPage() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      const result = await fetchEligibleProducts(data);

      // pass products + customer name and email to response page
      navigate("/response", {
        state: {
          products: result,
          customerName: data.name,
          customerEmail: data.email
        }
      });

    } catch {
      setError("Failed to fetch eligible vehicles.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-premium-page py-14 px-6">

      <div className="max-w-3xl mx-auto">

        {/* page title — smaller and tighter */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-premium-textPrimary">
            Vehicle Eligibility Check
          </h1>
          <p className="text-sm text-premium-textSecondary mt-1">
            Hertz Reservation System
          </p>
        </div>

        {/* error banner */}
        {error && (
          <div className="bg-red-900/30 border border-red-600 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* spinner */}
        {loading && <Spinner />}

        {/* eligibility form */}
        <EligibleForm onSubmit={handleSubmit} loading={loading} />

      </div>

    </div>
  );
}

export default RequestPage;