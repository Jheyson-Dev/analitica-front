import { CreateWarehouse, Warehouse } from "@/types";
import axiosInstance from "@/utils/axiosConfig";

export const getWarehouses = async (): Promise<Warehouse[]> => {
  try {
    const response = await axiosInstance.get("/warehouse");
    return response.data;
  } catch (error) {
    console.error("Error fetching warehouses: ", error);
    throw error;
  }
};

export const getWarehouse = async (id: number): Promise<Warehouse> => {
  try {
    const response = await axiosInstance.get(`/warehouse/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching warehouse: ", error);
    throw error;
  }
};

export const createWarehouse = async (data: CreateWarehouse) => {
  try {
    const response = await axiosInstance.post(`/warehouse`, data);
    return response.data;
  } catch (error) {
    console.log("Error creating warehouse: ", error);
    throw error;
  }
};

export const updateWarehouse = async (id: number, data: CreateWarehouse) => {
  try {
    const response = await axiosInstance.put(`/warehouse/${id}`, data);
    return response.data;
  } catch (error) {
    console.log("Error updating warehouse: ", error);
    throw error;
  }
};

export const deleteWarehouse = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/warehouse/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting warehouse: ", error);
    throw error;
  }
};
