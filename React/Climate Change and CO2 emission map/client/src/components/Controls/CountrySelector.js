import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../../utils';
/**
 * Functional component for selecting a country from a list.
 *
 * @component
 * @param {string} selected - The currently selected country.
 * @param {Function} onChange - Callback function triggered when the selected country changes.
 * @returns {React.Element} The rendered CountrySelector component.
 */
export default function CountrySelector({ selected, onChange }) {
  const [data, setData] = useState([]);

  /**
   * useEffect hook to fetch country data when the component mounts.
   */
  useEffect(() => {
    const fetchData = async() => {
      const countries = await fetchCountries();
      setData(countries);
    };

    fetchData();
  }, []);

  const handleCountryChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <select value={selected} onChange={handleCountryChange}>
        {data.map((country, index) => 
          <option key={index} value={country.country}>
            {country.country}
          </option>
        )}
      </select>
    </div>
  );
}
