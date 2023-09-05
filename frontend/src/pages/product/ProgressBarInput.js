import React, { useState } from 'react';

function ProgressBarInput({ min, max, step, value, onChange }) {
  const [percent, setPercent] = useState(calculatePercent(value));

  function calculatePercent(value) {
    return ((value - min) / (max - min)) * 100;
  }

  function handleChange(event) {
    const clickedPercent = event.nativeEvent.offsetX / event.target.clientWidth;
    const newValue = Math.round(min + clickedPercent * (max - min) / step) * step;
    setPercent(calculatePercent(newValue));
    onChange(newValue);
  }

  return (
    <div className="progress-bar" onClick={handleChange}>
      <div className="progress" style={{ width: `${percent}%` ,backgroundColor: "red" }} />
    </div>
  );
}
export default ProgressBarInput;