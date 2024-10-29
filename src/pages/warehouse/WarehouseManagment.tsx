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
import { DateFormated } from "@/components/shared/DateFormated";
import {
  FilterHorizontalIcon,
  Search01Icon,
  UserAdd01Icon,
  ViewIcon,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { CreateWarehouse, Warehouse } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { createWarehouse } from "@/service";
import { WarehouseDelete } from "./WarehouseDelete";
import { useAreas } from "@/hooks";

// Column helper for Persons type
const columnHelper = createColumnHelper<Warehouse>();

interface Props {
  data: Warehouse[];
}

export const WarehousManagment: FC<Props> = ({ data }) => {
  const queryClient = useQueryClient();

  const columns = [
    columnHelper.accessor("name", {
      header: () => <span>Name</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("location", {
      header: () => <span>Location</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("status", {
      header: () => <span>Status</span>,
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
    columnHelper.accessor("createdAt", {
      header: () => <span>Created At</span>,
      cell: (info) => <DateFormated date={info.getValue()} />,
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
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
                <Link to={`/warehouse/${row.row.original.id}`}>
                  <ViewIcon size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <WarehouseDelete id={row.row.original.id} />
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: areas } = useAreas();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateWarehouse>();

  const mutation = useMutation({
    mutationFn: async (data: CreateWarehouse) => {
      const response = await createWarehouse(data);
      reset();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["warehouses"],
        exact: true,
      });
    },
  });
  const onSubmit: SubmitHandler<CreateWarehouse> = async (data) => {
    console.log(data);
    setIsDialogOpen(false);
    const promesa = mutation.mutateAsync(data);

    toast.promise(promesa, {
      loading: "Cargando....",
      success: "Almacen Creado correctamente",
      error: "Ocurrio un error al crear el Almacen",
      duration: 1000,
    });
  };

  return (
    // <motion.div
    //   initial={{ opacity: 0, y: -200 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.5 }}
    // >
    <div className="p-2">
      <h1 className="mb-2 text-xl font-bold">Administración de Almacenes</h1>
      <div className="flex justify-between py-4 font-semibold text-ellipsist-xl">
        <div className="flex gap-4">
          <div className="relative w-full max-w-sm">
            <Search01Icon className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input
              type="search"
              placeholder="Buscar almacen"
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant={"default"}>
                <UserAdd01Icon className="w-4 h-4 mr-2" />
                Crear Almacen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nuevo Almacen</DialogTitle>
                <DialogDescription>
                  Ingrese los detalles del nuevo almacen a crear.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && <span>Este campo es requerido</span>}
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Location
                    </Label>
                    <Textarea
                      className="resize-none"
                      rows={4}
                      id="location"
                      {...register("location", {})}
                    />
                    {errors.location && <span>Este campo es requerido</span>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="areaId" className="text-sm font-medium">
                    Área
                  </Label>
                  <Controller
                    name="areaId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar area" />
                        </SelectTrigger>
                        <SelectContent>
                          {areas &&
                            areas.map((area) => (
                              <SelectItem key={area.id} value={`${area.id}`}>
                                {area.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Crear Almacen
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
