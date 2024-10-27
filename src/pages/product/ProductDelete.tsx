import { FC } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "@/service/product.service";
import { toast } from "sonner";

interface Props {
  id: number;
}
export const ProductDelete: FC<Props> = ({ id }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await deleteProduct(id);
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

  const handleDelete = async () => {
    const promesa = mutation.mutateAsync();
    toast.promise(promesa, {
      loading: "Eliminando producto...",
      success: "Producto eliminado",
      error: "Error al eliminar producto",
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
            <p>Eliminar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Producto</DialogTitle>
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
