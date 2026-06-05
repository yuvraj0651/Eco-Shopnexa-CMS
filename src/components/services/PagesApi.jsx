import axios from "axios";

export const api = axios.create({
  baseURL: "https://eco-ecom-cms-driven.onrender.com/api",
});

// Fetch all pages
export const getPagesData = async () => {
  try {
    const response = await api.get("/pages");
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};

// Add new page
export const addPageData = async (newPage) => {
  try {
    const response = await api.post("/page" , newPage);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};

// Delete Page
export const deletePageData = async (id) => {
  try {
    const response = await api.delete(`/pages/${id}`);
    return id;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};

// Update Page
export const updatePageData = async (id , updatedItem) => {
  try {
    const response = await api.put(`/page/${id}` , updatedItem);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};