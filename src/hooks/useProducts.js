import { useContext } from "react";
import { ProductContext } from "../context/products/ProductContext.jsx";

export function useProducts() {
  return useContext(ProductContext);
}
