import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";
import { useArea, useUsers } from "@/hooks";
import { updateArea } from "@/service/area.service";
import { Area } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { SearchDropdown } from "@/components/shared/SearchDropdownProps";

export const AreaEdith: FC = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: area, isLoading } = useArea(Number(id));
  const { data: users } = useUsers();
  console.log(users);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    // formState: { errors },
  } = useForm<Area>();

  const mutation = useMutation({
    mutationFn: async (data: Area) => {
      const response = await updateArea(Number(id), data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["areas"],
        exact: true,
      });
      navigate("/area");
    },
  });

  const onSubmit: SubmitHandler<Area> = async (data: Area) => {
    console.log(data);
    const promesa = mutation.mutateAsync(data);
    toast.promise(promesa, {
      loading: "Actualizando area...",
      success: "Area actualizado",
      error: "Error al actualizar area",
      duration: 1000,
    });
  };
  useEffect(() => {
    if (area) {
      setValue("name", area.name);
      setValue("status", area.status);
      setValue("managerId", area.managerId);
    }
  }, [area, setValue]);

  const options =
    users?.map((user) => ({
      id: user.id,
      name: `${user.name} ${user.lastname}`,
    })) || [];

  const defaultManagerId = watch("managerId"); // Aquí debes obtener el managerId de tu consulta
  const defaultManager = options?.find(
    (option) => option.id === defaultManagerId
  );

  return (
    <div>
      {isLoading && <LoadingOverlay />}

      <div className="flex justify-between p-4 text-xl font-semibold">
        User Edit
      </div>
      <div>
        {area && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerId">Encargado</Label>

              <Controller
                name="managerId"
                control={control}
                defaultValue={
                  defaultManager ? Number(defaultManager.id) : undefined
                }
                render={({ field }) => (
                  <SearchDropdown
                    items={options}
                    placeholder="manager"
                    defaultValue={defaultManager}
                    onChange={(value: any) => field.onChange(value)}
                  />
                )}
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

            <div className="flex col-span-2 gap-4">
              <Button
                className="bg-error text-foreground"
                variant={"destructive"}
                onClick={() => {
                  navigate("/area");
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
