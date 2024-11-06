import { User } from "./user";
import { VoucherItem } from "./voucherItem";

export interface Voucher {
  id: number;
  gasStation: string;
  address: string;
  meta?: string;
  vehicle?: string;
  activity: string;
  createdAt: Date;
  updatedAt: Date;
  items?: VoucherItem[];
  requesterId: number;
  requesterSigned: boolean;
  immediateBossId?: number;
  immediateBossSigned: boolean;
  municipalManagerId?: number;
  municipalManagerSigned: boolean;
  supplyManagerId?: number;
  supplyManagerSigned: boolean;
  operatorId?: number;
  operatorSigned: boolean;
  warehouseManagerId?: number;
  warehouseManagerSigned: boolean;
  aproved: boolean;
  user?: User;
  operador?: User;

  options?: any;
}

export interface CreateVoucher {
  gasStation: string;
  address: string;
  requesterId: number;
  meta: string;
  operator: string;
  vehicle: string;
  items: VoucherItem[];
}
