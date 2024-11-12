import { useProduct } from "@/hooks";
import { LocationProduct } from "./LocationProduct";
import { useParams } from "react-router-dom";
import { FC } from "react";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { KardexGrafic } from "./KardexGrafic";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ProductDetails: FC = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(Number(id));
  console.log(product);
  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <div>{product && <LocationProduct data={product ?? []} />}</div>
      <div>{product && <KardexGrafic data={product ?? []} />}</div>
      {/* <div className="mt-10">
        <h1 className="mb-4 text-xl font-semibold">Movements Product</h1>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo de Movimiento</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Almacén</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product?.kardex?.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>
                    {new Date(movement.movementDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {movement.movementType === "IN" ? "Entrada" : "Salida"}
                  </TableCell>
                  <TableCell>{movement?.quantity}</TableCell>
                  <TableCell>{movement?.warehouse?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {product?.kardex?.length === 0 && (
            <p className="p-4 text-center text-muted-foreground">
              No hay movimientos registrados para este producto.
            </p>
          )}
        </div>
      </div> */}
    </div>
  );
};
