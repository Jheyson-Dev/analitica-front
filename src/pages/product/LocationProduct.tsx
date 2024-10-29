import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types";
import { FC } from "react";

interface Props {
  data: Product;
}

export const LocationProduct: FC<Props> = ({ data }) => {
  // const { id: productId } = useParams();
  // const queryClient = useQueryClient();
  // const [editingId, setEditingId] = useState<number | null>(null);
  // Inicialización del formulario
  // const { control, handleSubmit, setValue } = useForm<updateMinStock>();

  // const handleEdit = (id: number) => {
  //   setEditingId(id);
  // };

  // const mutation = useMutation({
  //   mutationFn: async (variables: { id: number; data: updateMinStock }) => {
  //     updateProductMinStock(variables.id, variables.data);
  //   },
  //   onSuccess: () => {
  //     setEditingId(null);
  //     queryClient.invalidateQueries({
  //       queryKey: ["product", `${productId}`],
  //       exact: true,
  //     });
  //   },
  // });

  // Función para manejar el guardado de datos
  // const handleSave = (id: number) => {
  //   handleSubmit((formData) => {
  //     setEditingId(null);
  //     const promesa = mutation.mutateAsync({ id, data: formData });
  //     // Aquí típicamente enviarías los datos actualizados a tu backend
  //     toast.promise(promesa, {
  //       loading: "Actualizando stock minimo...",
  //       success: "Stock minimo actualizado",
  //       error: "Error al actualizar stock minimo",
  //       duration: 1000,
  //     });
  //   })();
  // };

  // Función para manejar el cambio de minStock
  // const handleMinStockChange = (id: number, newMinStock: number) => {
  //   setValue("minStock", newMinStock);
  //   console.log(id, newMinStock);
  // };

  return (
    <div className="py-8">
      <div>
        <h1 className="mb-4 text-xl font-semibold">Location Product</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Almacen</TableHead>
              <TableHead>Ubicacion</TableHead>
              <TableHead>Cantidad</TableHead>
              {/* <TableHead>Min Stock</TableHead> */}
              <TableHead>Fecha Ultimo Movimiento</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.warehouse.name}</TableCell>
                <TableCell>{item.warehouse.location}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                {/* <TableCell>
              {editingId === item.id ? (
                <Controller
                  name="minStock"
                  control={control}
                  defaultValue={item.minStock}
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleMinStockChange(item.id, parseInt(e.target.value));
                      }}
                      className="w-20"
                    />
                  )}
                />
              ) : (
                item.minStock
              )}
            </TableCell> */}
                {/* <TableCell>{item.minStock}</TableCell> */}
                <TableCell>
                  {new Date(item.updatedAt).toLocaleString()}
                </TableCell>
                {/* <TableCell>
              {editingId === item.id ? (
                <Button onClick={() => handleSave(item.id)} size="sm">
                  <SaveEnergy01Icon className="w-4 h-4 mr-2" />
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => handleEdit(item.id)}
                  variant="outline"
                  size="sm"
                >
                  <Edit02Icon className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
