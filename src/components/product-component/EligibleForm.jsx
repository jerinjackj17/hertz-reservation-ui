import { useState } from "react";

function EligibleForm({ onSubmit, loading }) {

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    annualIncome: "",
    rentalsLastYearCount: "",
    accidentsLastYearCount: "",
    reservationDate: ""
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Basic validation before submit
  const validate = () => {
    const e = {};

    if (!formData.name.trim()) e.name = "Full name is required";

    if (!formData.age) e.age = "Enter your age";
    else if (Number(formData.age) < 18) e.age = "Must be at least 18";

    if (!formData.annualIncome) e.annualIncome = "Income is required";
    else if (Number(formData.annualIncome) <= 0) e.annualIncome = "Must be greater than zero";

    if (formData.rentalsLastYearCount === "") e.rentalsLastYearCount = "Enter 0 if none";
    if (formData.accidentsLastYearCount === "") e.accidentsLastYearCount = "Enter 0 if none";
    if (!formData.reservationDate) e.reservationDate = "Select a reservation date";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for that field while typing
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
      age: Number(formData.age),
      annualIncome: Number(formData.annualIncome),
      rentalsLastYearCount: Number(formData.rentalsLastYearCount),
      accidentsLastYearCount: Number(formData.accidentsLastYearCount)
    });
  };

  return (
    <div className="bg-premium-card border border-premium-border rounded-xl p-10 max-w-4xl mx-auto shadow-sm">

      <h2 className="text-xl font-semibold text-premium-textPrimary mb-8">
        Eligibility Assessment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Full Name */}
          <div>
            <label className="block text-sm text-premium-textSecondary mb-1">
              Full Name
            </label>
            <input
              name="name"
              placeholder="e.g. Jack"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-premium-page border rounded-md px-4 py-2 text-premium-textPrimary placeholder-premium-textSecondary focus:outline-none focus:ring-2 focus:ring-premium-accent/40 transition ${
                errors.name ? "border-red-500" : "border-premium-border"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm text-premium-textSecondary mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              placeholder="18+ required"
              value={formData.age}
              onChange={handleChange}
              className={`w-full bg-premium-page border rounded-md px-4 py-2 text-premium-textPrimary focus:outline-none focus:ring-2 focus:ring-premium-accent/40 transition ${
                errors.age ? "border-red-500" : "border-premium-border"
              }`}
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age}</p>
            )}
          </div>

          {/* Annual Income */}
          <div>
            <label className="block text-sm text-premium-textSecondary mb-1">
              Annual Income
            </label>
            <input
              type="number"
              name="annualIncome"
              placeholder="e.g. 65000"
              value={formData.annualIncome}
              onChange={handleChange}
              className={`w-full bg-premium-page border rounded-md px-4 py-2 text-premium-textPrimary focus:outline-none focus:ring-2 focus:ring-premium-accent/40 transition ${
                errors.annualIncome ? "border-red-500" : "border-premium-border"
              }`}
            />
            {errors.annualIncome && (
              <p className="text-red-500 text-xs mt-1">{errors.annualIncome}</p>
            )}
          </div>

          {/* Rentals */}
          <div>
            <label className="block text-sm text-premium-textSecondary mb-1">
              Rentals Last Year
            </label>
            <input
              type="number"
              name="rentalsLastYearCount"
              placeholder="0 if none"
              value={formData.rentalsLastYearCount}
              onChange={handleChange}
              className={`w-full bg-premium-page border rounded-md px-4 py-2 text-premium-textPrimary focus:outline-none focus:ring-2 focus:ring-premium-accent/40 transition ${
                errors.rentalsLastYearCount ? "border-red-500" : "border-premium-border"
              }`}
            />
            {errors.rentalsLastYearCount && (
              <p className="text-red-500 text-xs mt-1">{errors.rentalsLastYearCount}</p>
            )}
          </div>

          {/* Accidents */}
          <div>
            <label className="block text-sm text-premium-textSecondary mb-1">
              Accidents Last Year
            </label>
            <input
              type="number"
              name="accidentsLastYearCount"
              placeholder="0 if none"
              value={formData.accidentsLastYearCount}
              onChange={handleChange}
              className={`w-full bg-premium-page border rounded-md px-4 py-2 text-premium-textPrimary focus:outline-none focus:ring-2 focus:ring-premium-accent/40 transition ${
                errors.accidentsLastYearCount ? "border-red-500" : "border-premium-border"
              }`}
            />
            {errors.accidentsLastYearCount && (
              <p className="text-red-500 text-xs mt-1">{errors.accidentsLastYearCount}</p>
            )}
          </div>

          {/* Reservation Date */}
          <div>
            <label className="block text-sm text-premium-textSecondary mb-1">
              Reservation Date
            </label>
            <input
              type="date"
              name="reservationDate"
              value={formData.reservationDate}
              onChange={handleChange}
              className={`w-full bg-premium-page border rounded-md px-4 py-2 text-premium-textPrimary focus:outline-none focus:ring-2 focus:ring-premium-accent/40 transition ${
                errors.reservationDate ? "border-red-500" : "border-premium-border"
              }`}
            />
            {errors.reservationDate && (
              <p className="text-red-500 text-xs mt-1">{errors.reservationDate}</p>
            )}
          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-premium-accent hover:bg-premium-accentHover disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-md transition"
        >
          {loading ? "Processing..." : "Find Eligible Vehicles"}
        </button>

      </form>
    </div>
  );
}

export default EligibleForm;