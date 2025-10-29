export function InOutBadge({ type }) {
  return (
    <span className={`in-out-badge ${type === "IN" ? "in" : "out"}`}>
      {type === "IN" ? "Entrada" : "Salida"}
    </span>
  );
}
