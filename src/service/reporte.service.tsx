import axiosInstance from "@/utils/axiosConfig";

export const pendingVoucher = async () => {
  try {
    const response = await axiosInstance.get("/report/pending-vouchers");
    return response.data;
  } catch (error) {
    console.error("Error fetching voucher:", error);
    throw error;
  }
};
