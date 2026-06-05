import axios from "axios";

export const api = axios.create({
  baseURL: "https://eco-ecom-cms-driven.onrender.com/api",
});

// Fetch Content Data
export const getContentData = async () => {
  try {
    const response = await api.get("/content");
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};

// Add New Content
export const addNewContent = async (newContent) => {
  try {
    const response = await api.post("/content", newContent);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to add new content");
  }
};

// Delete Content
export const deleteContent = async (id) => {
  try {
    const response = await api.delete(`/content/${id}`);
    return id;
  } catch (error) {
    throw new Error("Failed to delete content");
  }
};

// Update Content
export const updateContent = async (id , updatedData) => {
  try {
    const response = await api.put(`/content/${id}`, updatedData);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to update content");
  }
};