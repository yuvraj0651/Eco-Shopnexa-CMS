import axios from "axios";

export const api = axios.create({
  baseURL: "https://eco-ecom-cms-driven.onrender.com/api",
});

// Fetch all cart Items
export const getCartData = async () => {
  try {
    const response = await api.get("/cart");
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};

// Add cart Items
export const addCartData = async (newItem) => {
  try {
    const response = await api.post("/cart" , newItem);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};

// Delete cart Items
export const deleteCartData = async (id) => {
  try {
    const response = await api.delete(`/cart/${id}`);
    return id;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};

// Update cart Items
export const updateCartData = async (id , updatedItem) => {
  try {
    const response = await api.put(`/cart/${id}` , updatedItem);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};