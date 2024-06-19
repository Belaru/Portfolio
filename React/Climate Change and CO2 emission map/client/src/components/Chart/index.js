import { useEffect, useState } from 'react';
/*
  The following code uses the 'recharts' library for creating responsive line charts.

  Source Attribution:
  - recharts: https://github.com/recharts/recharts
*/
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend }  
  from 'recharts';
import './style.css';
import { getStatisticInfo } from '../../utils';

/**
 * React component for rendering a chart displaying CO₂ gas emissions and temperature 
 * change over the years.
 *
 * @param {Object} props - React component props.
 * @param {string} props.country - The selected country for which to display the chart.
 * @param {string} props.onStatisticInfoChange - Used to display indo in the story.
 * @returns {JSX.Element} The JSX representation of the Chart component.
 * @component
 */
function Chart ({ country, onStatisticInfoChange }) {
  const [co2TemperatureData, setCo2TemperatureData] = useState([]);
  const [gasCo2TrendDataGraph, setGasCo2TrendDataGraph] = useState([]);
  const [temperatureChangeTrendDataGraph, setTemperatureChangeTrendDataGraph] = useState([]);

  const CustomTooltip = ({ active, payload, label, name }) => {
    if (active && payload && payload.length) {
      const value = name === 'Gas Co2 Trend' || name === 'Temperature trend'
        ? payload[0].payload.value
        : payload[0].value;

      let description = '';
            
      // Check if value is an empty string or null
      if (isNaN(value) || value === '' || value === ' ' || value === null) {
        description = 'No data available for this year';
      }else{
        description = `${name}: ${value} ${ name.includes('Temperature') ? '°C' : 'M tonnes'}`;
      }

      return (
        <div className="custom-tooltip">
          <p className="label">{`Year: ${label}`}</p>
          <p className="desc"> {description} </p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    // Get data
    async function fetchData() {
      try {
        const dataJson = await getStatisticInfo(country);
        setCo2TemperatureData(dataJson);

        // Trend Data for Graph
        const gasCo2TrendDataGraph = dataJson ? calculateTrendGraph(dataJson, 'gas_co2') : [];
        const temperatureChangeTrendDataGraph = dataJson
          ? calculateTrendGraph(dataJson, 'temperature_change')
          : [];

        setGasCo2TrendDataGraph(gasCo2TrendDataGraph);
        setTemperatureChangeTrendDataGraph(temperatureChangeTrendDataGraph);

        // Check if data is increasing
        const isIncreasingTemperature = 
          isIncreasing(temperatureChangeTrendDataGraph, 'temperature_change_trend');
        const isIncreasingCo2 = isIncreasing(gasCo2TrendDataGraph, 'gas_co2_trend' );
        
        if(isDataUnavailable(co2TemperatureData, 'gas_co2') || 
          isDataUnavailable(co2TemperatureData, 'temperature_change')){
          onStatisticInfoChange(unableCorrelationText);
        }else if (isIncreasingTemperature && isIncreasingCo2) {
          onStatisticInfoChange(correlationText);
        } else {
          onStatisticInfoChange(noCorrelationText);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, onStatisticInfoChange]);

  // Calculate domain for Y-axis based on data
  const yDomainGasCo2 = co2TemperatureData ? [
    0, 
    Math.max(...co2TemperatureData.map(entry => parseFloat(entry.gas_co2)))
  ] : [0, 100];

  const yDomainTemperatureChange = co2TemperatureData ? [
    -2.5, 
    Math.max(...co2TemperatureData.map(entry => parseFloat(entry.temperature_change)))
  ] : [-2.5, 5];

  return (
    <div className="chart-div">
      <h3>CO₂ Emissions In Million Tonnes</h3>
      {isDataUnavailable(co2TemperatureData, 'gas_co2') ? 
        <p>Data for the CO₂ emmission of this country is unavailable.</p>
        : 
        <ResponsiveContainer width="95%" height={300}>
          <LineChart data={co2TemperatureData} 
            margin={{ top: 10, right: 5, bottom: 10, left: 25 }}>
            <Line yAxisId="left" type="monotone" dataKey="gas_co2" 
              name="Gas Co2" stroke="#914307" />

            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="gas_co2_trend" 
              name="Gas Co2 Trend" 
              stroke="#000080" 
              strokeWidth={2} 
              data={gasCo2TrendDataGraph} 
              dot={false} 
              active={false} 
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="year"/>
            <YAxis yAxisId="left" axis dataKey="gas_co2" domain={yDomainGasCo2}/>
            <YAxis yAxisId="right" orientation="right" dataKey="gas_co2_trend" hide={true}/>
            <Tooltip content={<CustomTooltip name="Gas Co2"> </CustomTooltip>}/>
            <Legend iconSize={20} wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
          </LineChart>
        </ResponsiveContainer>
      }

      <h3>Temperature Change in °C</h3>
      {isDataUnavailable(co2TemperatureData, 'temperature_change') ? 
        <p>Data for the temperature change of this country is unavailable.</p>
        : 
        <ResponsiveContainer width="95%" height={300}>
          <LineChart data={co2TemperatureData}
            margin={{ top: 10, right: 5, bottom: 10, left: 25 }}>
            <Line yAxisId="left" type="monotone" dataKey="temperature_change" 
              name="Temperature Change" stroke="#914307" />
            
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="temperature_change_trend" 
              name="Temperature Change trend" 
              stroke="#000080" 
              strokeWidth={2} 
              dot={false} 
              data={temperatureChangeTrendDataGraph} 
              active={false} />

            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="year"/>
            <YAxis yAxisId="left" axis dataKey="temperature_change" 
              domain={yDomainTemperatureChange}/>
            <YAxis yAxisId="right" orientation="right" 
              dataKey="temperature_change_trend" hide={true}/>
            <Tooltip content={<CustomTooltip name="Temperature Change"> </CustomTooltip>}/>
            <Legend iconSize={20} wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
          </LineChart>
        </ResponsiveContainer>
      }
    </div>
  );
};

export default Chart;

function isIncreasing(data, dataKey) {
  const firstValue = data[0][dataKey];
  const lastValue = data[data.length - 1][dataKey];
  return firstValue < lastValue;
}

function isDataUnavailable(data, dataKey) {
  if (!data) {
    return true; 
  }
  let unavailableData = 0;
  let numberOfEntries = 0;
  data.every(entry => {
    numberOfEntries++;
    if (entry[dataKey] === '') {
      unavailableData++;
    }
    return null;
  });

  return unavailableData === numberOfEntries;
}

function calculateTrendGraph(data, dataKey) {
  const years = data.map(entry => parseFloat(entry.year));
  const values = data.map(entry => parseFloat(entry[dataKey]));

  const valuesWithZero = values.map(value =>
    isNaN(value) || value === '' || value === ' ' || value === null ? 0 : value
  );

  const n = years.length;
  const xSum = years.reduce((acc, year) => acc + year, 0);
  const ySum = valuesWithZero.reduce((acc, value) => acc + value, 0);
  const xySum = years.reduce((acc, year, index) => acc + year * valuesWithZero[index], 0);
  const xSquaredSum = years.reduce((acc, year) => acc + year ** 2, 0);

  const m = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum ** 2);
  const b = (ySum - m * xSum) / n;

  const trendLine = data.map(entry => (
    { year: entry.year, [`${dataKey}_trend`]: parseFloat(m * parseFloat(entry.year) + b) }
  ));

  return trendLine;
}

const correlationText = `In this country's environmental data, we observe a clear 
correlation. Over time, both temperature and CO₂ production consistently increase,
 suggesting a noteworthy connection in the country's environmental trends.`;

const noCorrelationText = `Looking at this country's environment, we see no clear connection 
between temperature changes and CO₂ production. Unlike correlated patterns, temperature doesn't 
consistently go up or down, and CO₂ production shows random fluctuations. This suggests no strong 
link—changes in temperature don't consistently match shifts in CO₂ production.`;

const unableCorrelationText = `Unfortunately, some environmental data for this country is 
unavailable. It appears that information is not present. Due to this missing data, we can't 
establish an analysis of the country's environmental trends for those specific periods.`;
