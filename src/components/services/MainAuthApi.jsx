import axios from "axios";

export const api = axios.create({
  baseURL: "https://eco-ecom-cms-driven.onrender.com/api",
});

// Fetch Auth cart Items
export const getUserData = async () => {
  try {
    const response = await api.get("/auth");
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user data main website");
  }
};
