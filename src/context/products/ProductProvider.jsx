import { ProductContext } from "./ProductContext.jsx";
import { useState, useEffect } from "react";
import { api } from "../../api.js";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const branchId = localStorage.getItem("branch_id");
      if (!branchId) return;

      const res = await api.get("/products", {
        params: {
          branchId,
          includeArchived: 1,
        },
      });

      setProducts(res.data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, loading, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
}
