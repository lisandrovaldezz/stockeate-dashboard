import { useRef, useEffect } from "react";

export function Square({ number, text, img }) {
  const h1Ref = useRef(null);

  useEffect(() => {
    const h1Element = h1Ref.current;
    const MAX_WIDTH = 200;

    if (!h1Element) return;

    h1Element.style.fontSize = "500%";

    let currentFontSize = parseFloat(
      window.getComputedStyle(h1Element).fontSize
    );
    let textWidth = h1Element.scrollWidth;

    while (textWidth > MAX_WIDTH && currentFontSize > 10) {
      currentFontSize -= 1;
      h1Element.style.fontSize = `${currentFontSize}px`;

      textWidth = h1Element.scrollWidth;
    }

    if (currentFontSize <= 10) {
      h1Element.style.fontSize = "10px";
    }
  }, [number]);

  return (
    <div className="square">
      <h1 ref={h1Ref}>{number}</h1>
      <div className="square-text">
        <img src={img} alt="icono" />
        <h4>{text}</h4>
      </div>
    </div>
  );
}
