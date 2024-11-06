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
    allowedRoles: [
      "admin",
      "encargado-almacen",
      "trabajador",
      "jefe-area",
      "gerente-municipal",
      "operador",
      "jefe-almacen",
    ],
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
    allowedRoles: ["admin", "encargado-almacen", "jefe-area", "jeje-almacen"],
  },
  {
    path: "/area",
    name: "Area",
    icon: <DashboardSpeed01Icon size={20} />,
    allowedRoles: ["admin"],
  },
  {
    path: "/warehouse",
    name: "Warehouse",
    icon: <DashboardSpeed01Icon size={20} />,
    allowedRoles: ["admin"],
  },
  {
    path: "/kardex",
    name: "Kardex",
    icon: <DashboardSpeed01Icon size={20} />,
    allowedRoles: [
      "admin",
      "encargado-almacen",
      "trabajador",
      "jefe-area",
      "jeje-almacen",
    ],
  },
  {
    path: "/voucher",
    name: "Voucher",
    icon: <DashboardSpeed01Icon size={20} />,
    allowedRoles: [
      "admin",
      "encargado-almacen",
      "trabajador",
      "jefe-area",
      "gerente-municipal",
      "operador",
      "jefe-almacen",
    ],
  },
];
