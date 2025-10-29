import { useNavigate } from "react-router-dom";

/**
@param {boolean} [openModal=true]
@returns {function(string): void}
*/

export function useModalNavigation(openModal = true) {
  const navigate = useNavigate();

  const goToPage = (path) => {
    let targetPath = path;

    if (openModal) {
      if (path.includes("?")) {
        targetPath = `${path}&openModal=true`;
      } else {
        targetPath = `${path}?openModal=true`;
      }
    }

    navigate(targetPath);
  };

  return goToPage;
}
