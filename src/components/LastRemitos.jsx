import { useRemitos } from "../hooks/useRemitos.js";
import { RemitoMiniCardSkeleton } from "./skeletons/RemitoMiniCardSkeleton.jsx";
import { RemitoMiniCard } from "../components/RemitoMiniCard.jsx";
import { RemitoDetalleModal } from "../components/RemitoDetalleModal.jsx";
import { useState } from "react";

export function LastRemitos() {
  const { remitos, loading } = useRemitos();
  const [selectedRemito, setSelectedRemito] = useState(null);

  const handleCloseModal = () => setSelectedRemito(null);

  const last10Remitos = [...remitos]
    // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // creo que no es necesario
    .slice(0, 10);

  return (
    <div className="last-remitos-list">
      {loading ? (
        <>
          {[1, 2, 3, 4, 5].map((i) => (
            <RemitoMiniCardSkeleton key={i} />
          ))}
        </>
      ) : last10Remitos.length ? (
        last10Remitos.map((remito) => (
          <RemitoMiniCard
            key={remito.id}
            remito={remito}
            onSelect={() => setSelectedRemito(remito)}
          />
        ))
      ) : (
        <p>No se encontraron remitos.</p>
      )}
      {selectedRemito && (
        <RemitoDetalleModal
          remito={selectedRemito}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
