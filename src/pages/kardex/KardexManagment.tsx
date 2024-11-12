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

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import {
  FilterHorizontalIcon,
  Search01Icon,
  UserAdd01Icon,
} from "hugeicons-react";
import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Controller,
  // Controller,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createKardex } from "@/service/product.service";
import { CreateKardex, Kardex, Product, Warehouse } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts, useWarehouses } from "@/hooks";
import moment from "moment";
import { SearchDropdown } from "@/components/shared/SearchDropdownProps";

// LIBRERIAS PARA LA EXPORTACION DE ARCHIVOS
import { saveAs } from "file-saver";
import Papa from "papaparse";
import * as XLSX from "xlsx";

// Column helper for Persons type
const columnHelper = createColumnHelper<Kardex>();

interface Props {
  data: Kardex[];
}

export const KardexManagment: FC<Props> = ({ data }) => {
  const queryClient = useQueryClient();

  const columns = [
    columnHelper.accessor("movementDate", {
      header: () => <span>Fecha de Movimiento</span>,
      cell: (info) => {
        return (
          <span>
            {moment(info.getValue()).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
        );
      },
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("product.name", {
      header: () => <span>Producto</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("quantity", {
      header: () => <span>Cantidad</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("movementType", {
      header: () => <span>Tipo Movimiento</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: products } = useProducts();
  const { data: warehouses } = useWarehouses();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateKardex>();

  const mutation = useMutation({
    mutationFn: async (data: CreateKardex) => {
      const response = await createKardex(data);
      reset();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kardexs"],
        exact: true,
      });
    },
  });
  const onSubmit: SubmitHandler<CreateKardex> = async (data) => {
    setIsDialogOpen(false);
    const promesa = mutation.mutateAsync(data);

    toast.promise(promesa, {
      loading: "Cargando....",
      success: "Producto Creado correctamente",
      error: (error) => {
        return `${error.response.data.message}`;
      },
      duration: 2000,
    });
  };

  const formattedProducts =
    products?.map((product: Product) => ({
      id: product.id,
      name: product.name,
    })) || [];

  const formattedWarehouses =
    warehouses?.map((warehouse: Warehouse) => ({
      id: warehouse.id,
      name: warehouse.name,
    })) || [];

  // FUNCION PARA EXPORTAR A CSV
  const exportToCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "kardex_data.csv");
  };

  // FUNCION PARA EXPORTAR A EXCEL
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kardex Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, "kardex_data.xlsx");
  };

  return (
    // <motion.div
    //   initial={{ opacity: 0, y: -200 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.5 }}
    // >
    <div className="p-2">
      <h1 className="mb-2 text-xl font-bold">Administración de Productos</h1>
      <div className="flex justify-between py-4 font-semibold text-ellipsist-xl">
        <div className="flex gap-4">
          <div className="relative w-full max-w-sm">
            <Search01Icon className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input
              type="search"
              placeholder="Buscar producto"
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
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportToCSV}>
            Exportar CSV
          </Button>
          <Button variant="outline" onClick={exportToExcel}>
            Exportar Excel
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant={"default"}>
                <UserAdd01Icon className="w-4 h-4 mr-2" />
                Crear Kardex
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nuevo Kardex</DialogTitle>
                <DialogDescription>
                  Ingrese los detalles del nuevo kardex a crear.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productId">Product</Label>
                    <Controller
                      name="productId"
                      control={control}
                      render={({ field }) => (
                        <SearchDropdown
                          {...field}
                          items={formattedProducts}
                          onChange={(id) => field.onChange(id)}
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="warehouseId">Destination Warehouse</Label>
                    <Controller
                      name="warehouseId"
                      control={control}
                      render={({ field }) => (
                        <SearchDropdown
                          {...field}
                          items={formattedWarehouses}
                          onChange={(id) => field.onChange(id)}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-sm font-medium">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      {...register("quantity", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                    {errors.quantity && <span>Este campo es requerido</span>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="movementType"
                    className="font-semibold text-md"
                  >
                    Transaction Type
                  </Label>
                  <Controller
                    name="movementType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                        // onValueChange={() => field.onChange()}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select transaction type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="IN">In</SelectItem>
                            <SelectItem value="OUT">Out</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="roleId" className="text-sm font-medium">
                    Rol
                  </Label>
                  <Controller
                    name="roleId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles &&
                            roles.map((role) => (
                              <SelectItem key={role.id} value={`${role.id}`}>
                                {role.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div> */}
                <Button type="submit" className="w-full">
                  Crear Usuario
                </Button>
              </form>
            </DialogContent>
          </Dialog>
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
    // </motion.div>
  );
};
