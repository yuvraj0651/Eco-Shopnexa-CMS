import axios from "axios";

export const api = axios.create({
  baseURL: "https://eco-ecom-cms-driven.onrender.com/api",
});

// Fetch Database
export const getDatabaseData = async () => {
  try {
    const response = await api.get("/database");
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};