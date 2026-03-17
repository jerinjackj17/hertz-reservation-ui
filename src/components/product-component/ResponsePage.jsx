import { useLocation, useNavigate } from "react-router-dom";
import ProductsTable from "./ProductsTable";

function ResponsePage() {

  const location = useLocation();
  const navigate = useNavigate();

  // Get products passed from RequestPage
  const products = location.state?.products || [];

  return (
    <div className="min-h-screen bg-premium-page py-20 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-10">

          <h1 className="text-3xl font-semibold text-premium-textPrimary">
            Eligible Vehicles
          </h1>

          <button
            onClick={() => navigate("/eligible")}
            className="px-5 py-2 border border-premium-border rounded-md text-premium-textSecondary hover:text-premium-textPrimary hover:border-premium-accent transition"
          >
            ← Back
          </button>

        </div>

        {/* Products Table */}
        <ProductsTable products={products} />

      </div>

    </div>
  );
}

export default ResponsePage;