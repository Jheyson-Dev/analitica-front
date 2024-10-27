// src/pages/Unauthorized.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login"); // Navegar a la página anterior
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center p-6 bg-white rounded shadow-md w-80">
        <h2 className="mb-4 text-2xl">Unauthorized</h2>
        <p className="mb-4">You do not have permission to view this page.</p>
        <Button
          onClick={handleGoBack}
          className="p-2 text-white bg-blue-500 rounded"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
