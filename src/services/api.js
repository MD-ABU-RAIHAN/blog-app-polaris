import { CategoriesIcon } from "@shopify/polaris-icons";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/blogs/",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export const getApiData = async (endpoint = "") => {
  try {
    const res = await apiClient.get(endpoint);
    return res.data;
  } catch (error) {
    console.log("Api Get Request Failed >> ", error);
    throw new Error(error);
  }
};

export const postApiData = async (data, endpoint = "") => {
  try {
    console.log(data);
    const res = await apiClient.post(endpoint, data);
    return res.data;
  } catch (error) {
    console.log("Post Request Failed >> ", error);
  }
};
export const updateApiData = async (data, endpoint = "") => {
  try {
    const res = await apiClient.patch(endpoint, data);
    return res.data;
  } catch (error) {
    console.log("Update Request Failed >> ", error);
  }
};
export const deleteApiData = async (endpoint = "") => {
  try {
    const res = await apiClient.delete(endpoint);
    return res.data;
  } catch (error) {
    console.log("Delete Request Failed >> ", error);
  }
};
