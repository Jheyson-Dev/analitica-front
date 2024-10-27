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
import { CreateProduct, Product } from "@/types";
import { createProduct } from "@/service/product.service";
import { Textarea } from "@/components/ui/textarea";
import { ProductDelete } from "./ProductDelete";

// Column helper for Persons type
const columnHelper = createColumnHelper<Product>();

interface Props {
  data: Product[];
}

export const ProductManagment: FC<Props> = ({ data }) => {
  const queryClient = useQueryClient();

  const columns = [
    columnHelper.accessor("name", {
      header: () => <span>Name</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("description", {
      header: () => <span>Drscription</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("price", {
      header: () => <span>Price</span>,
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
                <Link to={`/product/${row.row.original.id}`}>
                  <ViewIcon size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ProductDelete id={row.row.original.id} />
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

  const {
    register,
    handleSubmit,
    // control,
    reset,
    formState: { errors },
  } = useForm<CreateProduct>();

  const mutation = useMutation({
    mutationFn: async (data: CreateProduct) => {
      const response = await createProduct(data);
      reset();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: true,
      });
    },
  });
  const onSubmit: SubmitHandler<CreateProduct> = async (data) => {
    console.log(data);
    setIsDialogOpen(false);
    const promesa = mutation.mutateAsync(data);

    toast.promise(promesa, {
      loading: "Cargando....",
      success: "Producto Creado correctamente",
      error: "Ocurrio un error al crear el producto",
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
      <h1 className="mb-2 text-xl font-bold">Administración de Productos</h1>
      <div className="flex justify-between py-4 font-semibold text-ellipsist-xl">
        <div className="flex gap-4">
          <div className="relative w-full max-w-sm">
            <Search01Icon className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input
              type="search"
              placeholder="Buscar productos"
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
                Crear Producto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nuevo Producto</DialogTitle>
                <DialogDescription>
                  Ingrese los detalles del nuevo producto a crear.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && <span>Este campo es requerido</span>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      {...register("price", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                    {errors.price && <span>Este campo es requerido</span>}
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Descripcion
                    </Label>
                    <Textarea
                      className="resize-none"
                      rows={4}
                      id="description"
                      {...register("description", {})}
                    />
                    {errors.description && <span>Este campo es requerido</span>}
                  </div>
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
