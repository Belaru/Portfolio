import React from 'react';
import './style.css';

/**
 * Functional component for displaying a story section based on selected options.
 *
 * @component
 * @param {string} order - The order (lowest or highest) of the top countries.
 * @param {string} type - The type of data (Co2 Emissions or Temperature Change).
 * @param {number|null} top - The number of top countries to display or null if no data.
 * @param {number} year - The selected year for the data.
 * @param {Array|null} topInfo - The array of country data or null if no data.
 * @param {string|null} statisticInfo - Additional information or null if no data.
 * @returns {React.Element} The rendered Story component.
 */
export default function Story({
  order,
  type,
  top,
  year,
  topInfo,
  statisticInfo,
}) {

  function formatValue(value){
    if(isNaN(value)){
      return 0;
    }
    return value;
  }
  
  return (
    <div className="story">
      <h2>Story</h2>
      <div>
        {top !== null ? 
          <>
            {type === 'CO₂ Emissions' && 
              <>
                <b>
                  Top {top} Countries in {year}
                </b>
                <br />
                <b>with {order} CO₂ gaz emission</b>
                <br />
                <b>in million tones</b>
              </>
            }
            {type === 'Climate Change' && 
              <>
                <b>
                  Top {top} Countries in {year}
                </b>
                <br />
                <b>with {order} temperature change</b>
                <br />
                <b>in Celsius</b>
              </>
            }
          </>
          : 
          <h3>Result of analysis</h3>
        }
      </div>
      <div className="story-info">
        {topInfo !== null ? 
          topInfo.map((obj, index) => 
            <p key={index}>
              {index + 1} - {obj.country} :{' '}
              {obj.temperature_change ? 
                formatValue(Number(obj.temperature_change)) : formatValue(Number(obj.gas_co2))}
            </p>
          )
          : 
          statisticInfo !== null ? 
            //Phase 3: Improve statisic story display
            <p id="statistic-info">{statisticInfo}</p>
            : null
        }
      </div>
    </div>
  );
}

