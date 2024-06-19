import React, { useEffect, useState } from 'react';
import './style.css';

/**
 * Represents a legend item for CO2 data or temperature change data.
 * @typedef {Object} LegendItem
 * @property {string} color - The color associated with the legend item.
 * @property {string} label - The label describing the legend item.
 * @property {number} value - The numerical value associated with the legend item.
 */

/**
 * Array of legend items representing CO2 data.
 * @type {LegendItem[]}
 */
const legendCo2Data = [
  { color: 'white', label: 'None', value: 0},
  { color: '#6E3699', label: 'Low', value: 200},
  { color: '#431E5E', label: 'Medium', value: 500},
  { color: '#290942', label: 'High', value: 1000},
  { color: 'black', label: 'Extreme', value:2000},
];

/**
 * Array of legend items representing temperature change data.
 * @type {LegendItem[]}
 */
const legendTemperatureChangeData = [
  { color: 'blue', label: 'Negative', value: -3},
  { color: 'white', label: 'None', value: 0},
  { color: 'red', label: 'Positive', value: 3}
];

/**
 * React component for rendering a color legend based on the specified map type.
 * @component
 * @param {Object} props - The properties of the MapLegend component.
 * @param {string} props.mapType - The type of map ('Climate Change' or 'CO2') 
 * to determine the legend data.
 * @returns {JSX.Element} The rendered MapLegend component.
 */
const MapLegend = ({mapType}) => {
  /**
   * State hook for managing the legend data based on the selected map type.
   * @type {LegendItem[]}
   */
  const [legendData, setLegendData] = useState([]); 
  useEffect(() => {
    if(mapType === 'Climate Change'){
      setLegendData(legendTemperatureChangeData);
    }else{
      setLegendData(legendCo2Data);
    }
  }, [mapType]);
  return(
    <div id="map-legend">
      <b>Color Legend - {mapType === 'Climate Change' ? 
        'Temperature change' : 'CO₂ gaz emmission'}</b>
      <div id ="color-blocks-container">
        {legendData.map((item, index) => 
          <div key={index} className="legend-item">
            <div className="color-block" style={{ backgroundColor: item.color }}></div>
            <span className="legend-label">{item.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapLegend;