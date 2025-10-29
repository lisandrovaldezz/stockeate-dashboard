import { useEffect, useState } from "react";
import { api } from "../api";
import { useBranches } from "../hooks/useBranches.js";
import toast from "react-hot-toast";
import { BranchSelectSkeleton } from "../components/skeletons/BranchSkeleton.jsx";

export function BranchSelect() {
  const { selectBranch } = useBranches();
  const [branches, setBranches] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await api.get("/branches");
        setBranches(data || []);
      } catch (err) {
        console.error("Error al obtener sucursales:", err);
        setError("No se pudieron cargar las sucursales.");
        toast.error("Error al cargar sucursales");
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleContinue = () => {
    if (!selected) return;
    selectBranch(selected.id, selected.name);
    toast.success(`Sucursal seleccionada: ${selected.name}`);
    window.location.href = "/";
  };

  return (
    <div className="branch-select-container">
      <h2>Elegí una sucursal</h2>

      {loading || error ? (
        <BranchSelectSkeleton />
      ) : (
        <div className="branch-select-list">
          {branches.length === 0 ? (
            <p>No hay sucursales disponibles.</p>
          ) : (
            branches.map((branch) => (
              <button
                key={branch.id}
                className="branch-select-item"
                onClick={() => setSelected(branch)}
                style={{
                  border:
                    selected?.id === branch.id
                      ? "2px solid #8080b8ff"
                      : "2px solid #2a2a4e",
                  backgroundColor:
                    selected?.id === branch.id ? "#353569ff" : "#2a2a4e",
                }}
              >
                <strong>{branch.name}</strong>
              </button>
            ))
          )}
          <button
            className="branch-select-continue"
            onClick={handleContinue}
            disabled={!selected}
          >
            {selected
              ? `Continuar con ${selected.name}`
              : "Seleccioná una sucursal"}
          </button>
        </div>
      )}
    </div>
  );
}
