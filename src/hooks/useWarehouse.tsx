import { getWarehouse, getWarehouses } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const useWarehouses = () => {
  return useQuery({
    queryKey: ["warehouses"],
    queryFn: getWarehouses,
  });
};

export const useWarehouse = (id: number) => {
  return useQuery({
    queryKey: ["warehouse", `${id}`],
    queryFn: async () => {
      return getWarehouse(id);
    },
  });
};
