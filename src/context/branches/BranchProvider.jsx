import { useEffect, useState } from "react";
import { BranchContext } from "./BranchContext.jsx";

export function BranchProvider({ children }) {
  const [branch, setBranch] = useState({
    id: null,
    name: null,
  });

  useEffect(() => {
    const storedId = localStorage.getItem("branch_id");
    const storedName = localStorage.getItem("branch_name");
    if (storedId && storedName) {
      setBranch({ id: storedId, name: storedName });
    }
  }, []);

  const selectBranch = (id, name) => {
    localStorage.setItem("branch_id", id);
    localStorage.setItem("branch_name", name);
    setBranch({ id, name });
  };

  const clearBranch = () => {
    localStorage.removeItem("branch_id");
    localStorage.removeItem("branch_name");
    setBranch({ id: null, name: null });
  };

  return (
    <BranchContext.Provider value={{ branch, selectBranch, clearBranch }}>
      {children}
    </BranchContext.Provider>
  );
}
