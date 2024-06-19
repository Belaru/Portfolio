import React, { useState } from 'react';

/**
 * Functional component for selecting a year from a range.
 *
 * @component
 * @param {number} minYear - The minimum year in the selectable range.
 * @param {number} maxYear - The maximum year in the selectable range.
 * @param {Function} onChange - Callback function triggered when the selected year changes.
 * @returns {React.Element} The rendered YearSelector component.
 */
export default function YearSelector({ minYear, maxYear, onChange }) {
  const [selectedYear, setSelectedYear] = useState(maxYear);
  const years = [];

  for (let year = maxYear; year >= minYear; year--) {
    years.push(year);
  }

  const handleYearChange = (e) => {
    onChange(e.target.value);
    setSelectedYear(e.target.value);
  };

  return (
    <div>
      <label htmlFor="year-select"><b>Year</b></label>
      <select id="year-select" onChange={handleYearChange} value={selectedYear} 
        aria-label="Select a year">
        {years.map((year) => 
          <option key={year} value={year}>
            {year}
          </option>
        )}
      </select>
    </div>
  );
}

