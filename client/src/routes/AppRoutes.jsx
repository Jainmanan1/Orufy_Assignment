import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import OtpPage from "../pages/OtpPage";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductPage";
const ProtectedRoute=({children})=>{
    const token = localStorage.getItem("token");
    if(!token) return <Navigate to="/login" replace />;
    return children

}


const PublicRoute=({children})=>{
    const token = localStorage.getItem("token");
    if (token) return <Navigate to="/" replace />;
    return children;
}

const AppRouter=()=>{
    return (
      <BrowserRouter>
        <Routes>
          {/* Public*/}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/otp"
            element={
              <PublicRoute>
                <OtpPage />
              </PublicRoute>
            }
          />

          {/* Protect */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
}
export default AppRouter