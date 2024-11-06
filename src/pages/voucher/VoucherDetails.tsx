import React from "react";
import { useParams } from "react-router-dom";
import { useVoucher } from "@/hooks";
import { CheckCircle2, Circle } from "lucide-react"; // Asegúrate de importar los íconos correctos

export const VoucherDetails = () => {
  const { id } = useParams();
  const { data: voucher } = useVoucher(Number(id));
  console.log(voucher);

  const steps = [
    { name: "Requester", signed: voucher?.requesterSigned },
    { name: "Immediate Boss", signed: voucher?.immediateBossSigned },
    { name: "Municipal Manager", signed: voucher?.municipalManagerSigned },
    { name: "Supply Manager", signed: voucher?.supplyManagerSigned },
    { name: "Operator", signed: voucher?.operatorSigned },
    { name: "Warehouse Manager", signed: voucher?.warehouseManagerSigned },
  ];

  const currentStepIndex = steps.findIndex((step) => !step.signed);
  const signedStepIndex = steps.filter((step) => step.signed).length;

  return (
    <div className="w-full max-w-4xl p-6 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-center">
        Voucher Approval Tracking
      </h2>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.signed
                    ? "bg-green-500 text-white"
                    : index === currentStepIndex
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.signed ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-center">
                {step.name}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  step.signed ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default VoucherDetails;
