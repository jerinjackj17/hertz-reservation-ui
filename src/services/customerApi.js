// src/services/customerApi.js

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

// fetch all customers
export async function getAllCustomers() {
  try {
    const response = await api.get("/api/customers");
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch customers";
    throw new Error(message);
  }
}

// create customer
export async function createCustomer(customerData) {
  try {
    const response = await api.post("/api/customers", customerData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to create customer";
    throw new Error(message);
  }
}

// update customer by id
export async function updateCustomer(id, customerData) {
  try {
    const response = await api.put(
      `/api/customers/${id}`,
      customerData
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to update customer";
    throw new Error(message);
  }
}

// delete customer by id
export async function deleteCustomer(id) {
  try {
    await api.delete(`/api/customers/${id}`);
  } catch (error) {
    const message =
      error.response?.data?.message || "Delete failed";
    throw new Error(message);
  }
}

// search customer by email
export async function getCustomerByEmail(email) {
  try {
    const response = await api.get(
      `/api/customers/email/${email}`
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Customer not found";
    throw new Error(message);
  }
}