import { useState } from "react";

function EligibleForm({ onSubmit, loading }) {

  // form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    annualIncome: "",
    rentalsLastYearCount: "",
    accidentsLastYearCount: "",
    reservationDate: ""
  });

  // validation errors
  const [errors, setErrors] = useState({});

  // real time warnings shown as user types — does not block submit
  const getWarnings = () => {
    const w = {};

    // hard block — age below 18 definitely fails eligibility
    if (formData.age && Number(formData.age) < 18)
      w.age = "Customers under 18 are not eligible to rent";

    // hard block — any accident in last year fails eligibility
    if (formData.accidentsLastYearCount && Number(formData.accidentsLastYearCount) > 0)
      w.accidentsLastYearCount = "Customers with accidents in the last year are not eligible";

    // soft warning — income AND rentals both low means they fail rule 2
    const lowIncome = formData.annualIncome && Number(formData.annualIncome) <= 10000;
    const lowRentals = formData.rentalsLastYearCount !== "" && Number(formData.rentalsLastYearCount) < 3;

    if (lowIncome && lowRentals)
      w.incomeRentals = "You may not qualify — income must exceed $10,000 or rentals must be 3 or more";

    return w;
  };

  // basic validation before submit — only blocks empty/invalid fields
  const validate = () => {
    const e = {};

    if (!formData.name.trim()) e.name = "Full name is required";

    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Invalid email format";

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

  // handle input change — clears error on that field as user types
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

    // email and name stay as strings — only numeric fields get converted
    onSubmit({
      ...formData,
      age: Number(formData.age),
      annualIncome: Number(formData.annualIncome),
      rentalsLastYearCount: Number(formData.rentalsLastYearCount),
      accidentsLastYearCount: Number(formData.accidentsLastYearCount)
    });
  };

  // compute warnings on every render as user types
  const warnings = getWarnings();

  // reusable input class — keeps things consistent across all fields
  const inputClass = (field, hasWarning) =>
    `w-full bg-premium-page border rounded-md px-4 py-2.5 text-sm text-premium-textPrimary placeholder-premium-textSecondary focus:outline-none focus:ring-2 focus:ring-premium-accent/40 transition ${
      errors[field] ? "border-red-500"
      : hasWarning ? "border-yellow-400"
      : "border-premium-border"
    }`;

  return (
    <div className="bg-premium-card border border-premium-border rounded-xl p-8 max-w-3xl mx-auto shadow-sm">

      {/* form title */}
      <div className="mb-6 pb-4 border-b border-premium-border">
        <h2 className="text-lg font-semibold text-premium-textPrimary">
          Eligibility Assessment
        </h2>
        <p className="text-xs text-premium-textSecondary mt-1">
          Fill in your details to check eligible vehicles
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* row 1 — name and email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-xs font-medium text-premium-textSecondary mb-1">
              Full Name
            </label>
            <input
              name="name"
              placeholder="e.g. Jack Smith"
              value={formData.name}
              onChange={handleChange}
              className={inputClass("name", false)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-premium-textSecondary mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. jack@email.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass("email", false)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

        </div>

        {/* row 2 — age and annual income */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-xs font-medium text-premium-textSecondary mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              placeholder="18+ required"
              value={formData.age}
              onChange={handleChange}
              className={inputClass("age", warnings.age)}
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
            {!errors.age && warnings.age && (
              <p className="text-red-400 text-xs mt-1">⚠ {warnings.age}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-premium-textSecondary mb-1">
              Annual Income ($)
            </label>
            <input
              type="number"
              name="annualIncome"
              placeholder="e.g. 65000"
              value={formData.annualIncome}
              onChange={handleChange}
              className={inputClass("annualIncome", warnings.incomeRentals)}
            />
            {errors.annualIncome && (
              <p className="text-red-500 text-xs mt-1">{errors.annualIncome}</p>
            )}
          </div>

        </div>

        {/* row 3 — rentals and accidents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-xs font-medium text-premium-textSecondary mb-1">
              Rentals Last Year
            </label>
            <input
              type="number"
              name="rentalsLastYearCount"
              placeholder="0 if none"
              value={formData.rentalsLastYearCount}
              onChange={handleChange}
              className={inputClass("rentalsLastYearCount", warnings.incomeRentals)}
            />
            {errors.rentalsLastYearCount && (
              <p className="text-red-500 text-xs mt-1">{errors.rentalsLastYearCount}</p>
            )}
            {warnings.incomeRentals && (
              <p className="text-yellow-400 text-xs mt-1">⚠ {warnings.incomeRentals}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-premium-textSecondary mb-1">
              Accidents Last Year
            </label>
            <input
              type="number"
              name="accidentsLastYearCount"
              placeholder="0 if none"
              value={formData.accidentsLastYearCount}
              onChange={handleChange}
              className={inputClass("accidentsLastYearCount", warnings.accidentsLastYearCount)}
            />
            {errors.accidentsLastYearCount && (
              <p className="text-red-500 text-xs mt-1">{errors.accidentsLastYearCount}</p>
            )}
            {!errors.accidentsLastYearCount && warnings.accidentsLastYearCount && (
              <p className="text-red-400 text-xs mt-1">⚠ {warnings.accidentsLastYearCount}</p>
            )}
          </div>

        </div>

        {/* row 4 — reservation date full width */}
        <div>
          <label className="block text-xs font-medium text-premium-textSecondary mb-1">
            Reservation Date
          </label>
          <input
            type="date"
            name="reservationDate"
            value={formData.reservationDate}
            onChange={handleChange}
            className={inputClass("reservationDate", false)}
          />
          {errors.reservationDate && (
            <p className="text-red-500 text-xs mt-1">{errors.reservationDate}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-premium-accent hover:bg-premium-accentHover disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-md text-sm font-medium transition"
        >
          {loading ? "Processing..." : "Find Eligible Vehicles"}
        </button>

      </form>
    </div>
  );
}

export default EligibleForm;