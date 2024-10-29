import { User } from "./user";

export interface Area {
  id: number;
  name: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  users?: User[];
  managerId: number;
  manager?: User;
  options?: any;
}

export interface CreateArea {
  name: string;
  managerId: number;
}
