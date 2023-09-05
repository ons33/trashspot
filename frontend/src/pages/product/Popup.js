import React, { useState } from 'react';
import "./Popup.css";
function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button onClick={togglePopup}>Open Popup</button>
      {isOpen && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Popup Title</h2>
            <p>Popup content goes here.</p>
            <button onClick={togglePopup}>Close Popup</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
