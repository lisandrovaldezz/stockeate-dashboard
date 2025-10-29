import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Products } from "./pages/Products";
import { ProductProvider } from "./context/products/ProductProvider.jsx";
import { BranchProvider } from "./context/branches/BranchProvider.jsx";
import { RemitoProvider } from "./context/remitos/RemitoProvider.jsx";
import { BranchSelect } from "./pages/BranchSelect";
import { Remitos } from "./pages/Remitos";

function AppContent() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/branches"
          element={
            <ProtectedRoute>
              <BranchSelect />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/remitos"
          element={
            <ProtectedRoute>
              <Remitos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BranchProvider>
      <RemitoProvider>
        <ProductProvider>
          <Toaster
            toastOptions={{
              style: {
                padding: "10px",
                fontSize: "16px",
              },
              success: {
                style: {
                  background: "#78f1c9ff",
                },
              },
              error: {
                style: {
                  background: "#fc8686ff",
                  color: "#000",
                },
              },
            }}
          />
          <AppContent />
        </ProductProvider>
      </RemitoProvider>
    </BranchProvider>
  );
}
