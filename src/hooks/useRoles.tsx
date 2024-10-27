import { getRole, getRoles } from "@/service";
import { useQuery } from "@tanstack/react-query";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
};

export const useRole = (id: number) => {
  return useQuery({
    queryKey: ["role", `${id}`],
    queryFn: async () => {
      return getRole(id);
    },
  });
};
