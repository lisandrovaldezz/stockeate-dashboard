import { useState, useEffect } from "react";
import { useBranches } from "./useBranches";

/**
 * @param {function} apiFunction
 * @param {string} errorLogMessage
 * @returns {{data: Array, loading: boolean}}
 */

export function useCharts(apiFunction, errorLogMessage) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { branch } = useBranches();

  useEffect(() => {
    if (!apiFunction) return;

    async function fetchStats() {
      setLoading(true);
      try {
        const stats = await apiFunction(branch.id);
        setData(stats);
      } catch (error) {
        console.error(
          errorLogMessage || "Error al obtener estadísticas:",
          error
        );
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    if (branch?.id?.length) {
      fetchStats();
    } else if (!branch.id) {
      setData([]);
      setLoading(false);
    }
  }, [branch.id, apiFunction, errorLogMessage]);

  return { data, loading };
}
