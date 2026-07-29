import { Route, Routes } from "react-router-dom";
import { RequireAdmin } from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Cadastro from "./pages/Cadastro";
import Landing from "./pages/Landing";
import Regulamento from "./pages/Regulamento";
import Status from "./pages/Status";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/regulamento" element={<Regulamento />} />
      <Route path="/status" element={<Status />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
      />
    </Routes>
  );
}
