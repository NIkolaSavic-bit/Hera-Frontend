import React from "react";
import "./PopupMessage.css";

interface PopupMessageProps {
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  onClose: () => void;
  type?: "success" | "error" | "info";
}

const PopupMessage: React.FC<PopupMessageProps> = ({
  message,
  onClose,
  onConfirm,
  confirmText = "OK",
  type = "success",
}) => {
  return (
    <div className="popup-overlay">
      <div className={`popup-container ${type}`}>
        <div className="popup-content">
          <div className="popup-message">{message}</div>
          <button className="popup-close-btn" onClick={onClose}>
            
          </button>
          <button
            className="popup-btn popup-btn-ok"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;
