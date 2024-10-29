import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { useWarehouses } from "@/hooks";
import { FC } from "react";
import { toast } from "sonner";
import { WarehousManagment } from "./WarehouseManagment";

export const WarehouseList: FC = () => {
  const { data, error, isLoading } = useWarehouses();
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
      <div className="py-4">{data && <WarehousManagment data={data} />}</div>
    </div>
  );
};
