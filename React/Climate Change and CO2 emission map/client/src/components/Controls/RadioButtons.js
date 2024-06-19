import React from 'react';

/**
 * Functional component for displaying a group of radio buttons.
 *
 * @component
 * @param {string[]} options - The array of radio button options.
 * @param {string} selected - The currently selected option.
 * @param {string} group - The name of the radio button group.
 * @param {Function} onChange - Callback function triggered when the selected option changes.
 * @returns {React.Element} The rendered RadioButtons component.
 */
export default function RadioButtons({ options, selected, group, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      {options.map((option) => 
        <label className="custom-button-label" key={option}>
          <input
            type="radio"
            name={group}
            value={option}
            checked={selected === option}
            onChange={handleChange}
          />
          <div className="custom-button">{option}</div>
        </label>
      )}
    </div>
  );
}
