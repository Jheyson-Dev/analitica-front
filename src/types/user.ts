import { Area } from "./area";
import { Log } from "./log";
import { Role } from "./role";

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  lastname: string;
  email: string;
  phone: string | null;
  dni: string;
  age: number;
  roleId: number;
  areaId: number | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: Role | null;
  area: Area | null;
  log: Log[] | null;
  options?: any;
}

export interface CreateUser {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  dni: string;
  age: number;
  roleId: number;
  areaId: number;
}
