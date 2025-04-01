import { FC, ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const handleOverlayClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay" onClick={handleOverlayClose}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            X
          </span>
          {children}
        </div>
      </div>
    )
  );
};
