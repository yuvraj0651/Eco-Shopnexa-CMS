import axios from "axios";

export const api = axios.create({
  baseURL: "https://eco-ecom-cms-driven.onrender.com/api",
});

// Fetch Content Backup
export const getBackupData = async () => {
  try {
    const response = await api.get("/backups");
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};

// Add Backup
export const addNewBackup = async (backupData) => {
  try {
    const response = await api.post("/backups", backupData);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to add new backup");
  }
};