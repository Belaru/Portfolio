import React, { useState } from 'react';
import RadioButtons from './RadioButtons';
import YearSelector from './YearSelector';
import CountrySelector from './CountrySelector';
import NumberSlider from './NumberSlider';
import './style.css';

/**
 * Functional component for controlling and displaying various options
 * related to data visualization and statistics.
 *
 * @component
 * @param {Function} yearSetter - Callback function to set the selected year.
 * @param {Function} countrySetter - Callback function to set the selected country.
 * @param {Function} viewSetter - Callback function to set the selected view.
 * @param {Function} mapSetter - Callback function to set the selected map.
 * @param {Function} sortSetter - Callback function to set the selected sorting.
 * @param {Function} numberSetter - Callback function to set the selected number.
 * @returns {React.Element} The rendered Controls component.
 */
export default function Controls({
  yearSetter,
  countrySetter,
  viewSetter,
  mapSetter,
  sortSetter,
  numberSetter,
}) {
  const viewOptions = ['Map View', 'Chart View'];
  const mapOptions = ['Climate Change', 'CO₂ Emissions'];
  const sortOptions = ['Ascending', 'Descending'];
  const [chart, setChart] = useState(viewOptions[0]);
  const [view, setView] = useState(mapOptions[0]);
  const [sort, setSort] = useState(sortOptions[1]);
  const [country, setCountry] = useState('Canada');

  const handleChartChange = (e) => {
    setChart(e);
    viewSetter(e);
  };

  const handleViewChange = (e) => {
    setView(e);
    mapSetter(e);
  };

  const handleSortChange = (e) => {
    setSort(e);
    sortSetter(e);
  };

  const handleCountryChange = (e) => {
    setCountry(e);
    countrySetter(e);
  };

  return (
    <>
      <div className="controls">
        <div className="controls-buttons">
          <p>Views</p>
          <RadioButtons
            options={viewOptions}
            selected={chart}
            group={'chartGroup'}
            onChange={handleChartChange}
          />
        </div>
        {chart === 'Chart View' ? 
          <>
            <p>Country</p>
            <CountrySelector
              selected={country}
              onChange={handleCountryChange}
            />
          </>
          : 
          <>
            <div className="controls-buttons">
              <p>Maps</p>
              <RadioButtons
                options={mapOptions}
                selected={view}
                group={'viewGroup'}
                onChange={handleViewChange}
              />
              <p>Order</p>
              <RadioButtons
                options={sortOptions}
                selected={sort}
                group={'sortGroup'}
                onChange={handleSortChange}
              />
            </div>
            <YearSelector minYear={1961} maxYear={2021} onChange={yearSetter} />
            <NumberSlider min={1} max={100} onChange={numberSetter} />
          </>
        }
      </div>
    </>
  );
}
