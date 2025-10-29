import { useContext } from "react";
import { RemitoContext } from "../context/remitos/RemitoContext.jsx";

export function useRemitos() {
  return useContext(RemitoContext);
}
