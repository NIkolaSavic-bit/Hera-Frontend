import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import ReservationManagement from "./pages/ReservationManagement/ReservationManagement";
import { AuthGuard } from "./Auth/AuthGuard/AuthGuard";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employee-page" element={<ReservationManagement />} />
          <Route
            path="/employee-page"
            element={
              <AuthGuard>
                <ReservationManagement />
              </AuthGuard>
            }
          />
          <Route
            path="/admin-page"
            element={
              <AuthGuard requiredRole="Admin">
                <AdminPage />
              </AuthGuard>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
