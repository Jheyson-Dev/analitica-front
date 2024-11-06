import { pendingVoucher } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const usePendingVoucher = () => {
  return useQuery({
    queryKey: ["vouchers-pending"],
    queryFn: pendingVoucher,
  });
};
