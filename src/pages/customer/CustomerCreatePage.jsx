import { useState } from "react";
import CustomerForm from "../../components/customer-component/CustomerForm";
import { createCustomer } from "../../services/customerApi";

function CustomerCreatePage() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage(null);

      await createCustomer(data);

      setMessage({
        type: "success",
        text: "Customer created successfully."
      });

    } catch (err) {

      if (err.message.toLowerCase().includes("email")) {
        setMessage({
          type: "error",
          text: "Email already exists."
        });
      } else {
        setMessage({
          type: "error",
          text: "Creation failed."
        });
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">

      <h1 className="text-3xl font-semibold text-premium-textPrimary mb-8">
        Create Customer
      </h1>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-md text-sm ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <CustomerForm
        onSubmit={handleSubmit}
        selectedCustomer={null}
        clearSelection={() => {}}
        loading={loading}
      />

    </div>
  );
}

export default CustomerCreatePage;