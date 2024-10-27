import { FC } from "react";
import { Outlet } from "react-router-dom";

export const ContentTemplate: FC = () => {
  return (
    <div className="relative p-4 border bg-background rounded-xl">
      <Outlet />
    </div>
  );
};
