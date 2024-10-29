import { Inventory } from "./inventory";
import { Kardex } from "./kardex";

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  inventory: Inventory[];
  kardex: Kardex[];
  //   transfer: Transfer[];
  //   stockNotification: StockNotification;
  options?: any;
}

export interface CreateProduct {
  name: string;
  description?: string;
  price: number;
}
