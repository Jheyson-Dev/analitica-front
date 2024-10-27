import { Cancel01Icon, CheckmarkCircle01Icon } from "hugeicons-react";

interface Props {
  status: boolean;
}

export const StatusIndicator: React.FC<Props> = ({ status }) => {
  return (
    <div className="flex items-center">
      {status ? (
        <CheckmarkCircle01Icon className="w-5 h-5 text-green-500" />
      ) : (
        <Cancel01Icon className="w-5 h-5 text-red-500" />
      )}
      <span className="ml-2">{status ? "Active" : "Inactive"}</span>
    </div>
  );
};
