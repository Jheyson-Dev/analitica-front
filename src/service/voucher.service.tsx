import { CreateVoucher, Voucher } from "@/types";
import axiosInstance from "@/utils/axiosConfig";

export const getVouchers = async (): Promise<Voucher[]> => {
  try {
    const response = await axiosInstance.get("/voucher");
    return response.data;
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    throw error;
  }
};

export const getVoucher = async (id: number): Promise<Voucher> => {
  try {
    const response = await axiosInstance.get(`/voucher/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching voucher:", error);
    throw error;
  }
};

export const createVoucher = async (
  voucher: CreateVoucher
): Promise<Voucher> => {
  try {
    const response = await axiosInstance.post("/voucher", voucher);
    return response.data;
  } catch (error) {
    console.error("Error creating voucher:", error);
    throw error;
  }
};

export const updateVoucher = async (
  id: number,
  voucher: Partial<Voucher>
): Promise<Voucher> => {
  try {
    const response = await axiosInstance.put(`/voucher/${id}`, voucher);
    return response.data;
  } catch (error) {
    console.error("Error updating voucher:", error);
    throw error;
  }
};
