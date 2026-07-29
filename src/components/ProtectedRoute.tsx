import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { isAdmin } from "../lib/firestore";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [checkingRole, setCheckingRole] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setCheckingRole(false);
      return;
    }
    isAdmin(user.uid).then((result) => {
      setAdmin(result);
      setCheckingRole(false);
    });
  }, [user, loading]);

  if (loading || checkingRole) return <FullScreenLoader />;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!admin) return <Navigate to="/admin/login?unauthorized=1" replace />;
  return <>{children}</>;
}

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center text-slate-500">
      Carregando...
    </div>
  );
}
