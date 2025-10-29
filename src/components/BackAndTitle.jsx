import leftArrow from "../assets/left-arrow.svg";

export function BackAndTitle({ title, href }) {
  return (
    <div className="back-and-title">
      <a href={href}>
        <img src={leftArrow} alt="Volver" />
      </a>
      <h1>{title}</h1>
    </div>
  );
}
