import { useEffect, useState } from "react";
import { api } from "../api";
import { useBranches } from "../hooks/useBranches.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BranchSelectSkeleton } from "../components/skeletons/BranchSkeleton.jsx";

export function BranchSelect() {
  const { selectBranch } = useBranches();
  const [branches, setBranches] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    if (!selected) {
      toast.error("Debes seleccionar una sucursal.");
      return;
    }
    selectBranch(selected.id, selected.name);
    toast.success(`Sucursal seleccionada: ${selected.name}`);
    navigate("/");
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
                className={`branch-select-item ${
                  selected?.id === branch.id ? "active" : ""
                }`}
                onClick={() => {
                  if (selected?.id === branch.id) {
                    setSelected(null);
                  } else {
                    setSelected(branch);
                  }
                }}
                style={{
                  transition: "all 0.2s ease",
                  border:
                    selected?.id === branch.id
                      ? "2px solid #8080b8ff"
                      : "2px solid #2a2a4e",
                  backgroundColor:
                    selected?.id === branch.id ? "#2c2c64ff" : "#2a2a4e",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ transform: "scale(1.3)" }}
                >
                  <circle cx="12" cy="12" r="10" className="circle" />
                  <path
                    d="M7 12l3 3 7-7"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="checkmark"
                  />
                </svg>
                <div className="branch-select-item-text">
                  <h2>{branch.name}</h2>
                  <p>{branch.address}</p>
                </div>
              </button>
            ))
          )}
          <button className="branch-select-continue" onClick={handleContinue}>
            {selected
              ? `Continuar con ${selected.name}`
              : "Seleccioná una sucursal"}
          </button>
        </div>
      )}
    </div>
  );
}
