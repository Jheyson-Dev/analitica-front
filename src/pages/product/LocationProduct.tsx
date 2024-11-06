import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types";
import { FC } from "react";

interface Props {
  data: Product;
}

export const LocationProduct: FC<Props> = ({ data }) => {
  return (
    <div className="py-8">
      <div>
        <h1 className="mb-4 text-xl font-semibold">Location Product</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Almacen</TableHead>
              <TableHead>Ubicacion</TableHead>
              <TableHead>Cantidad</TableHead>
              {/* <TableHead>Min Stock</TableHead> */}
              <TableHead>Fecha Ultimo Movimiento</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.warehouse.name}</TableCell>
                <TableCell>
                  {item.warehouse.location || "No hay direccion"}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {new Date(item.updatedAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
