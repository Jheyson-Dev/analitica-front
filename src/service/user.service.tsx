import { CreateUser, User } from "@/types";
import axiosInstance from "@/utils/axiosConfig";

export const getUsers = async (): Promise<[User]> => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
};

export const getUser = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
};

export const createUser = async (data: CreateUser) => {
  try {
    const response = await axiosInstance.post(`/user`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
};

export const updateUser = async (id: number, data: CreateUser) => {
  try {
    const response = await axiosInstance.put(`/user/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
};
