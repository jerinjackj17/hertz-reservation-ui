const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchEligibleProducts(data) {
  const response = await fetch(
    `${BASE_URL}/api/loyalty/eligible-products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed");
  }

  return response.json();
}