export function FilterButton({ text, onClick, img, active = false }) {
  return (
    <button
      className={`filter-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <img src={img} alt={text} title={text} />
      {text}
    </button>
  );
}
