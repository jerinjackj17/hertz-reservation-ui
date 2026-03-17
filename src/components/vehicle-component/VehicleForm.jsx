import { useState, useEffect } from "react";
import {
  VEHICLE_CATEGORIES,
  VEHICLE_SIZES,
  RENTAL_TYPES,
  DRIVE_TYPES,
  DURATION_TYPES
} from "../../constants/VehicleEnums";

function VehicleForm({ initialData = null, onSubmit, loading }) {

  const emptyForm = {
    category: "",
    size: "",
    rentalType: "",
    driveType: "",
    durationType: "",
    price: "",
    availableFrom: "",
    availableTo: ""
  };

  const [formData, setFormData] = useState(emptyForm);

  // field-level errors object
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        availableFrom: initialData.availableFrom
          ? new Date(initialData.availableFrom).toISOString().slice(0, 16)
          : "",
        availableTo: initialData.availableTo
          ? new Date(initialData.availableTo).toISOString().slice(0, 16)
          : ""
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    // required validations
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.size) newErrors.size = "Size is required";
    if (!formData.rentalType) newErrors.rentalType = "Rental Type is required";
    if (!formData.driveType) newErrors.driveType = "Drive Type is required";
    if (!formData.durationType) newErrors.durationType = "Duration Type is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.availableFrom) newErrors.availableFrom = "Available From is required";
    if (!formData.availableTo) newErrors.availableTo = "Available To is required";

    if (formData.price && Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (formData.availableFrom && formData.availableTo) {
      const fromDate = new Date(formData.availableFrom);
      const toDate = new Date(formData.availableTo);

      if (fromDate >= toDate) {
        newErrors.availableTo = "Must be after Available From";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      ...formData,
      price: Number(formData.price),
      availableFrom: new Date(formData.availableFrom).toISOString(),
      availableTo: new Date(formData.availableTo).toISOString()
    };

    await onSubmit(payload);
  }

  // input style with conditional red border
  function inputStyle(fieldName) {
    return `
      w-full h-11 px-4 rounded-md text-sm transition
      border ${errors[fieldName] ? "border-red-500" : "border-premium-border"}
      bg-premium-card text-premium-textPrimary
      focus:outline-none focus:ring-2 focus:ring-premium-accent
    `;
  }

  return (
    <form
      className="bg-premium-card border border-premium-border rounded-xl p-10 space-y-8 shadow-sm"
      onSubmit={handleSubmit}
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <select name="category" value={formData.category} onChange={handleChange} className={inputStyle("category")}>
            <option value="">Select Category</option>
            {VEHICLE_CATEGORIES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
        </div>

        <div>
          <select name="size" value={formData.size} onChange={handleChange} className={inputStyle("size")}>
            <option value="">Select Size</option>
            {VEHICLE_SIZES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {errors.size && <p className="text-xs text-red-500 mt-1">{errors.size}</p>}
        </div>

        <div>
          <select name="rentalType" value={formData.rentalType} onChange={handleChange} className={inputStyle("rentalType")}>
            <option value="">Select Rental Type</option>
            {RENTAL_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {errors.rentalType && <p className="text-xs text-red-500 mt-1">{errors.rentalType}</p>}
        </div>

        <div>
          <select name="driveType" value={formData.driveType} onChange={handleChange} className={inputStyle("driveType")}>
            <option value="">Select Drive Type</option>
            {DRIVE_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {errors.driveType && <p className="text-xs text-red-500 mt-1">{errors.driveType}</p>}
        </div>

        <div>
          <select name="durationType" value={formData.durationType} onChange={handleChange} className={inputStyle("durationType")}>
            <option value="">Select Duration Type</option>
            {DURATION_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {errors.durationType && <p className="text-xs text-red-500 mt-1">{errors.durationType}</p>}
        </div>

        <div>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Price"
            className={inputStyle("price")}
          />
          {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="text-xs text-premium-textSecondary mb-1 block">
            Available From
          </label>
          <input
            type="datetime-local"
            name="availableFrom"
            value={formData.availableFrom}
            onChange={handleChange}
            className={inputStyle("availableFrom")}
          />
          {errors.availableFrom && <p className="text-xs text-red-500 mt-1">{errors.availableFrom}</p>}
        </div>

        <div>
          <label className="text-xs text-premium-textSecondary mb-1 block">
            Available To
          </label>
          <input
            type="datetime-local"
            name="availableTo"
            value={formData.availableTo}
            onChange={handleChange}
            className={inputStyle("availableTo")}
          />
          {errors.availableTo && <p className="text-xs text-red-500 mt-1">{errors.availableTo}</p>}
        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-premium-accent hover:bg-premium-accentHover text-white rounded-md text-sm font-medium tracking-wide transition"
      >
        {loading ? "Saving..." : "Submit Vehicle"}
      </button>

    </form>
  );
}

export default VehicleForm;