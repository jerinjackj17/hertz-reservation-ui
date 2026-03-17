import { useEffect, useState } from "react";
import CustomerSearch from "../../components/customer-component/CustomerSearch";
import CustomerTable from "../../components/customer-component/CustomerTable";
import CustomerForm from "../../components/customer-component/CustomerForm";
import {
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerByEmail
} from "../../services/customerApi";

function CustomerListPage() {

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  const loadCustomers = async () => {
    const data = await getAllCustomers();
    setCustomers(data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSearch = async (email) => {

    if (!email) {
      loadCustomers();
      return;
    }

    try {

      setMessage(null);

      const result = await getCustomerByEmail(email);

      if (!result) {

        setCustomers([]);

        setMessage({
          type: "error",
          text: "No customer found with this email."
        });

        return;
      }

      setCustomers([result]);
      setCurrentPage(1);

    } catch {

      setCustomers([]);

      setMessage({
        type: "error",
        text: "No customer found with this email."
      });

    }
  };

  const handleUpdate = async (data) => {

    try {

      setLoading(true);
      setMessage(null);

      await updateCustomer(selectedCustomer.id, data);

      setSelectedCustomer(null);

      await loadCustomers();

      setMessage({
        type: "success",
        text: "Customer updated successfully."
      });

    } catch {

      setMessage({
        type: "error",
        text: "Update failed."
      });

    } finally {

      setLoading(false);

    }
  };

const handleDelete = async (id) => {

  try {

    await deleteCustomer(id);

    const updated = customers.filter(c => c.id !== id);

    setCustomers(updated);

    const newTotalPages = Math.ceil(updated.length / customersPerPage);

    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }

    setMessage({
      type: "success",
      text: "Customer deleted successfully."
    });

  } catch {

    setMessage({
      type: "error",
      text: "Delete failed."
    });

  }
};
  const totalPages = Math.ceil(customers.length / customersPerPage);

  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;

  const currentCustomers = customers.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-6xl mx-auto">

      <h1 className="text-3xl font-semibold text-premium-textPrimary mb-8">
        View Customers
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

      <div className="mb-8">
        <CustomerSearch onSearch={handleSearch} />
      </div>

      {selectedCustomer && (
        <div className="mb-10">
          <CustomerForm
            selectedCustomer={selectedCustomer}
            onSubmit={handleUpdate}
            clearSelection={() => setSelectedCustomer(null)}
            loading={loading}
          />
        </div>
      )}

      <CustomerTable
        customers={currentCustomers}
        onEdit={setSelectedCustomer}
        onDelete={handleDelete}
        loading={loading}
      />

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

    </div>
  );
}

export default CustomerListPage;