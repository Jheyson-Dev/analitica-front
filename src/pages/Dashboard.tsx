import {
  useAreas,
  usePendingVoucher,
  useProducts,
  useProfile,
  useUsers,
  useVouchers,
  useWarehouses,
} from "@/hooks";
import useAuthStore from "@/store/authStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSearch01Icon } from "hugeicons-react";

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { data: pendings } = usePendingVoucher();
  const { data: areas } = useAreas();
  const { data: users } = useUsers();
  const { data: products } = useProducts();
  const { data: warehouses } = useWarehouses();
  const { data: vouchers } = useVouchers();

  console.log(vouchers);
  console.log(pendings);

  const groupMovementsByArea = (areas) => {
    return areas.map((area) => {
      const inMovements =
        area?.warehouse?.Kardex?.filter((item) => item.movementType === "IN") ||
        [];
      const outMovements =
        area?.warehouse?.Kardex?.filter(
          (item) => item.movementType === "OUT"
        ) || [];
      return {
        name: area.name,
        IN: inMovements.reduce((acc, item) => acc + item.quantity, 0),
        OUT: outMovements.reduce((acc, item) => acc + item.quantity, 0),
      };
    });
  };

  const dataForChart = groupMovementsByArea(areas || []);

  // ---------------------------------------------------------------------------

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filterMovementsByDate = (areas, start, end) => {
    return areas.map((area) => {
      const inMovements =
        area.warehouse?.Kardex?.filter(
          (item) =>
            item.movementType === "IN" &&
            new Date(item.movementDate) >= new Date(start) &&
            new Date(item.movementDate) <= new Date(end)
        ) || [];
      const outMovements =
        area.warehouse?.Kardex?.filter(
          (item) =>
            item.movementType === "OUT" &&
            new Date(item.movementDate) >= new Date(start) &&
            new Date(item.movementDate) <= new Date(end)
        ) || [];
      return {
        name: area.name,
        IN: inMovements.reduce((acc, item) => acc + item.quantity, 0),
        OUT: outMovements.reduce((acc, item) => acc + item.quantity, 0),
      };
    });
  };

  const dataForDateRangeChart = filterMovementsByDate(
    areas || [],
    startDate,
    endDate
  );

  return (
    <div style={{ padding: "20px" }} className="grid grid-cols-1 gap-8">
      <div className="grid grid-cols-4 gap-8 ">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Usuarios
            </CardTitle>
            {/* {isLoading && <Skeleton className="h-5 w-[100px]" />} */}
            <UserSearch01Icon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.length}</div>
            <p className="text-xs text-muted-foreground">
              {/* +10% desde el último mes */}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Productos
            </CardTitle>
            {/* {isLoading && <Skeleton className="h-5 w-[100px]" />} */}
            <UserSearch01Icon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products?.length}</div>
            <p className="text-xs text-muted-foreground">
              {/* +10% desde el último mes */}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Areas</CardTitle>
            {/* {isLoading && <Skeleton className="h-5 w-[100px]" />} */}
            <UserSearch01Icon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{areas?.length}</div>
            <p className="text-xs text-muted-foreground">
              {/* +10% desde el último mes */}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Almacenes
            </CardTitle>
            {/* {isLoading && <Skeleton className="h-5 w-[100px]" />} */}
            <UserSearch01Icon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warehouses?.length}</div>
            <p className="text-xs text-muted-foreground">
              {/* +10% desde el último mes */}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-4" style={{ width: "100%", height: "30vh" }}>
        <h2 className="mb-4 text-xl font-semibold">Movimientos por areas</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataForChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="IN" fill="#82ca9d" />
            <Bar dataKey="OUT" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="col-span-4" style={{ width: "100%", height: "30vh" }}>
        <h2 className="mb-4 text-xl font-semibold">
          Movimientos de áreas por fechas
        </h2>
        <div className="mb-4">
          <label className="mr-2">Fecha de inicio:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label className="ml-4 mr-2">Fecha de fin:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataForDateRangeChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="IN" fill="#82ca9d" />
            <Bar dataKey="OUT" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
