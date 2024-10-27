import { getArea, getAreas } from "@/service/area.service";
import { useQuery } from "@tanstack/react-query";

export const useAreas = () => {
  return useQuery({
    queryKey: ["areas"],
    queryFn: getAreas,
  });
};
export const useArea = (id: number) => {
  return useQuery({
    queryKey: ["area", `${id}`],
    queryFn: async () => {
      return getArea(id);
    },
  });
};
