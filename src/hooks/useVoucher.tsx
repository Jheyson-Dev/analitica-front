import { getVoucher, getVouchers } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const useVouchers = () => {
  return useQuery({
    queryKey: ["vouchers"],
    queryFn: getVouchers,
  });
};

export const useVoucher = (id: number) => {
  return useQuery({
    queryKey: ["voucher", `${id}`],
    queryFn: async () => {
      return getVoucher(id);
    },
  });
};
