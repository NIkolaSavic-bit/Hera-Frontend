import { useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";

interface AuthGuardProps {
  children: JSX.Element;
  requiredRole?: string;
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login", { replace: true });
    } else if (requiredRole && role !== requiredRole) {
      navigate("/login", { replace: true });
    }
  }, [navigate, requiredRole]);

  return children;
}
