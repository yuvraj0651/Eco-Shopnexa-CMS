import axios from "axios";

export const api = axios.create({
  baseURL: "https://eco-ecom-cms-driven.onrender.com/api",
});

// Fetch Settings
export const getSettingsData = async () => {
  try {
    const response = await api.get("/settings");
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};

// Update Settings
export const updateSettings = async (id , updatedData) => {
  try {
    const response = await api.put(`/settings/${id}`, updatedData);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to update settings");
  }
};