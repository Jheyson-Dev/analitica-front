import { Loading03Icon } from "hugeicons-react";

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="text-center">
        <Loading03Icon className="w-16 h-16 animate-spin text-primary" />
        {/* <p className="mt-2 text-lg font-semibold">Cargando dashboard...</p> */}
      </div>
    </div>
  );
};
