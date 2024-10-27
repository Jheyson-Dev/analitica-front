import { profile } from "@/service";
import { getUser, getUsers } from "@/service/user.service";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
export const useUser = (id: number) => {
  return useQuery({
    queryKey: ["user", `${id}`],
    queryFn: async () => {
      return getUser(id);
    },
  });
};

export const useProfile = (id: number) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return profile(id);
    },
  });
};
