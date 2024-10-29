import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { useAreas } from "@/hooks";
import { FC } from "react";
import { toast } from "sonner";
import { AreaManagment } from "./AreaManagment";

export const AreaList: FC = () => {
  const { data, isLoading, error } = useAreas();

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
      <div className="py-4">{data && <AreaManagment data={data} />}</div>
    </div>
  );
};
