import { useVouchers } from "@/hooks";
import { VoucherManagment } from "./VoucherManagment";
import { toast } from "sonner";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";

export const VoucherList = () => {
  const { data, error, isLoading } = useVouchers();
  console.log(data);
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
      <VoucherManagment data={data ?? []} />
    </div>
  );
};
