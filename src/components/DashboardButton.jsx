export function DashboardButton({ text, onClick, color }) {
  return (
    <button
      className="dashboard-button"
      onClick={onClick}
      style={{ background: color }}
    >
      {text}
    </button>
  );
}
