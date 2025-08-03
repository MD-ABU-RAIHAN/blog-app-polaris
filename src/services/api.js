import { CategoriesIcon } from "@shopify/polaris-icons";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/blogs/",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

const handleApiError = (error, operation) => {
  console.log(`${operation} Request Failed >>`, error);
  throw new Error(`${operation} failed: ${error.message}`);
};

export const getApiData = async (endpoint = "") => {
  try {
    const res = await apiClient.get(endpoint);
    return res.data;
  } catch (error) {
    handleApiError(error, "Get");
  }
};

export const postApiData = async (data, endpoint = "") => {
  try {
    console.log(data);
    const res = await apiClient.post(endpoint, data);
    return res.data;
  } catch (error) {
    handleApiError(error, "Post");
  }
};
export const updateApiData = async (data, endpoint = "") => {
  try {
    const res = await apiClient.patch(endpoint, data);
    return res.data;
  } catch (error) {
    handleApiError(error, "Update");
  }
};
export const deleteApiData = async (endpoint = "") => {
  try {
    const res = await apiClient.delete(endpoint);
    return res.data;
  } catch (error) {
    handleApiError(error, "Delete");
  }
};
