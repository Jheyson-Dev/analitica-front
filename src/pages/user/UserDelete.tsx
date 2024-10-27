import { deleteUser } from "@/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

//  IMPORT DE LOS COMPONENTES DE SHADCN
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Delete02Icon } from "hugeicons-react";

interface Props {
  id: number;
}

export const UserDelete: FC<Props> = ({ id }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await deleteUser(id);
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

  const handleDelete = async () => {
    const promesa = mutation.mutateAsync();
    toast.promise(promesa, {
      loading: "Eliminando usuario...",
      success: "Usuario eliminado",
      error: "Error al eliminar usuario",
      duration: 1000,
    });
  };

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="flex items-center cursor-pointer">
            <DialogTrigger>
              <Delete02Icon size={20} />
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Person</DialogTitle>
          <DialogDescription>
            Enter the details of the new user here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"secondary"} className="hover:bg-primary">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              variant={"outline"}
              className="hover:bg-error"
              onClick={handleDelete}
            >
              Eliminar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
