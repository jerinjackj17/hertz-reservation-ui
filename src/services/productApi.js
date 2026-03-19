const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// kafka event service runs on port 8082
const KAFKA_URL = import.meta.env.VITE_KAFKA_BASE_URL;

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

// called when customer confirms reservation on a product row
export async function reserveProduct(data) {

  // readable local timestamp e.g. "2026-03-18 14:32:05"
  const now = new Date();
  const eventTime = now.getFullYear() + "-"
    + String(now.getMonth() + 1).padStart(2, "0") + "-"
    + String(now.getDate()).padStart(2, "0") + " "
    + String(now.getHours()).padStart(2, "0") + ":"
    + String(now.getMinutes()).padStart(2, "0") + ":"
    + String(now.getSeconds()).padStart(2, "0");

  const response = await fetch(
    `${KAFKA_URL}/events/vehicle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // send product + customer details as the kafka event payload
      body: JSON.stringify({
        eventType: "VEHICLE_RESERVATION_EVENT",
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        vehicleId: data.productId,
        vehicleCategory: data.category,
        vehicleSize: data.size,
        vehicleType: data.type,
        vehicleDriveType: data.driveType,
        vehicleDuration: data.duration,
        vehiclePrice: data.price,
        validFrom: data.validFrom,
        validTo: data.validTo,
        eventTime: eventTime  // readable local timestamp
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Reservation failed");
  }

  // backend returns plain text not JSON — use text() not json()
  return response.text();
}