import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { useUsers } from "@/hooks";
import React from "react";
import { toast } from "sonner";
import { UserManagment } from "./UserManagment";

export const UserList: React.FC = () => {
  const { data, isLoading, error } = useUsers();
  // console.warn(error?.response?.data?.message);

  if (error) {
    return toast.error("An error has occurred: " + error.message);
    // return toast.error(
    //   "An error has occurred: " + error?.response?.data?.message
    // );
  }

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      {error && <div>{JSON.stringify(error)}</div>}
      <div className="py-4">{data && <UserManagment data={data} />}</div>
    </div>
  );
};
