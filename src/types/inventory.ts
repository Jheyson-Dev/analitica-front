import { Product } from "./product";
import { Warehouse } from "./warehouse";

export interface Inventory {
  id: number;
  productId: number;
  warehouseId: number;
  quantity: number;
  minStock: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  warehouse: Warehouse;
}

export interface updateMinStock {
  minStock: number;
}
