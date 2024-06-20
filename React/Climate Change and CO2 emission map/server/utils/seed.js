
const DB = require('../db/db');
const { readAndParseCSVTemperature, readAndParseCSVCo2} = require('./dataFetchers');

/**
 * Seeds a MongoDB database with temperature change and CO2 emission data.
 *
 * This script connects to a MongoDB database, deletes existing data, 
 * and inserts new data from CSV files.
 * It also creates an index on the 'ISO3' field for efficient data retrieval.
 */
// (Disabled for testing purposes)
// eslint-disable-next-line no-unused-vars
async function seedDatabase(){
  let db;
  try {
    const db = new DB();
    await db.connect('Cluster0', 'country_temperatureChanges_co2');
    await db.deleteMany({});
    //Temperature Changes
    const dataTemperatureChange = 
              await readAndParseCSVTemperature('../server/data/temperatureChangeData.csv');
    const numTemperatureChange = await db.createMany(dataTemperatureChange);
    console.log(`Inserted ${numTemperatureChange} temperature changes`);
    //Co2
    const dataCo2 = await readAndParseCSVCo2('../server/data/co2Data.csv');
    const numCo2 = await db.createMany(dataCo2);
    console.log(`Inserted ${numCo2} Co2 data`);
    const indexResult = await db.createIndex({ ISO3: 1});
    console.log(indexResult);
  } catch (e) {
    console.error('could not seed');
    console.dir(e);
  } finally {
    if (db) {
      db.close();
    }
    process.exit();
  }

}

seedDatabase();
