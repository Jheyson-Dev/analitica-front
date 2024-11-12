import { getKardexs, getProductKardex } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const useKardexs = () => {
  return useQuery({
    queryKey: ["kardexs"],
    queryFn: getKardexs,
  });
};

export const useKardex = (id: number) => {
  return useQuery({
    queryKey: ["kardex", id],
    queryFn: () => getProductKardex(id),
  });
};
