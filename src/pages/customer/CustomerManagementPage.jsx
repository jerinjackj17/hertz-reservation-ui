// import { useEffect, useState, useCallback } from "react";
// import CustomerForm from "../components/CustomerForm";
// import CustomerSearch from "../components/CustomerSearch";
// import CustomerTable from "../components/CustomerTable";
// import {
//   getAllCustomers,
//   createCustomer,
//   updateCustomer,
//   deleteCustomer,
//   getCustomerByEmail
// } from "../services/customerApi";

// function CustomerManagementPage() {

//   // Main customer list state
//   const [customers, setCustomers] = useState([]);

//   // Holds customer being edited
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   // Basic UI state handling
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Load all customers from backend
//   const loadCustomers = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await getAllCustomers();
//       setCustomers(data);
//     } catch (err) {
//       setError("Failed to load customers");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Load once on mount
//   useEffect(() => {
//     loadCustomers();
//   }, [loadCustomers]);

//   // Handle create/update
//   const handleSubmit = async (data) => {
//     try {
//       setLoading(true);
//       setError(null);

//       if (selectedCustomer) {
//         await updateCustomer(selectedCustomer.id, data);
//       } else {
//         await createCustomer(data);
//       }

//       setSelectedCustomer(null);
//       await loadCustomers();
//     } catch (err) {
//       setError("Operation failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle search by email
//   const handleSearch = async (email) => {
//     if (!email) {
//       loadCustomers();
//       return;
//     } try {
//       setLoading(true);
//       setError(null);

//       const result = await getCustomerByEmail(email);
//       setCustomers(result ? [result] : []);
//     } catch {
//       setCustomers([]);
//       setError("Customer not found.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle delete (confirmation modal will wrap this later)
//   const handleDelete = async (email) => {
//     try {
//       setLoading(true);
//       setError(null);

//       await deleteCustomer(email);
//       await loadCustomers();
//     } catch {
//       setError("Delete failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-12">

//       {/* Page Container */}
//       <div className="max-w-6xl mx-auto">

//         {/* Page Title */}
//         <h1 className="text-3xl font-semibold text-gray-800 mb-8">
//           Customer Management
//         </h1>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 rounded-md bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
//             {error}
//           </div>
//         )}

//         {/* Search Section */}
//         <div className="mb-8">
//           <CustomerSearch onSearch={handleSearch} />
//         </div>

//         {/* Form Section */}
//         <div className="mb-10">
//           <CustomerForm
//             selectedCustomer={selectedCustomer}
//             onSubmit={handleSubmit}
//             clearSelection={() => setSelectedCustomer(null)}
//             loading={loading}
//           />
//         </div>

//         {/* Table Section */}
//         <CustomerTable
//           customers={customers}
//           onEdit={setSelectedCustomer}
//           onDelete={handleDelete}
//           loading={loading}
//         />

//       </div>
//     </div>
//   );
// }

// export default CustomerManagementPage;