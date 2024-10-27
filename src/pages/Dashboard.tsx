import { useProfile } from "@/hooks";
import useAuthStore from "@/store/authStore";
import React from "react";

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { data: profile } = useProfile(Number(user?.id));

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      {user && <p>Bienvenido, {user.id}.</p>}
      {user && <p>Bienvenido, {user.role}.</p>}
      {user && <p>Bienvenido, {user.area}.</p>}
      {user && <p>Bienvenido, {String(user.status)}.</p>}
      <p>Bienvenido al panel de control.</p>
      {profile && <p>{JSON.stringify(profile, null, 2)}</p>}
    </div>
  );
};

export default Dashboard;
