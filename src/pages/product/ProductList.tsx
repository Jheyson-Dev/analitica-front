import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { useProducts } from "@/hooks";
import { toast } from "sonner";
import { ProductManagment } from "./ProductManagment";

export const ProductList: React.FC = () => {
  const { data, error, isLoading } = useProducts();

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
      <div className="py-4">{data && <ProductManagment data={data} />}</div>
    </div>
  );
};
