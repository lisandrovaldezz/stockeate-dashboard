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
      <p>
        <strong>Fecha:</strong> {fechaFormateada}
      </p>
      <p>
        <strong>Cantidad de ítems:</strong> {remito.items.length}
        <> - - - - </>
        <strong>Total:</strong> ${total.toFixed(2)}
      </p>
      <button onClick={onSelect}>Ver detalle</button>
    </div>
  );
}
