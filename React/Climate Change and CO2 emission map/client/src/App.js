import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from './components/Chart';
import MapChart from './components/Map';
import Controls from './components/Controls';
import MapLegend from './components/MapLegend';
import Story from './components/Story';
import Footer from './components/Footer';
import { fetchTopCountriesInfo } from './utils.js';

/**
 * React component representing the main application.
 *
 * @returns {JSX.Element} The JSX representation of the App component.
 * @component
 */
function App() {
  const [view, setView] = useState('Map View');
  const [year, setMapYearView] = useState('2021');
  const [mapType, setMapType] = useState('Climate Change');
  const [country, setCountry] = useState('Canada');
  const [sort, setSort] = useState('Descending');
  const [number, setNumber] = useState(15);
  const [topInfo, setTopInfo] = useState(null);
  const [statisticInfo, setStatisticInfo] = useState(correlation);

  useEffect(() => {
    const fetchData = async () => {
      const topCountriesInfo = await fetchTopCountriesInfo(
        view,
        mapType,
        year,
        sort
      );
      if(topCountriesInfo !== null){
        setTopInfo(topCountriesInfo.slice(0, number));
      }
    };
    
    fetchData();
  }, [view, mapType, year, number, sort]);

  const handleStatisticInfoChange = (e) => {
    setStatisticInfo(e);
  };

  return (
    <div className="App">
      <div className="view">
        {view === 'Map View' ? 
          <div className="map-view">
            <h1>Climate Changes & CO₂ Emissions</h1>
            <div className="map">
              <h2>{mapType} World View</h2>
              <MapChart year={year} type={mapType} />
              <MapLegend mapType={mapType} />
            </div>
          </div>
          : 
          <div className="chart-view">
            <h1>Climate Changes & CO₂ Emissions</h1>
            <h2>Country Statistics View - {country}</h2>
            <div className="chart">
              <Chart
                country={country}
                onStatisticInfoChange={handleStatisticInfoChange}
              />
            </div>
          </div>
        }
      </div>
      <div className="ui-controls">
        <Controls
          yearSetter={setMapYearView}
          countrySetter={setCountry}
          viewSetter={setView}
          mapSetter={setMapType}
          sortSetter={setSort}
          numberSetter={setNumber}
        />
        <Story
          order={sort === 'Ascending' ? 'lowest' : 'highest'}
          type={mapType}
          top={view === 'Map View' ? number : null}
          year={year}
          topInfo={view === 'Map View' ? topInfo : null}
          statisticInfo={view !== 'Map View' ? statisticInfo : null}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;

const correlation = `In this country's environmental data, we observe a clear 
correlation. Over time, both temperature and CO2 production consistently increase,
 suggesting a noteworthy connection in the country's environmental trends.`;
