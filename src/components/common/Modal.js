import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  const [container] = useState(() => {
    return document.createElement("div");
  });

  useEffect(() => {
    modalRoot.appendChild(container);

    return () => {
      modalRoot.removeChild(container);
    };
  }, []);

  return createPortal(children, container);
};

export default Modal;
