
import express from 'express';
const app = express();
const port = 5000;
import * as MetroData from './data-init.mjs';

let server = null;
const metroData = await MetroData.fetchMetroStations();
let stations = null;

if(metroData){
  server = app.listen(port);
  stations = metroData.stm_stations;
}

app.get('/', (req, res) => {
  res.send(stations);
});


/**
 * Gets random number of stations within a line if specified in range of 1 to 10
 * @returns a random list of metro station names and their coordinates
 */
app.get('/random/:number', (req, res) => {
  const quantity = req.params.number;
  const line = req.query.line;
  if(line && !['blue', 'yellow', 'green', 'orange'].includes(line)){
    res.status(404).send({'status':'rejected', 
      'message':'Line must be blue, yellow, green, or orange'});
  }
  if (Number.isInteger(Number(quantity)) && 0 < Number(quantity) && Number(quantity) <= 10) {
    const stationsInfo = getRandomStations(Number(quantity), line);
    res.send(stationsInfo);
  } else {
    res.status(404).send({'status':'rejected', 
      'message':'Number input must be in range of 1 to 10'});
  }
});

/**
 * Gets an array of random stations and their coordinates
 * @param {*} quantity - number of stations 
 * @param {*} line - metro line 
 * @returns a random list of metro station names and their coordinates
 */
function getRandomStations(quantity, line){
  const randomStations = [];
  let stationsList;
  if(line !== undefined){
    stationsList = stations[line];
  }else{
    stationsList = stations.all;
  }
  const stationsNumber = stationsList.length;
  if(stationsNumber < quantity){ 
    return stationsList;
  }
  while(randomStations.length !== quantity){
    const i = Math.floor(Math.random() * stationsNumber);
    if(!randomStations.includes(stationsList[i])){
      randomStations.push(stationsList[i]);
    }
  }
  return randomStations;
}

/**
 * Sends details on a given station name
 * @param {*} name - station name
 * @returns  name, coordinates, url and line 
 */
app.get('/details/:station', (req, res) => {
  const stationName = req.params.station;
  if(stationName){
    const stationDetails = stations.all.
      find(station => station.station_name.includes(stationName));
    if(stationDetails){
      res.send(stationDetails);
    }else {
      res.status(404).send({'status':'rejected', 
        'message':'Please give a station name. Invalid station name. Check the spelling.'});
    }
  } else {
    res.status(404).send({'status':'rejected', 'message':'Please give a station name.'});
  }
});

/**
 * @returns a list of length number of multiple-choice questions about coordinates. 
 */
app.get('/random-questions/:number', (req, res) => {
  const quantity = req.params.number;
  if (Number.isInteger(Number(quantity)) && 0 < Number(quantity)) {
    const randomQuestions = createRandomQuestions(Number(quantity));
    res.send(randomQuestions);
  } else {
    res.status(404).send({'status':'rejected', 
      'message':'Random-questions request takes an integer as parameter.'});
  }
});

/**
 * @param {*} number - number of questions
 * @returns number of random coordinates questions
 */
function createRandomQuestions(number){
  const answers = [];
  const randomQuestions = [];
  const stationsList = stations.all;
  if(stationsList.length < number){
    number = stationsList.length;
  }
  while(randomQuestions.length !== number){
    const question = {};
    const chosen3 = [];
    let answer;
    while(!answer){
      const i = Math.floor(Math.random() * stationsList.length);
      if(!answers.includes(stationsList[i])){
        answer = styleStationName(stationsList[i]);
        question['correct_answer'] = answer;
        question['coordinates'] = stationsList[i].coordinates;
        chosen3.push(answer);
        answers.push(answer);
      }
    }
    while(chosen3.length < 3){
      const i = Math.floor(Math.random() * stationsList.length);
      if(!chosen3.includes(styleStationName(stationsList[i]))){
        chosen3.push(styleStationName(stationsList[i]));
      }
    }
    // sort chosen
    const options = [];
    while(chosen3.length > 0){
      const i = Math.floor(Math.random() * chosen3.length);
      options.push(chosen3[i]);
      chosen3.splice(i, 1);
    }
    question['options'] = options;
    randomQuestions.push(question);
  }
  return randomQuestions;
}

/**
 * @param {*} station - station object
 * @returns station name with color emoji
 */
function styleStationName(station){
  let name = station.station_name;
  switch(station.line){
  case '1':
    name += ' 🟢';
    break;
  case '2':
    name += ' 🟠';
    break;
  case '4':
    name += ' 🟡';
    break;
  default:
    name += ' 🔵';
  }
  return name;
}

/** Handles 404 status */
app.use(function (req, res) {
  res.status(404).send({'status':'rejected', 'message':'Sorry can\'t find that!'});
});

app.use(function (req, res) {
  res.status(404).send({'status':'rejected', 'message':'Sorry can\'t find that!'});
});

app.use(express.static('../metro-map-client/build'));

/** Shutdown */
process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

/**
 * GET query param
*https://stackoverflow.com/questions/6912584/
how-to-get-get-query-string-variables-in-express-js-on-node-js
 */