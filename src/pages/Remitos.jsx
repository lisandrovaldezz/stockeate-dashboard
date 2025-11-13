import { useRemitos } from "../hooks/useRemitos.js";
import { useState, useMemo, useEffect } from "react";
import { RemitoDetalleModal } from "../components/RemitoDetalleModal.jsx";
import { RemitoCardSkeleton } from "../components/skeletons/RemitoCardSkeleton.jsx";
import { RemitoCard } from "../components/RemitoCard.jsx";
import { ModalAddRemito } from "../components/ModalAddRemito.jsx";
import { BackAndTitle } from "../components/BackAndTitle.jsx";
import { useSearchParams } from "react-router-dom";
import { FilterButton } from "../components/FilterButton.jsx";
import all from "../assets/all.svg";
import fileDown from "../assets/file-down.svg";
import fileUp from "../assets/file-up.svg";
import filePlus from "../assets/file-plus.svg";

export function Remitos() {
  const { remitos, loading } = useRemitos();
  const [selectedRemito, setSelectedRemito] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchParams] = useSearchParams();
  const openModal = searchParams.get("openModal");

  const filteredRemitos = useMemo(() => {
    return remitos.filter((r) => {
      const matchFilter = filter === "ALL" ? true : r.type === filter;
      const matchSearch = r.tmpNumber
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [remitos, filter, search]);

  const handleCloseModal = () => setSelectedRemito(null);

  useEffect(() => {
    if (openModal === "true") {
      setShowCreateModal(true);
    }
  }, [openModal]);

  return (
    <div className="remitos-container">
      <BackAndTitle title="Historial de remitos" href="/" />
      <div className="remitos-filters">
        <input
          type="text"
          placeholder="Buscar por número de remito..."
          value={search}
          className="remitos-search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="remitos-filters-buttons">
          <FilterButton
            text="Nuevo Remito"
            img={filePlus}
            onClick={() => setShowCreateModal(true)}
            active={false}
          />
          <FilterButton
            text="Todos"
            img={all}
            onClick={() => setFilter("ALL")}
            active={filter === "ALL"}
          />
        </div>
        <div className="remitos-filters-buttons">
          <FilterButton
            text="Entradas"
            img={fileUp}
            onClick={() => setFilter("IN")}
            active={filter === "IN"}
          />
          <FilterButton
            text="Salidas"
            img={fileDown}
            onClick={() => setFilter("OUT")}
            active={filter === "OUT"}
          />
        </div>
      </div>
      <div className="remitos-list">
        {loading ? (
          <>
            {[1, 2, 3, 4, 5].map((i) => (
              <RemitoCardSkeleton key={i} />
            ))}
          </>
        ) : filteredRemitos.length ? (
          filteredRemitos.map((remito) => (
            <RemitoCard
              key={remito.id}
              remito={remito}
              onSelect={() => setSelectedRemito(remito)}
            />
          ))
        ) : (
          <p>No se encontraron remitos.</p>
        )}
      </div>

      {selectedRemito && (
        <RemitoDetalleModal
          remito={selectedRemito}
          onClose={handleCloseModal}
        />
      )}
      {showCreateModal && (
        <ModalAddRemito onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
