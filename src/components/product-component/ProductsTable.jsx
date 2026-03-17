function ProductsTable({ products }) {

  // Do not render if no response yet
  if (!products) return null;

  // Empty state
  if (products.length === 0) {
    return (
      <div className="bg-premium-card border border-premium-border rounded-xl p-6 text-premium-textSecondary">
        No eligible vehicles found.
      </div>
    );
  }

  return (
    <div className="bg-premium-card border border-premium-border rounded-xl shadow-sm overflow-x-auto">

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
              "Valid To"
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

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default ProductsTable;