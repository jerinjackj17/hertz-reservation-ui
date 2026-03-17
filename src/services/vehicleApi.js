// src/services/vehicleApi.js

import axios from "axios";

// base url from .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// reusable axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// fetch all vehicles
export async function getAllVehicles() {
  try {
    const response = await api.get("/api/vehicles");
    return response.data;
  } catch (error) {
    // backend error message if available
    const message =
      error.response?.data?.message || "Failed to fetch vehicles";
    throw new Error(message);
  }
}

// fetch vehicle by id
export async function getVehicleById(id) {
  try {
    const response = await api.get(`/api/vehicles/${id}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Vehicle not found";
    throw new Error(message);
  }
}

// create vehicle
export async function createVehicle(vehicleData) {
  try {
    const response = await api.post("/api/vehicles", vehicleData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to create vehicle";
    throw new Error(message);
  }
}

// update vehicle
export async function updateVehicle(id, vehicleData) {
  try {
    const response = await api.put(`/api/vehicles/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to update vehicle";
    throw new Error(message);
  }
}

// delete vehicle
export async function deleteVehicle(id) {
  try {
    await api.delete(`/api/vehicles/${id}`);
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to delete vehicle";
    throw new Error(message);
  }
}