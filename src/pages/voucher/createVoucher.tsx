import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { CreateVoucher, VoucherItem } from "@/types";
import { Plus, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVoucher } from "@/service";
import { toast } from "sonner";
import { useUsers } from "@/hooks";
import useAuthStore from "@/store/authStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export const CreacionVoucher = () => {
  const { control, handleSubmit, register } = useForm();
  const [items, setItems] = useState<VoucherItem[]>([
    { id: 1, description: "", quantity: "", total: "" },
  ]);

  const addItem = () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    setItems([
      ...items,
      { id: newId, description: "", quantity: "", total: "" },
    ]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof VoucherItem, value: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const { data: users } = useUsers();
  const { user } = useAuthStore();
  const filteredUsers = users?.filter(
    (u) => u?.area?.name === user?.area && u?.role?.name === "operador"
  );

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: CreateVoucher) => {
      const response = await createVoucher(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vouchers"],
        exact: true,
      });
      navigate("/voucher");
    },
  });

  const onSubmit = async (data: any) => {
    data.requesterId = user?.id;
    const promesa = mutation.mutateAsync(data);

    toast.promise(promesa, {
      loading: "Cargando....",
      success: "Voucher Creado correctamente",
      error: "Ocurrio un error al crear el voucher",
      duration: 1000,
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          VALE DE COMBUSTIBLE
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* General Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Grifo</Label>
              <Input id="address" {...register("gasStation")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" {...register("address")} />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="requestor">Solicitante</Label>
              <Input id="requestor" {...register("requesterId")} />
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="requestor">Meta</Label>
              <Input id="requestor" {...register("meta")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operatorId">Otorgado</Label>
              <Controller
                name="operatorId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar operador" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredUsers?.map((u) => (
                        <SelectItem key={u.id} value={`${u.id}`}>
                          {u.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle">Vehículo</Label>
              <Input id="vehicle" {...register("vehicle")} />
            </div>
          </div>

          {/* Dynamic Items Table */}
          <div className="my-4 border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">ITEM</TableHead>
                  <TableHead>DESCRIPCIÓN</TableHead>
                  <TableHead className="w-24 text-center">CANT</TableHead>
                  <TableHead className="w-32 text-center">TOTAL</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>
                      <Controller
                        name={`items[${index}].description`}
                        control={control}
                        defaultValue={item.description}
                        render={({ field }) => (
                          <Input
                            className="bg-transparent "
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              updateItem(
                                item.id,
                                "description",
                                e.target.value
                              );
                            }}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        name={`items[${index}].quantity`}
                        control={control}
                        defaultValue={item.quantity}
                        render={({ field }) => (
                          <Input
                            className="text-center bg-transparent"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              updateItem(item.id, "quantity", e.target.value);
                            }}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        name={`items[${index}].total`}
                        control={control}
                        defaultValue={item.total}
                        render={({ field }) => (
                          <Input
                            className="text-center bg-transparent"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              updateItem(item.id, "total", e.target.value);
                            }}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end p-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addItem}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Item
              </Button>
            </div>
          </div>

          {/* Activity Section */}
          <div className="space-y-2">
            <Label htmlFor="activity">Actividad</Label>
            <Controller
              name="activity"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Textarea id="activity" rows={3} {...field} />
              )}
            />
          </div>

          <div className="flex justify-end pt-6">
            <Button type="submit">Guardar Vale</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
