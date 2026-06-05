import axios from "axios";

export const api = axios.create({
  baseURL: "https://eco-ecom-cms-driven.onrender.com/api",
});

// Fetch Routes
export const getRouteData = async () => {
  try {
    const response = await api.get("/cms-routes");
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};

// Add Route
export const addRouteData = async (newItem) => {
  try {
    const response = await api.post("/cms-routes", newItem);

    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};

// Delete Route
export const deleteRouteData = async (id) => {
  try {
    await api.delete(`/cms-routes/${id}`);
    return id;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};

// Update Route
export const updateRouteData = async ({ id, updatedItem }) => {
  console.log("PUT URL =>", `/cms-routes/${id}`);
  try {
    const response = await api.put(`/cms-routes/${id}`, updatedItem);

    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};

// Duplicate Route
export const DuplicateRoute = async (route) => {
  const duplicateRoute = {
    ...route,
    name: `${route.name}-copy`,
    path: `${route.path}-copy`,
    updated: new Date().toDateString(),
  };
  try {
    const response = await api.post("/cms-routes" , duplicateRoute);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Request failed");
  }
};
