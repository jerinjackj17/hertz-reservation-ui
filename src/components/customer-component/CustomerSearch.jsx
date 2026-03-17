import { useState } from "react";

function CustomerSearch({ onSearch }) {

  // Local state
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Basic email regex
  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Trigger search with validation
  const handleSearch = () => {
    const trimmed = email.trim();

    if (!trimmed) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(trimmed)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    onSearch(trimmed);
  };

  // Reset search
  const handleReset = () => {
    setEmail("");
    setError("");
    onSearch("");
  };

  return (
    <div className="bg-premium-card border border-premium-border rounded-xl p-6 shadow-sm">

      <div className="flex flex-col md:flex-row md:items-end gap-4">

        <div className="flex-1">
          <label className="block text-sm text-premium-textSecondary mb-1">
            Search by Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="Enter customer email"
            className={`w-full bg-premium-page border rounded-md px-4 py-2 text-premium-textPrimary focus:outline-none focus:ring-2 focus:ring-premium-accent/40 transition ${
              error ? "border-red-500" : "border-premium-border"
            }`}
          />

          {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSearch}
            className="bg-premium-accent hover:bg-premium-accentHover text-white px-5 py-2 rounded-md transition"
          >
            Search
          </button>

          <button
            onClick={handleReset}
            className="border border-premium-border text-premium-textSecondary hover:text-premium-textPrimary hover:border-premium-accent px-5 py-2 rounded-md transition"
          >
            Reset
          </button>
        </div>

      </div>

    </div>
  );
}

export default CustomerSearch;