import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { useKardexs } from "@/hooks";
import { FC, useEffect } from "react";
import { toast } from "sonner";
import { KardexManagment } from "./KardexManagment";
import io from "socket.io-client";
import useAuthStore from "@/store/authStore";

export const KardexList: FC = () => {
  const { data, error, isLoading } = useKardexs();

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
      <div className="py-4">{data && <KardexManagment data={data} />}</div>
    </div>
  );
};
