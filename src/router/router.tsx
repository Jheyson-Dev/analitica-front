import { ContentTemplate } from "@/components/shared/ContentTemplate";
import AppTemplate from "@/components/templates/AppTemplate";
import { AreaEdith } from "@/pages/area/AreaEdith";
import { AreaList } from "@/pages/area/AreaList";
import Login from "@/pages/auth/Login";
import { Profile } from "@/pages/auth/Profile";
import Dashboard from "@/pages/Dashboard";
import { KardexList } from "@/pages/kardex/KardexList";
import { PrivateRoute } from "@/pages/PrivateRoute";
import { ProductDetails } from "@/pages/product/ProductDetails";
import { ProductEdith } from "@/pages/product/ProductEdith";
import { ProductList } from "@/pages/product/ProductList";
import Unauthorized from "@/pages/Unauthorized";
import { UserEdit } from "@/pages/user/UserEdit";
import { UserList } from "@/pages/user/Userlist";
import { CreacionVoucher } from "@/pages/voucher/createVoucher";
import { VoucherPreview } from "@/pages/voucher/VoucherPreview";
import { VoucherList } from "@/pages/voucher/VoucherList";
import { WarehouseEdith } from "@/pages/warehouse/WarehouseEdith";
import { WarehouseList } from "@/pages/warehouse/WarehouseList";
import { createBrowserRouter } from "react-router-dom";
import { VoucherDetails } from "@/pages/voucher/VoucherDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute
        allowedRoles={[
          "admin",
          "encargado-almacen",
          "trabajador",
          "jefe-area",
          "gerente-municipal",
          "operador",
          "jefe-almacen",
        ]}
      >
        <AppTemplate />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute
            allowedRoles={[
              "admin",
              "encargado-almacen",
              "trabajador",
              "jefe-area",
              "gerente-municipal",
              "operador",
              "jefe-almacen",
            ]}
          >
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute
            allowedRoles={[
              "admin",
              "encargado-almacen",
              "trabajador",
              "jefe-area",
              "gerente-municipal",
              "operador",
              "jefe-almacen",
            ]}
          >
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "user",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <ContentTemplate />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute allowedRoles={["admin"]}>
                <UserList />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <PrivateRoute allowedRoles={["admin"]}>
                <UserEdit />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "product",
        element: (
          <PrivateRoute
            allowedRoles={[
              "admin",
              "encargado-almacen",
              "jefe-area",
              "jefe-almacen",
            ]}
          >
            <ContentTemplate />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute
                allowedRoles={[
                  "admin",
                  "encargado-almacen",
                  "jefe-area",
                  "jefe-almacen",
                ]}
              >
                <ProductList />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <PrivateRoute
                allowedRoles={[
                  "admin",
                  "encargado-almacen",
                  "jefe-area",
                  "jefe-almacen",
                ]}
              >
                <ProductEdith />
              </PrivateRoute>
            ),
          },
          {
            path: ":id/details",
            element: (
              <PrivateRoute
                allowedRoles={[
                  "admin",
                  "encargado-almacen",
                  "jefe-area",
                  "jefe-almacen",
                ]}
              >
                <ProductDetails />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "area",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <ContentTemplate />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute allowedRoles={["admin"]}>
                <AreaList />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <PrivateRoute allowedRoles={["admin"]}>
                <AreaEdith />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "warehouse",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <ContentTemplate />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute allowedRoles={["admin"]}>
                <WarehouseList />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <PrivateRoute allowedRoles={["admin"]}>
                <WarehouseEdith />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "kardex",
        element: (
          <PrivateRoute
            allowedRoles={[
              "admin",
              "encargado-almacen",
              "trabajador",
              "jefe-area",
              "gerente-municipal",
              "jefe-almacen",
            ]}
          >
            <ContentTemplate />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute
                allowedRoles={[
                  "admin",
                  "encargado-almacen",
                  "trabajador",
                  "jefe-area",
                  "gerente-municipal",
                  "jefe-almacen",
                ]}
              >
                <KardexList />
              </PrivateRoute>
            ),
          },
          {},
        ],
      },
      {
        path: "voucher",
        element: (
          <PrivateRoute
            allowedRoles={[
              "admin",
              "encargado-almacen",
              "trabajador",
              "jefe-area",
              "gerente-municipal",
              "operador",
              "jefe-almacen",
            ]}
          >
            <ContentTemplate />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute
                allowedRoles={[
                  "admin",
                  "encargado-almacen",
                  "trabajador",
                  "jefe-area",
                  "gerente-municipal",
                  "operador",
                  "jefe-almacen",
                ]}
              >
                <VoucherList />
              </PrivateRoute>
            ),
          },
          {
            path: "create",
            element: (
              <PrivateRoute
                allowedRoles={[
                  "admin",
                  "trabajador",
                  "jefe-area",
                  "gerente-municipal",
                ]}
              >
                <CreacionVoucher />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <PrivateRoute
                allowedRoles={[
                  "admin",
                  "encargado-almacen",
                  "trabajador",
                  "jefe-area",
                  "gerente-municipal",
                  "operador",
                  "jefe-almacen",
                ]}
              >
                <VoucherPreview />
              </PrivateRoute>
            ),
          },
          {
            path: ":id/details",
            element: (
              <PrivateRoute
                allowedRoles={[
                  "admin",
                  "encargado-almacen",
                  "jefe-area",
                  "jefe-almacen",
                ]}
              >
                <VoucherDetails />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);
