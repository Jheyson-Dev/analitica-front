import { Area, CreateArea } from "@/types";
import axiosInstance from "@/utils/axiosConfig";

export const getAreas = async (): Promise<Area[]> => {
  try {
    const response = await axiosInstance.get("/area");
    return response.data;
  } catch (error) {
    console.error("Error fetching areas:", error);
    throw error;
  }
};

export const getArea = async (id: number): Promise<Area> => {
  try {
    const response = await axiosInstance.get(`/area/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching area:", error);
    throw error;
  }
};

export const createArea = async (data: CreateArea): Promise<Area> => {
  try {
    const response = await axiosInstance.post(`/area`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching area:", error);
    throw error;
  }
};

export const updateArea = async (
  id: number,
  data: CreateArea
): Promise<Area> => {
  try {
    const response = await axiosInstance.put(`/area/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating area:", error);
    throw error;
  }
};

export const deleteArea = async (id: number): Promise<Area> => {
  try {
    const response = await axiosInstance.delete(`/area/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting area:", error);
    throw error;
  }
};
