import { Product } from "./product";
import { Warehouse } from "./warehouse";

export interface Kardex {
  id: number;
  movementType: string;
  quantity: number;
  movementDate: Date;
  productId: number;
  warehouseId: number;
  product?: Product;
  warehouse?: Warehouse;
  options?: any;
}

export interface CreateKardex {
  movementType: "IN" | "OUT";
  quantity: number;
  productId: number;
  warehouseId: number;
}
