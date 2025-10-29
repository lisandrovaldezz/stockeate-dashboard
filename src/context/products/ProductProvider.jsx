import { ProductContext } from "./ProductContext.jsx";
import { useState, useEffect, useCallback } from "react";
import { api } from "../../api.js";
import { useBranches } from "../../hooks/useBranches.js";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { branch } = useBranches();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      if (!branch.id) return;

      const res = await api.get("/products", {
        params: {
          branchId: branch.id,
          includeArchived: 1,
        },
      });

      setProducts(res.data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
    } finally {
      setLoading(false);
    }
  }, [branch.id]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, loading, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
}
