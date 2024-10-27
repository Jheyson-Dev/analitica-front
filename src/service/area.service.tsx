import { Area } from "@/types";
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
