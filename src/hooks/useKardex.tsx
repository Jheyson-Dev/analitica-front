import { getKardexs } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const useKardexs = () => {
  return useQuery({
    queryKey: ["kardexs"],
    queryFn: getKardexs,
  });
};
