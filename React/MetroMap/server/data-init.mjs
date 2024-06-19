

import * as fs from 'fs/promises';

/** 
 * Fetches metro stations data from geoson file
 * @returns an object with arrays of metro lines - green, orange, yellow, blue, and all
*/
export async function fetchMetroStations(){
  var metroData = {};
  let stationsData = await fs.readFile('./data/stm_arrets_sig_wgs84.geojson', 'utf-8'); 
  stationsData = JSON.parse(stationsData);
  const stations = stationsData.features.filter(station =>{
    if(station.properties.stop_url && ['1', '2', '4', '5'].includes(station.properties.route_id)){
      return true;
    }else{
      return false;
    }
  });
  const stmLines = stations.map(station =>{
    const stationLine = station.properties.route_id;
    let stationColorLine = null;
    switch(stationLine){
    case '1':
      stationColorLine = 'Green';
      break;
    case '2':
      stationColorLine = 'Orange';
      break;
    case '4':
      stationColorLine = 'Yellow';
      break;
    case '5':
      stationColorLine = 'Blue';
      break;
    default:
      break;
    } 
    return {'station_name': station.properties.stop_name, 
      'coordinates': station.geometry.coordinates,
      'line': stationLine,
      'line_color': stationColorLine,
      'url': station.properties.stop_url};
  }
  );
  metroData['stm_stations'] = sortStationsByLines(stmLines);
  return metroData;
}

/**
 * Sorts array of metro stations to different lines
 * @param {*} stations - array of metro stations
 * @returns an object of arrays of sorted stations
 */

function sortStationsByLines(stations){
  const greenLine = [];
  const orangeLine = [];
  const yellowLine = [];
  const blueLine = [];
  const allLines = [];

  stations.filter(station => {
    if(station.url !== null){
      allLines.push(station);
      switch(station.line){
      case '1':
        greenLine.push(station);
        break;
      case '2':
        orangeLine.push(station);
        break;
      case '4':
        yellowLine.push(station);
        break;
      case '5':
        blueLine.push(station);
        break;
      default:
        break;
      } 
    }
  });

  const sortedStations = {};
  sortedStations['green'] = greenLine;
  sortedStations['orange'] = orangeLine;
  sortedStations['yellow'] = yellowLine;
  sortedStations['blue'] = blueLine;
  sortedStations['all'] = allLines;
  return sortedStations;
}

