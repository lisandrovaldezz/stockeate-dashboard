import { useContext } from "react";
import { BranchContext } from "../context/branches/BranchContext.jsx";

export function useBranches() {
  return useContext(BranchContext);
}
