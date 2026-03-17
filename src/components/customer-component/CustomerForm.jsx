import { useState, useEffect } from "react";

function CustomerForm({
  onSubmit,
  selectedCustomer,
  clearSelection,
  loading
}) {

  const initialState = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",   
    email: "",
    rentalsLastYear: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (selectedCustomer) {
      setFormData({
        ...selectedCustomer,
        dateOfBirth: selectedCustomer.dateOfBirth ?? "", 
        rentalsLastYear: selectedCustomer.rentalsLastYear ?? ""
      });
    } else {
      setFormData(initialState);
    }
  }, [selectedCustomer]);

  // Validate fields
  const validate = () => {
    const e = {};

    if (!formData.firstName.trim())
      e.firstName = "First name is required";

    if (!formData.lastName.trim())
      e.lastName = "Last name is required";

    // DOB validation
    if (!formData.dateOfBirth)
      e.dateOfBirth = "Date of birth is required";

    if (!formData.email)
      e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Invalid email format";

    if (formData.rentalsLastYear === "")
      e.rentalsLastYear = "Enter 0 if none";
    else if (Number(formData.rentalsLastYear) < 0)
      e.rentalsLastYear = "Cannot be negative";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      rentalsLastYear: Number(formData.rentalsLastYear)
    });
    if (!selectedCustomer) {
  setFormData(initialState);
  }
  };

  const inputClass = (field) =>
    `w-full bg-premium-page border rounded-md px-4 py-2 text-premium-textPrimary focus:outline-none focus:ring-2 focus:ring-premium-accent/40 transition ${
      errors[field] ? "border-red-500" : "border-premium-border"
    }`;

  return (
    <div className="bg-premium-card border border-premium-border rounded-xl p-8 shadow-sm">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-premium-textPrimary">
          {selectedCustomer ? "Edit Customer" : "Add Customer"}
        </h2>

        {selectedCustomer && (
          <button
            type="button"
            onClick={clearSelection}
            className="text-sm text-premium-textSecondary hover:text-premium-textPrimary transition"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* First Name */}
          <div>
            <label className="block text-sm text-premium-textSecondary mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={inputClass("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm text-premium-textSecondary mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={inputClass("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm text-premium-textSecondary mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={inputClass("dateOfBirth")}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Rentals */}
          <div>
            <label className="block text-sm text-premium-textSecondary mb-1">
              Rentals Last Year
            </label>
            <input
              type="number"
              name="rentalsLastYear"
              min="0"
              value={formData.rentalsLastYear}
              onChange={handleChange}
              className={inputClass("rentalsLastYear")}
            />
            {errors.rentalsLastYear && (
              <p className="text-red-500 text-xs mt-1">{errors.rentalsLastYear}</p>
            )}
          </div>

        </div>

                {/* Email */}
        <div>
          <label className="block text-sm text-premium-textSecondary mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={selectedCustomer}   // prevents editing during update
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-premium-accent hover:bg-premium-accentHover disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md transition"
        >
          {selectedCustomer ? "Update Customer" : "Create Customer"}
        </button>

      </form>
    </div>
  );
}

export default CustomerForm;