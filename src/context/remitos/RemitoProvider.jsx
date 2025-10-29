import { RemitoContext } from "./RemitoContext.jsx";
import { useState, useEffect, useCallback } from "react";
import { api, getRemitosStats } from "../../api.js";
import { useBranches } from "../../hooks/useBranches.js";

export function RemitoProvider({ children }) {
  const [remitos, setRemitos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, inCount: 0, outCount: 0 });
  const { branch } = useBranches();

  const fetchRemitos = useCallback(async () => {
    try {
      setLoading(true);
      if (!branch.id) return;

      const res = await api.get("/remitos", {
        params: { branchId: branch.id, includeArchived: 1 },
      });

      setRemitos(res.data);
    } catch (err) {
      console.error("Error al cargar remitos:", err);
    } finally {
      setLoading(false);
    }
  }, [branch.id]);

  const fetchStats = useCallback(async () => {
    if (!branch.id) return;

    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      const data = await getRemitosStats(branch.id, year, month);
      setStats(data);
    } catch (error) {
      console.error("Error al obtener estadísticas de remitos:", error);
    }
  }, [branch.id]);

  useEffect(() => {
    fetchRemitos();
    fetchStats();
  }, [fetchRemitos, fetchStats]);

  useEffect(() => {
    if (remitos.length > 0) fetchStats();
  }, [remitos, fetchStats]);

  return (
    <RemitoContext.Provider
      value={{ remitos, setRemitos, loading, fetchRemitos, stats, fetchStats }}
    >
      {children}
    </RemitoContext.Provider>
  );
}
