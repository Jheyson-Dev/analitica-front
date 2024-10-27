import { Role } from "@/types";
import axiosInstance from "@/utils/axiosConfig";

export const getRoles = async (): Promise<Role[]> => {
  try {
    const response = await axiosInstance.get("/role");
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};

export const getRole = async (id: number): Promise<Role> => {
  try {
    const response = await axiosInstance.get(`/role/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching role:", error);
    throw error;
  }
};
