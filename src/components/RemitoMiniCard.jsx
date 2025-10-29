import { InOutBadge } from "../components/InOutBadge.jsx";

export function RemitoMiniCard({ remito, onSelect }) {
  const total = remito.items.reduce(
    (acc, item) => acc + item.qty * parseFloat(item.unitPrice),
    0
  );

  const fecha = new Date(remito.createdAt);
  const fechaFormateada = fecha.toLocaleString();

  return (
    <div className="remito-mini-card">
      <div className="remito-mini-card-left">
        <h2>{remito.tmpNumber}</h2>
        <div className="remito-mini-card-info">
          <p>
            <strong>Fecha:</strong> {fechaFormateada}
          </p>
          <p>
            <strong>Cantidad de ítems:</strong> {remito.items.length}
          </p>
          <p>
            <strong>Total:</strong> ${total.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="remito-mini-card-right">
        <InOutBadge type={remito.type} />
        <button onClick={onSelect}>Ver detalle</button>
      </div>
    </div>
  );
}
