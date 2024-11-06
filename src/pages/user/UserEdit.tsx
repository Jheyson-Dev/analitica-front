import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAreas, useRoles, useUser } from "@/hooks";
import { updateUser } from "@/service";
import { CreateUser, User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const UserEdit: React.FC = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: user, isLoading } = useUser(Number(id));
  const { data: roles } = useRoles();
  const { data: areas } = useAreas();
  const navigate = useNavigate();

  console.log(user);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<User>();

  const mutation = useMutation({
    mutationFn: async (data: User) => {
      const response = await updateUser(Number(id), data as CreateUser);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: true,
      });
      navigate("/user");
    },
  });

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    const promesa = mutation.mutateAsync(data);
    toast.promise(promesa, {
      loading: "Actualizando usuario...",
      success: "Usuario actualizado",
      error: "Error al actualizar usuario",
      duration: 1000,
    });
  };
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("lastname", user.lastname);
      setValue("dni", user.dni);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("status", user.status);
      setValue("roleId", user?.role?.id);
      setValue("areaId", user?.area?.id);
    }
  }, [user, setValue]);

  return (
    <div>
      {isLoading && <LoadingOverlay />}

      <div className="flex justify-between p-4 text-xl font-semibold">
        User Edit
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
        {user && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">LastName</Label>
              <Input id="lastname" {...register("lastname")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dni">Dni</Label>
              <Input id="dni" {...register("dni")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} />
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
            <div className="space-y-2">
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
            <div className="flex col-span-2 gap-4">
              <Button
                className="bg-error text-foreground"
                variant={"destructive"}
                onClick={() => {
                  navigate("/user");
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
