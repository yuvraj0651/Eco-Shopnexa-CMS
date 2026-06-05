import axios from "axios";

export const api = axios.create({
  baseURL: "https://eco-ecom-cms-driven.onrender.com/api",
});

// Fetch all users Items
export const getUsersData = async () => {
  try {
    const response = await api.get("/auth");
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch users data");
  }
};
