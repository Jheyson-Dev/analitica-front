import { useProduct } from "@/hooks";
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
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Product } from "@/types";
import { updateProduct } from "@/service/product.service";

export const ProductEdith = () => {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const { data: product, isLoading } = useProduct(Number(id));
  const navigate = useNavigate();
  console.log(product);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    // formState: { errors },
  } = useForm<Product>();

  const mutation = useMutation({
    mutationFn: async (data: Product) => {
      const response = await updateProduct(Number(id), data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: true,
      });
      navigate("/product");
    },
  });

  const onSubmit: SubmitHandler<Product> = async (data: Product) => {
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
    if (product) {
      setValue("name", product?.name);
      setValue("description", product?.description);
      setValue("price", product?.price);
      setValue("status", product?.status);
    }
  }, [product, setValue]);

  return (
    <div>
      {isLoading && <LoadingOverlay />}

      <div className="flex justify-between p-4 text-xl font-semibold">
        Person Edit
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
        {product && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...register("description")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">price</Label>
              <Input
                id="price"
                type="number"
                {...register("price", { valueAsNumber: true })}
              />
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
            {/* <div className="space-y-2">
              <Label htmlFor="roleId" className="text-left">
                Rol :
              </Label>
              <Controller
                name="roleId"
                control={control}
                render={({ field }) => (
                  <div
                    className={`col-span-3 ${
                      errors.roleId
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
                        <SelectValue placeholder="Seleccione el rol" />
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
                  </div>
                )}
              />
              {errors.roleId && (
                <p className="col-span-3 col-start-2 text-sm font-semibold text-error">
                  {errors.roleId.message}
                </p>
              )}
            </div> */}

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
