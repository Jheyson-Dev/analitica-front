export interface Warehouse {
  id: number;
  name: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  areaId: number;
  //   inventory: Inventory[];
  //   kardex: Kardex[];
  //   transferOrigin: Transfer[];
  //   transferDestination: Transfer[];
  //   stockNotification: StockNotification[];
  options?: any;
}

export interface CreateWarehouse {
  name: string;
  location?: string;
  areaId: number;
}
