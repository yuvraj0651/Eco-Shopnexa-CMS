import axios from "axios";

export const api = axios.create({
  baseURL: "https://eco-ecom-cms-driven.onrender.com/api",
});

// Fetch all products Items
export const getProductsData = async () => {
  try {
    const response = await api.get("/products");
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch products data");
  }
};

// Add New Product
export const addNewProduct = async (newProduct) => {
  try {
    const response = await api.post("/products", newProduct);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to add new product");
  }
};

// Delete Product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return id;
  } catch (error) {
    throw new Error("Failed to delete product");
  }
};

// Update Product
export const updateProduct = async (id , updatedData) => {
  try {
    const response = await api.put(`/products/${id}`, updatedData);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to update  product");
  }
};
