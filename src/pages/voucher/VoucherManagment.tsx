import { FC, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { StatusIndicator } from "@/components/shared/StatusIndicator";
import {
  Edit02Icon,
  FilterHorizontalIcon,
  Search01Icon,
  UserAdd01Icon,
  ViewIcon,
} from "hugeicons-react";
import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";
import { toast } from "sonner";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useRoles } from "@/hooks";
import { useAreas } from "@/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/service";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { Voucher } from "@/types";

// Column helper for Persons type
const columnHelper = createColumnHelper<Voucher>();

interface Props {
  data: Voucher[];
}

export const VoucherManagment: FC<Props> = ({ data }) => {
  const queryClient = useQueryClient();
  // Define columns
  const columns = [
    columnHelper.accessor("gasStation", {
      header: () => <span>gasStation</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("address", {
      header: () => <span>address</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("meta", {
      header: () => <span>meta</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("operatorId", {
      header: () => <span>operatorId</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("vehicle", {
      header: () => <span>vehicle</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("aproved", {
      header: () => <span>aproved</span>,
      cell: (info) => <StatusIndicator status={info.getValue()} />,
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    // columnHelper.accessor("rol", {
    //   header: () => <span>Rol</span>,
    //   cell: (row) => <div>{row.row.original.user?.roles[0]?.rol?.name}</div>,
    //   footer: (info) => info.column.id,
    //   // enableResizing: true,
    // }),
    columnHelper.accessor("user.name", {
      header: () => <span>User</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    // columnHelper.accessor("createdAt", {
    //   header: () => <span>Created At</span>,
    //   cell: (info) => <DateFormated date={info.getValue()} />,
    //   footer: (info) => info.column.id,
    //   // enableResizing: true,
    // }),
    columnHelper.accessor("options", {
      header: () => <span>Actions</span>,
      cell: (row) => (
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                asChild
                className="flex items-center cursor-pointer"
              >
                <Link to={`/voucher/${row.row.original.id}`}>
                  <Edit02Icon size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edith</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                asChild
                className="flex items-center cursor-pointer"
              >
                <Link to={`/voucher/${row.row.original.id}/details`}>
                  <ViewIcon size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Traking</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* <UserDelete id={row.row.original.id} /> */}
        </div>
      ),
      footer: (info) => info.column.id,
      // cell: (row) => <PersonEdit id={row.row.original.id} />,
      // enableResizing: true,
    }),
  ];

  // State for filtering
  const [filtering, setFiltering] = useState("");

  // State for column visibility
  const [columnVisibility, setColumnVisibility] = useState({});

  // State for pagination
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Table hook
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
      columnVisibility,
      pagination,
    },
    onGlobalFilterChange: setFiltering,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  const navigate = useNavigate();
  return (
    <div className="p-2">
      <h1 className="mb-2 text-xl font-bold">Administración de Vouchers</h1>
      <div className="flex justify-between py-4 font-semibold text-ellipsist-xl">
        <div className="flex gap-4">
          <div className="relative w-full max-w-sm">
            <Search01Icon className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input
              type="search"
              placeholder="Buscar Voucher"
              className="pl-10"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Filter <FilterHorizontalIcon className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div>
          <Button
            variant={"default"}
            onClick={() => {
              navigate("/voucher/create");
            }}
          >
            <UserAdd01Icon className="w-4 h-4 mr-2" />
            Crear Voucher
          </Button>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: `${header.getSize()}px` }}
                    className="relative group"
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No hay datos disponibles
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center py-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
