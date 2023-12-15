import React, { useState } from "react";

interface PopupProps {
  message: string | null;
  onClose: () => void;
}

const Popup = ({ message, onClose }: PopupProps) => {
  const [closed, setClosed] = useState(false);

  const handleButtonClick = () => {
    console.log("Close button clicked");
    setClosed(true);
    onClose();
  };

  if (closed) {
    return null; // Don't render the popup if closed
  }

  return (
    <div className="popup-overlay" aria-label="notification message overlay">
      <div className="popup-content">
        <p className="error-message">{message}</p>
        <button className="close-button" aria-label="close button" onClick={handleButtonClick}>Close</button>
      </div>
    </div>
    );
};

export default Popup;
