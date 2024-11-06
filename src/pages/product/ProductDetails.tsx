import { useProduct } from "@/hooks";
import { LocationProduct } from "./LocationProduct";
import { useParams } from "react-router-dom";
import { FC } from "react";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { KardexGrafic } from "./KardexGrafic";

export const ProductDetails: FC = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(Number(id));
  console.log(product);
  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <div>{product && <LocationProduct data={product ?? []} />}</div>
      <div>{product && <KardexGrafic data={product ?? []} />}</div>
    </div>
  );
};
