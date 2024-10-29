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
import { WarehouseEdith } from "@/pages/warehouse/WarehouseEdith";
import { WarehouseList } from "@/pages/warehouse/WarehouseList";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute allowedRoles={["admin", "encargado-almacen", "trabajador"]}>
        <AppTemplate />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute
            allowedRoles={["admin", "encargado-almacen", "trabajador"]}
          >
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute
            allowedRoles={["admin", "encargado-almacen", "trabajador"]}
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
          <PrivateRoute allowedRoles={["admin", "encargado-almacen"]}>
            <ContentTemplate />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute allowedRoles={["admin", "encargado-almacen"]}>
                <ProductList />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <PrivateRoute allowedRoles={["admin", "encargado-almacen"]}>
                <ProductEdith />
              </PrivateRoute>
            ),
          },
          {
            path: ":id/details",
            element: (
              <PrivateRoute allowedRoles={["admin", "encargado-almacen"]}>
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
            allowedRoles={["admin", "encargado-almacen", "trabajador"]}
          >
            <ContentTemplate />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute
                allowedRoles={["admin", "encargado-almacen", "trabajador"]}
              >
                <KardexList />
              </PrivateRoute>
            ),
          },
          {},
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
