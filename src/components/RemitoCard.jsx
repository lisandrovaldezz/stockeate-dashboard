import { InOutBadge } from "../components/InOutBadge.jsx";

export function RemitoCard({ remito, onSelect }) {
  const total = remito.items.reduce(
    (acc, item) => acc + item.qty * parseFloat(item.unitPrice),
    0
  );

  const fecha = new Date(remito.createdAt);
  const fechaFormateada = fecha.toLocaleString();

  return (
    <div className="remito-card">
      <div className="remito-card-header">
        <h2>{remito.tmpNumber}</h2>
        <InOutBadge type={remito.type} />
      </div>
      <div className="remito-card-text">
        <strong>Fecha:</strong> {fechaFormateada}
      </div>
      <div className="remito-card-info remito-card-text">
        <div>
          <strong>Cantidad de ítems:</strong> {remito.items.length}
        </div>
        <div>
          <strong>Total:</strong> ${total.toFixed(2)}
        </div>
      </div>
      <button onClick={onSelect}>Ver detalle</button>
    </div>
  );
}
