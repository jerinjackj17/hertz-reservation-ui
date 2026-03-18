import { useState } from "react";
import { reserveProduct } from "../../services/productApi";

function ProductsTable({ products, customerName, customerEmail }) {

  // track which product is currently being reserved
  const [reservingId, setReservingId] = useState(null);

  // track success/error message after reservation attempt
  const [message, setMessage] = useState(null);

  // do not render if products is null
  if (!products) return null;

  // empty state — this is also where VEHICLE_NOT_AVAILABLE event fires from backend
  if (products.length === 0) {
    return (
      <div className="bg-premium-card border border-premium-border rounded-xl p-6 text-premium-textSecondary">
        No eligible vehicles found.
      </div>
    );
  }

  const handleReserve = async (product) => {
    setReservingId(product.productId);
    setMessage(null);

    try {
      // send product details + customer info to kafka event service
      await reserveProduct({
        customerName,
        customerEmail,
        productId: String(product.productId),
        category: product.category,
        size: product.size,
        type: product.type,
        driveType: product.driveType,
        duration: product.duration,
        price: String(product.price),
        validFrom: product.validFrom,
        validTo: product.validTo
      });

      setMessage({ type: "success", text: "Reservation request sent! Check your email." });

    } catch {
      setMessage({ type: "error", text: "Reservation failed. Please try again." });
    } finally {
      // clear loading state for this row
      setReservingId(null);
    }
  };

  return (
    <div className="bg-premium-card border border-premium-border rounded-xl shadow-sm overflow-x-auto">

      {/* show success or error after reserve click */}
      {message && (
        <div className={`mx-6 mt-6 px-4 py-3 rounded-md text-sm ${
          message.type === "success"
            ? "bg-green-50 border border-green-200 text-green-700"
            : "bg-red-50 border border-red-200 text-red-700"
        }`}>
          {message.text}
        </div>
      )}

      <table className="min-w-full text-sm">

        <thead>
          <tr className="border-b border-premium-border text-xs uppercase tracking-wide text-premium-textSecondary">
            {[
              "ID",
              "Category",
              "Size",
              "Type",
              "Drive",
              "Duration",
              "Price",
              "Valid From",
              "Valid To",
              "Action"  // new column for reserve button
            ].map((header) => (
              <th key={header} className="px-6 py-4 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.productId}
              className="border-b border-premium-border hover:bg-premium-border/40 transition"
            >
              <td className="px-6 py-4 text-premium-textPrimary">
                {product.productId}
              </td>

              <td className="px-6 py-4 text-premium-textPrimary">
                {product.category}
              </td>

              <td className="px-6 py-4 text-premium-textPrimary">
                {product.size}
              </td>

              <td className="px-6 py-4 text-premium-textPrimary">
                {product.type}
              </td>

              <td className="px-6 py-4 text-premium-textPrimary">
                {product.driveType}
              </td>

              <td className="px-6 py-4 text-premium-textPrimary">
                {product.duration}
              </td>

              <td className="px-6 py-4 text-premium-accent font-medium">
                ${product.price}
              </td>

              <td className="px-6 py-4 text-premium-textPrimary">
                {product.validFrom}
              </td>

              <td className="px-6 py-4 text-premium-textPrimary">
                {product.validTo}
              </td>

              {/* Reserve button — triggers VEHICLE_RESERVATION_EVENT via kafka */}
              <td className="px-6 py-4">
                <button
                  onClick={() => handleReserve(product)}
                  disabled={reservingId === product.productId}
                  className="px-4 py-2 bg-premium-accent hover:bg-premium-accentHover disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs rounded-md transition"
                >
                  {reservingId === product.productId ? "Reserving..." : "Reserve"}
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default ProductsTable;