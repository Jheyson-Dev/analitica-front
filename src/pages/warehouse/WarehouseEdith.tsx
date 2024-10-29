import { useAreas, useWarehouse } from "@/hooks";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Search01Icon } from "hugeicons-react";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Warehouse } from "@/types";
import { updateWarehouse } from "@/service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const WarehouseEdith: FC = () => {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const { data: warehouse, isLoading } = useWarehouse(Number(id));
  const { data: areas } = useAreas();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Warehouse>();

  const mutation = useMutation({
    mutationFn: async (data: Warehouse) => {
      const response = await updateWarehouse(Number(id), data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["warehouses"],
        exact: true,
      });
      navigate("/warehouse");
    },
  });

  const onSubmit: SubmitHandler<Warehouse> = async (data: Warehouse) => {
    console.log(data);
    const promesa = mutation.mutateAsync(data);
    toast.promise(promesa, {
      loading: "Actualizando usuario...",
      success: "Usuario actualizado",
      error: "Error al actualizar usuario",
      duration: 1000,
    });
  };
  useEffect(() => {
    if (warehouse) {
      setValue("name", warehouse?.name);
      setValue("location", warehouse?.location);
      setValue("status", warehouse?.status);
      setValue("areaId", warehouse?.areaId);
    }
  }, [warehouse, setValue]);
  return (
    <div>
      {isLoading && <LoadingOverlay />}

      <div className="flex justify-between p-4 text-xl font-semibold">
        Editar Almacen
        {/* <div className="flex gap-4">
          <div className="relative w-full max-w-sm">
            <Search01Icon className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10"
              // value={filtering}
              // onChange={(e) => setFiltering(e.target.value)}
            />
          </div>
        </div> */}
      </div>
      <div>
        {warehouse && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("location")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="areaId" className="text-left">
                Area :
              </Label>
              <Controller
                name="areaId"
                control={control}
                render={({ field }) => (
                  <div
                    className={`col-span-3 ${
                      errors.areaId
                        ? "border-error focus-visible:ring-error"
                        : ""
                    }
                      }`}
                  >
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione el area" />
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
                  </div>
                )}
              />
              {errors.areaId && (
                <p className="col-span-3 col-start-2 text-sm font-semibold text-error">
                  {errors.areaId.message}
                </p>
              )}
            </div>
            <div className="space-y-2 ">
              <Label htmlFor="status" className="flex my-2 ">
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Switch
                      id="status"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span>{field.value === true ? "Active" : "Inactive"}</span>
                  </div>
                )}
              />
            </div>
            <div className="flex col-span-2 gap-4">
              <Button
                className="bg-error text-foreground"
                variant={"destructive"}
                onClick={() => {
                  navigate("/product");
                }}
              >
                Cancel
              </Button>
              <Button className=" text-foreground" type="submit">
                Update
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
