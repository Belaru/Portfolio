const fs = require('fs');
const csv = require('csv-parser');


/**
 * Reads and parses a CSV file containing temperature change data.
 *
 * @returns {Promise} A promise that resolves with an array of parsed data from the CSV file.
 * @throws {Error} If there is an issue reading or parsing the CSV file.
 */

function readAndParseCSVTemperature(filePath) {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filePath).
      pipe(csv()).
      on('data', (row) => {
        data.push(row); 
      }).
      on('end', () => {
        resolve(data); 
      }).
      on('error', (error) => {
        console.log(error);
        reject(error); 
      });
  });
}
  
/**
   * Reads and parses a CSV file containing CO2 emission data.
   *
   * @returns {Promise} A promise that resolves with an array of parsed data from the CSV file.
   * @throws {Error} If there is an issue reading or parsing the CSV file.
   */
function readAndParseCSVCo2(filePath) {
  return new Promise((resolve, reject) => {
    const data = [];
  
    fs.createReadStream(filePath).
      pipe(
        csv({
          headers: ['country', 'year', 'ISO3', 'gasCo2Emmissions',
            'co2GlabalSharePercentage', 'dataset'],
        })
      ).
      on('data', (row) => {
        const { country, ISO3, year, gasCo2Emmissions, co2GlabalSharePercentage, dataset } = row;
        const existingCountry = data.find((item) => item.country === country && item.ISO3 === ISO3);
  
        if (existingCountry) {
          existingCountry.years.push({
            year,
            gasCo2Emmissions,
            co2GlabalSharePercentage,
          });
        } else {
          data.push({
            country,
            ISO3,
            years: [
              {
                year,
                gasCo2Emmissions,
                co2GlabalSharePercentage,
              },
            ],
            dataset,
          });
        }
      }).
      on('end', () => {
        resolve(data);
      }).
      on('error', (error) => {
        reject(error);
      });
  });
}
  
module.exports = {
  readAndParseCSVTemperature,
  readAndParseCSVCo2
};