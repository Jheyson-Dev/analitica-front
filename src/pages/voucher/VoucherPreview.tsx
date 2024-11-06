import { useVoucher } from "@/hooks";
import { useNavigate, useParams } from "react-router-dom";
import logo from "@/assets/logo-voucher.jpg";
import firma from "@/assets/firma.png";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Check, PenLine } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAuthStore from "@/store/authStore";
import { updateVoucher } from "@/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

export const VoucherPreview = () => {
  const { id } = useParams();

  const { data: voucher } = useVoucher(Number(id));
  const { user } = useAuthStore();
  console.log(user);

  console.log(voucher);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await updateVoucher(Number(id), data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["voucher", `${voucher?.id}`],
        exact: true,
      });
      navigate("/voucher");
    },
  });

  const signVoucher = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!voucher || !user) return;

    let updatedFields = {};
    switch (user.id) {
      case voucher.immediateBossId:
        updatedFields = { immediateBossSigned: true };
        break;
      case voucher.municipalManagerId:
        updatedFields = { municipalManagerSigned: true };
        break;
      case voucher.operatorId:
        updatedFields = { operatorSigned: true };
        break;
      case voucher.requesterId:
        updatedFields = { requesterSigned: true };
        break;
      case voucher.supplyManagerId:
        updatedFields = { supplyManagerSigned: true };
        break;
      case voucher.warehouseManagerId:
        updatedFields = { warehouseManagerSigned: true, aproved: true };
        break;
      default:
        console.log("User role not recognized for signing");
        return;
    }
    const promesa = mutation.mutateAsync(updatedFields);
    toast.promise(promesa, {
      loading: "Firmando documento...",
      success: "Documento firmado",
      error: "Error al firmar documento",
      duration: 1000,
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white p-8 mx-auto shadow-lg dark:bg-gray-800 dark:text-white">
      <div className="p-6 border border-gray-300 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16">
              <img
                src={logo}
                alt="Logo muncipalidad de cabanillas"
                className="rounded-full"
              />
            </div>
            <div className="text-center">
              <h1 className="text-lg font-bold">MUNICIPALIDAD DISTRITAL DE</h1>
              <h2 className="text-xl font-bold">CABANILLA</h2>
            </div>
          </div>
          <div className="text-right">
            <div className="px-4 dark:border-gray-700">
              <span className="text-lg font-bold text-red-600">
                Nº {voucher?.id?.toString().padStart(4, "0")}
              </span>
            </div>
            <div className="px-4 py-1 mt-2 border border-gray-300 dark:border-gray-700">
              <span className="font-bold">
                FECHA:{" "}
                {moment(voucher?.createdAt).subtract(10, "days").calendar()}
              </span>
            </div>
          </div>
        </div>

        <h3 className="mb-6 text-xl font-bold text-center">
          VALE DE COMBUSTIBLE
        </h3>

        {/* Form Fields */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-2">
            <span className="font-bold min-w-24">Grifo:</span>
            <span className="flex-1 border-b border-gray-400 dark:border-gray-600">
              {voucher?.gasStation}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold min-w-24">Dirección:</span>
            <span className="flex-1 border-b border-gray-400 dark:border-gray-600">
              {voucher?.address}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold min-w-24">Solicitante:</span>
            <span className="flex-1 border-b border-gray-400 dark:border-gray-600">{`${voucher?.user?.name}`}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold min-w-24">Operador:</span>
            <span className="flex-1 border-b border-gray-400 dark:border-gray-600">{`${voucher?.operador?.name}`}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold min-w-24">Meta:</span>
            <span className="flex-1 border-b border-gray-400 dark:border-gray-600">
              {voucher?.meta}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold min-w-24">Vehículo:</span>
            <span className="flex-1 border-b border-gray-400 dark:border-gray-600">
              {voucher?.vehicle}
            </span>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-6">
          <thead>
            <tr className="border border-gray-300 dark:border-gray-700">
              <th className="p-2 border border-gray-300 dark:border-gray-700">
                ITEM
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-700">
                DESCRIPCIÓN
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-700">
                CANT.
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-700">
                TOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            {voucher?.items?.map((item, index) => (
              <tr
                key={index}
                className="border border-gray-300 dark:border-gray-700"
              >
                <td className="p-2 border border-gray-300 dark:border-gray-700">
                  {index + 1 || ""}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-700">
                  {item.description || ""}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-700">
                  {item.quantity || ""}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-700">
                  {item.total || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Activity Section */}
        <div className="mb-8">
          <div className="mb-2 font-bold">ACTIVIDAD:</div>
          <div className="border-b border-gray-400 dark:border-gray-600">
            {voucher?.activity}
          </div>
        </div>

        {/* Signatures Grid */}
        <div className="grid grid-cols-2 gap-24">
          <div className="relative mt-24 text-center">
            {voucher?.requesterSigned && (
              <img
                src={firma}
                alt="Firma del Solicitante"
                className="absolute w-48 -bottom-12 left-12"
              />
            )}
            <div className="pt-2 border-t border-gray-400 dark:border-gray-600">
              SOLICITANTE
            </div>
          </div>
          <div className="relative mt-24 text-center">
            {voucher?.immediateBossSigned && (
              <img
                src={firma}
                alt="Firma del Jefe Inmediato"
                className="absolute w-48 -bottom-12 left-12"
              />
            )}
            <div className="pt-2 border-t border-gray-400 dark:border-gray-600">
              Vº Bº JEFE INMEDIATO
            </div>
          </div>
          <div className="relative text-center">
            {voucher?.supplyManagerSigned && (
              <img
                src={firma}
                alt="Firma del Gerente de Suministros"
                className="absolute w-48 -bottom-12 left-12"
              />
            )}
            <div className="pt-2 border-t border-gray-400 dark:border-gray-600">
              ABASTECIMIENTO
            </div>
          </div>
          <div className="relative text-center">
            {voucher?.municipalManagerSigned && (
              <img
                src={firma}
                alt="Firma del Gerente Municipal"
                className="absolute w-48 -bottom-12 left-12"
              />
            )}
            <div className="pt-2 border-t border-gray-400 dark:border-gray-600">
              GERENTE MUNICIPAL
            </div>
          </div>
          <div className="relative text-center">
            {voucher?.warehouseManagerSigned && (
              <img
                src={firma}
                alt="Firma del Gerente de Almacén"
                className="absolute w-48 -bottom-12 left-12"
              />
            )}
            <div className="pt-2 border-t border-gray-400 dark:border-gray-600">
              ALMACÉN
            </div>
          </div>
          <div className="relative text-center">
            {voucher?.operatorSigned && (
              <img
                src={firma}
                alt="Firma del Operador"
                className="absolute w-48 -bottom-12 left-12"
              />
            )}
            <div className="pt-2 border-t border-gray-400 dark:border-gray-600">
              OPERADOR
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default">
              <PenLine className="w-10 h-10 mr-2" />
              {user?.role === "encargado-almacen"
                ? "Aceptar Docuemnto"
                : "Firmar"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmar firma</DialogTitle>
              <DialogDescription>
                ¿Está seguro que desea firmar?
              </DialogDescription>
            </DialogHeader>

            <Button type="submit" onClick={signVoucher}>
              <Check className="w-4 h-4 mr-2" />
              Confirmar
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
