import { ContentTemplate } from "@/components/shared/ContentTemplate";
import AppTemplate from "@/components/templates/AppTemplate";
import Login from "@/pages/auth/Login";
import { Profile } from "@/pages/auth/Profile";
import Dashboard from "@/pages/Dashboard";
import { PrivateRoute } from "@/pages/PrivateRoute";
import { ProductEdith } from "@/pages/product/ProductEdith";
import { ProductList } from "@/pages/product/ProductList";
import Unauthorized from "@/pages/Unauthorized";
import { UserEdit } from "@/pages/user/UserEdit";
import { UserList } from "@/pages/user/Userlist";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AppTemplate />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
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
          <PrivateRoute allowedRoles={["admin"]}>
            <ContentTemplate />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute allowedRoles={["admin"]}>
                <ProductList />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <PrivateRoute allowedRoles={["admin"]}>
                <ProductEdith />
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
