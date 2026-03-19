import { useState } from "react";
import { reserveProduct } from "../../services/productApi";

function ProductsTable({ products, customerName, customerEmail }) {

  // track which product is currently being reserved
  const [reservingId, setReservingId] = useState(null);

  // track success/error message after reservation attempt
  const [message, setMessage] = useState(null);

  // holds the product selected for confirmation modal
  const [confirmProduct, setConfirmProduct] = useState(null);

  // do not render if products is null
  if (!products) return null;

  // empty state
  if (products.length === 0) {
    return (
      <div className="bg-premium-card border border-premium-border rounded-xl p-6 text-premium-textSecondary">
        No eligible vehicles found.
      </div>
    );
  }

  // called when user clicks Reserve — opens confirmation modal
  const handleReserveClick = (product) => {
    setConfirmProduct(product);
    setMessage(null);
  };

  // called when user confirms in the modal — fires the kafka event
  const handleConfirm = async () => {
    const product = confirmProduct;

    // close modal first
    setConfirmProduct(null);
    setReservingId(product.productId);

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

      setMessage({ type: "success", text: "Reservation confirmed! Check your email." });

    } catch {
      setMessage({ type: "error", text: "Reservation failed. Please try again." });
    } finally {
      setReservingId(null);
    }
  };

  return (
    <div className="bg-premium-card border border-premium-border rounded-xl shadow-sm overflow-x-auto">

      {/* success or error message after reservation */}
      {message && (
        <div className={`mx-6 mt-6 px-4 py-3 rounded-md text-sm ${
          message.type === "success"
            ? "bg-green-900/30 border border-green-600 text-green-400"
            : "bg-red-900/30 border border-red-600 text-red-400"
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
              "Action"
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

              {/* Reserve button — opens confirmation modal */}
              <td className="px-6 py-4">
                <button
                  onClick={() => handleReserveClick(product)}
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

      {/* confirmation modal — shows when customer clicks Reserve */}
      {confirmProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-premium-card border border-premium-border rounded-xl p-8 w-full max-w-md shadow-xl">

            {/* modal title */}
            <h3 className="text-lg font-semibold text-premium-textPrimary mb-1">
              Confirm Reservation
            </h3>
            <p className="text-xs text-premium-textSecondary mb-6">
              Please review the vehicle details before confirming
            </p>

            {/* vehicle details inside modal */}
            <div className="space-y-2 mb-6">

              {/* each row shows field + value */}
              {[
                ["Category", confirmProduct.category],
                ["Size", confirmProduct.size],
                ["Type", confirmProduct.type],
                ["Drive Type", confirmProduct.driveType],
                ["Duration", confirmProduct.duration],
                ["Price", `$${confirmProduct.price}`],
                ["Valid From", confirmProduct.validFrom],
                ["Valid To", confirmProduct.validTo],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm border-b border-premium-border pb-2">
                  <span className="text-premium-textSecondary">{label}</span>
                  <span className="text-premium-textPrimary font-medium">{value}</span>
                </div>
              ))}

            </div>

            {/* reserving for customer */}
            <p className="text-xs text-premium-textSecondary mb-6">
              Reserving for <span className="text-premium-textPrimary">{customerName}</span> — confirmation will be sent to <span className="text-premium-textPrimary">{customerEmail}</span>
            </p>

            {/* action buttons */}
            <div className="flex gap-3">

              {/* cancel closes modal without doing anything */}
              <button
                onClick={() => setConfirmProduct(null)}
                className="flex-1 px-4 py-2 border border-premium-border rounded-md text-sm text-premium-textSecondary hover:text-premium-textPrimary transition"
              >
                Cancel
              </button>

              {/* confirm fires the kafka event */}
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-premium-accent hover:bg-premium-accentHover text-white text-sm rounded-md transition"
              >
                Confirm Reservation
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ProductsTable;