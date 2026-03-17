function Spinner({ size = "md" }) {

  // size variants
  const sizeClass =
    size === "sm"
      ? "h-4 w-4 border-2"
      : size === "lg"
      ? "h-10 w-10 border-4"
      : "h-6 w-6 border-3";

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClass} border-gray-300 border-t-indigo-600 rounded-full animate-spin`}
      />
    </div>
  );
}

export default Spinner;