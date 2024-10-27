// auth.service.tsx
import { Logininput, LoginResponse, User } from "@/types";
import axiosInstance from "@/utils/axiosConfig";

export const login = async (data: Logininput): Promise<LoginResponse> => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const profile = async (id: number): Promise<User> => {
  const response = await axiosInstance.get(`/auth/profile/${id}`);
  return response.data;
};
