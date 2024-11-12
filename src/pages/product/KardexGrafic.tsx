import { Product } from "@/types";
import { FC, useState } from "react";
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

interface Props {
  data: Product;
}

export const KardexGrafic: FC<Props> = ({ data }) => {
  const { kardex } = data;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const inMovements = kardex.filter((item) => item.movementType === "IN");
  const outMovements = kardex.filter((item) => item.movementType === "OUT");

  const dataForChart = [
    {
      name: "IN",
      quantity: inMovements.reduce((acc, item) => acc + item.quantity, 0),
    },
    {
      name: "OUT",
      quantity: outMovements.reduce((acc, item) => acc + item.quantity, 0),
    },
  ];

  const filterByDateRange = (data, start, end) => {
    return data.filter((item) => {
      const date = new Date(item.movementDate);
      return date >= new Date(start) && date <= new Date(end);
    });
  };

  const filteredMovements = filterByDateRange(kardex, startDate, endDate);

  const inMovementsByDate = filteredMovements.filter(
    (item) => item.movementType === "IN"
  );
  const outMovementsByDate = filteredMovements.filter(
    (item) => item.movementType === "OUT"
  );

  const dataForDateRangeChart = [
    {
      name: "IN",
      quantity: inMovementsByDate.reduce((acc, item) => acc + item.quantity, 0),
    },
    {
      name: "OUT",
      quantity: outMovementsByDate.reduce(
        (acc, item) => acc + item.quantity,
        0
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="max-h-72">
        <h1 className="mb-16 text-xl font-semibold">Product Movement</h1>

        <ResponsiveContainer width="100%">
          <BarChart width={400} height={300} data={dataForChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* <div className="max-h-72">
        <h1 className="mb-4 text-xl font-semibold">
          Product Movement by Date Range
        </h1>
        <div className="mb-4">
          <label className="mr-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label className="ml-4 mr-2">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <ResponsiveContainer width="100%">
          <BarChart width={400} height={300} data={dataForDateRangeChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};
