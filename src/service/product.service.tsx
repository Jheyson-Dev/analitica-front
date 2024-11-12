import axiosInstance from "@/utils/axiosConfig";

import { CreateProduct, Kardex, Product } from "@/types";
import { CreateKardex } from "@/types";
import {
  Inventory,
  updateMinStock as updateMinStockType,
} from "@/types/inventory";

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

// FUNCIONALIDAD ADICIONAL

export const getKardexs = async (): Promise<Kardex[]> => {
  try {
    const response = await axiosInstance.get(`/product/kardex`);
    return response.data;
  } catch (error) {
    console.error("Error fetching kardex: ", error);
    throw error;
  }
};

export const createKardex = async (data: CreateKardex): Promise<Kardex> => {
  try {
    const response = await axiosInstance.post(`product/kardex`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating kardex: ", error);
    throw error;
  }
};

export const updateProductMinStock = async (
  id: number,
  data: updateMinStockType
): Promise<Inventory> => {
  try {
    const response = await axiosInstance.put(`/product/min-stock/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating minStock for product:", error);
    throw error;
  }
};

export const getProductKardex = async (id: number): Promise<Kardex[]> => {
  try {
    const response = await axiosInstance.get(`/product/kardex/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product kardex: ", error);
    throw error;
  }
};
