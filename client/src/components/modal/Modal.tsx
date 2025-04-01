import { FC, ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const handleOverlayClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClose}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          X
        </span>
        {children}
      </div>
    </div>
  );
};
