import React, { useEffect, useState } from 'react';
/*
  The following code uses the 'd3-scale' library for linear scaling.

  Source Attribution:
  - d3-scale: https://github.com/d3/d3-scale
*/
import { scaleLinear } from 'd3-scale';
/*
  The following code uses the 'react-simple-maps' library for creating interactive maps.

  Source Attribution:
  - react-simple-maps: https://github.com/zcreativelabs/react-simple-maps
*/
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup,
  Marker 
} from 'react-simple-maps';
import { getCountriesAndColor } from '../../utils';

const geoUrl = './features.json';

/**
 * Color scale for CO₂ gas emissions based on a linear scale.
 *
 * @type {function}
 */
const co2ColorScale = scaleLinear().
  domain([0, 200, 500, 1000, 2000]).
  range(['white', '#6E3699', '#431E5E', '#290942', 'black']);

/**
 * Color scale for temperature change based on a linear scale.
 *
 * @type {function}
 */  
const temperatureColorScale = scaleLinear().
  domain([-3, 0, 3]).
  range(['blue', 'white', 'red']);

/**
 * React component for rendering a map chart displaying temperature change or CO₂ emissions.
 *
 * @param {Object} props - React component props.
 * @param {string} props.year - The selected year for the map data.
 * @param {string} props.type - The selected type of data ('Temperature Change' or 'CO₂ Emissions').
 * @returns {JSX.Element} The JSX representation of the MapChart component.
 * @component
 */
const MapChart = ({year, type}) => {
  const [countryData, setCountryData] = useState([]); 
  const [hoveredCountry, setHoveredCountry] = useState(null); 
  const [onhoverValue, setHoveredValue] = useState(null);
  // Update the state with the country's name
  function handleCountryHover(geography, value){
    setHoveredCountry(geography); 
    setHoveredValue(value);
  };
  // clear state
  const handleCountryLeave = () => {
    setHoveredCountry(null); 
    setHoveredValue(null);
  };

  const colorScale = (value) => {
    if(type === 'Climate Change'){
      return temperatureColorScale(value);
    }else{
      return co2ColorScale(value);
    }
  };

  const formatDescription = (value) => {
    if(type === 'Climate Change'){
      if(value !== 'unknown'){
        value = Number(value) + ' °C';
      }
      return `Temperature change: ${value} `;
    }else{
      if(value !== 'unknown'){
        value = Number(value) + ' M tonnes';
      }
      return `CO₂ gaz emission: ${value} `;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const dataResponse = await getCountriesAndColor(year, type);
        setCountryData(dataResponse);
      } catch{
        setCountryData([]);
      }
    }
    fetchData();
    // use year picker as chnage dependency
  }, [year, type]);

  return (
    <ComposableMap width={800} height={460}
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
      
      <ZoomableGroup zoom={1}></ZoomableGroup>
      <Sphere stroke="#75746B" strokeWidth={1} />
      <Graticule stroke="#75746B" strokeWidth={0.5} />
      {countryData.length > 0 && 
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const d = countryData.find((s) => s.id === geo.id);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                stroke={'black'}
                strokeWidth={'0.3'}
                fill={d ? colorScale(d.value) : '#c2beb4'}
                onMouseEnter={() => 
                  handleCountryHover(geo, d ? 
                    formatDescription(d.value) : formatDescription('unknown'))
                }
                onMouseLeave={handleCountryLeave}
                // remove click events
                onClick={()=>{}}
              />
            );
          })
        }
      </Geographies>
      }
      {hoveredCountry && onhoverValue &&
      <Marker coordinates={[-50, -50]}>
        <rect x="0" y="0" width="250" height="50" fill="white" 
          stroke="black" strokeWidth="1" rx="5" /> 
        <text fontSize={16} x="125" y="20" textAnchor="middle" fill="black" fontWeight="bold">
          {hoveredCountry.properties.name} 
        </text> < br />
        <text fontSize={12} x="125" y="35" textAnchor="middle" fill="black">
          {onhoverValue} 
        </text>
      </Marker>
      }
      
    </ComposableMap>
  );
};

export default MapChart;
