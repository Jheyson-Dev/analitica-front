import useAuthStore from "@/store/authStore";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user } = useAuthStore();

  console.log("Autnticado?: " + isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page
  }

  return <>{children}</>;
};
