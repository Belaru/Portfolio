import React, { useState } from 'react';

/**
 * Functional component for displaying a number slider input.
 *
 * @component
 * @param {number} min - The minimum value of the slider.
 * @param {number} max - The maximum value of the slider.
 * @param {Function} onChange - Callback function triggered when the slider value changes.
 * @returns {React.Element} The rendered NumberSlider component.
 */
export default function NumberSlider({ min, max, onChange }) {
  const [value, setValue] = useState(15);

  /**
   * Handles the change of the slider value.
   *
   * @function
   * @param {Object} e - The change event.
   * @returns {void}
   */
  const handleSliderChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="slider-div">
      <b>Number</b>
      <b>{value}</b> 
      <input
        className="slider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
      />
    </div>
  );
}
