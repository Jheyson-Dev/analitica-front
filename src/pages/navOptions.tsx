// src/navOptions.ts
import { ReactNode } from "react";
import { DashboardSpeed01Icon } from "hugeicons-react";

interface NavOption {
  path: string;
  name: string;
  icon: ReactNode;
  allowedRoles: string[];
}
export const navOptions: NavOption[] = [
  {
    path: "/",
    name: "Dashboard",
    icon: <DashboardSpeed01Icon size={20} />,
    allowedRoles: ["admin"],
  },
  {
    path: "/user",
    name: "User",
    icon: <DashboardSpeed01Icon size={20} />,
    allowedRoles: ["admin"],
  },
  {
    path: "/product",
    name: "Product",
    icon: <DashboardSpeed01Icon size={20} />,
    allowedRoles: ["admin"],
  },
];
