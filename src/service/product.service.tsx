import axiosInstance from "@/utils/axiosConfig";

import { CreateProduct, Product } from "@/types";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get("/product");
    return response.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

export const getProduct = async (id: number): Promise<Product> => {
  try {
    const response = await axiosInstance.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product: ", error);
    throw error;
  }
};

export const createProduct = async (data: CreateProduct) => {
  try {
    const response = await axiosInstance.post(`/product`, data);
    return response.data;
  } catch (error) {
    console.log("Error creating product: ", error);
    throw error;
  }
};

export const updateProduct = async (id: number, data: CreateProduct) => {
  try {
    const response = await axiosInstance.put(`/product/${id}`, data);
    return response.data;
  } catch (error) {
    console.log("Error updating product: ", error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting product: ", error);
    throw error;
  }
};
