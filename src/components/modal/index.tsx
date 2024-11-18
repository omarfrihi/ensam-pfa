import { ReactNode } from "react";
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          maxHeight: "80vh",
          overflow: "scroll",
          maxWidth: "80vw",
          margin: "auto",
          padding: "2%",
          border: "2px solid #000",
          borderRadius: "10px",
          boxShadow: "2px solid black",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
