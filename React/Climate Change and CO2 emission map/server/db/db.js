require('dotenv').config();
const dbUrl = process.env.ATLAS_URI;
const { MongoClient } = require('mongodb');
const cache = require('memory-cache');

let instance;

/**
 * A class that manages connections to a MongoDB database and provides various database operations.
 */
class DB {

  /**
   * Constructs a MongoDB database connection manager instance.
   * This constructor initializes the database connection manager, 
   * creating a new instance if one does not exist.
   * @returns {Object} An instance of the MongoDB database connection manager.
   */
  constructor() {
    if (!instance) {
      instance = this;
      this.client = new MongoClient(dbUrl);
      this.db = null;
      this.collection = null;
    }
    return instance;
  }
  
  /**
   * Asynchronously establishes a connection to a specific MongoDB database and collection.
   *
   * @param {string} dbname - The name of the database to connect to.
   * @param {string} collName - The name of the collection to connect to.
   * @returns {Promise} A promise that resolves once the connection is established.
   */
  async connect(dbname, collName) {
    if (instance.db) {
      return;
    }
    await instance.client.connect();
    instance.db = await instance.client.db(dbname);
    await instance.client.db(dbname).command({ ping: 1 });
    console.log('Successfully connected to MongoDB database ' + dbname);
    instance.collection = await instance.db.collection(collName);
  }

  /**
   * Asynchronously closes the connection to the database and releases associated resources.
   *
   * @returns {Promise} A promise that resolves once the connection is closed.
   */
  async close() {
    await instance.client.close();
    instance = null;
  }

  /**
   * Asynchronously opens a connection to a specific database and collection, 
   * and then closes the connection.
   *
   * @param {string} dbname - The name of the database to connect to.
   * @param {string} collName - The name of the collection to connect to.
   * @returns {Promise} A promise that resolves once the connection is opened and closed.
   */
  async open(dbname, collName) {
    try {
      await instance.connect(dbname, collName);
    } finally {
      await instance.close();
    }
  }

  /**
   * Asynchronously retrieves all documents from the collection.
   *
   * @returns {Promise} A promise that resolves with an array of documents, 
   * excluding the '_id' field.
   */
  async readAll() {
    //Optimize with caching
    const cachedKey = 'readAll';
    const cachedData = cache.get(cachedKey);
    if (cachedData) {
      return cachedData;
    }

    const data = await instance.collection.find({}, { _id: 0 }).toArray();

    //Cache for 1 hour
    cache.put(cachedKey, data, 3600 * 1000); 
    return data;
  }

  /**
   * Asynchronously inserts a single document into the collection.
   *
   * @param {Object} data - The document to be inserted into the collection.
   * @returns {Promise} A promise that resolves once the document is inserted.
   */
  async create(data) {
    return await instance.collection.insertOne(data);
  }

  /**
   * Asynchronously inserts multiple documents into the collection.
   *
   * @param {Array} array - An array of documents to be inserted into the collection.
   * @returns {number} The number of documents successfully inserted.
   */
  async createMany(array) {
    const result = await instance.collection.insertMany(array);
    return result.insertedCount;
  }

  /**
   * Asynchronously creates an index in the collection based on the specified index configuration.
   *
   * @param {Object} index - The index configuration object defining the index to be created.
   * @returns {Object} An object containing information about the index creation operation.
   */
  async createIndex(index) {
    const result = 
    await instance.collection.createIndex(index);
    return result;
  }

  /**
   * Asynchronously fetches temperature changes data for a number of countries of a year.
   *
   * @param {number} selectedYear - The selected year for data retrieval.
   * @param {number} numberOfCountries - Number of countries for data retrieval.
   * @param {boolean} asc - Ascending.
   * @returns {Array} Array containing the requested data of temperature changes.
   */
  async readAllTemperatureChanges(selectedYear, numberOfCountries, asc = false) {

    const cachedKey = `temperatureChanges_${selectedYear}_${numberOfCountries}_${asc}`;
    const cachedData = cache.get(cachedKey);
    if (cachedData) {
      return cachedData;
    }

    const projection = {
      country: 1,
      ISO3: 1,
      [selectedYear]: 1,
      _id: 0,
    };
    const data = await instance.collection.
      find({
        [selectedYear]: { $exists: true },
      }).
      project(projection).
      toArray();

    if (data) {
      const sortDirection = asc ? 1 : -1; 
      // 1 for ascending, -1 for descending

      data.sort((a, b) => {
        // Sort by temperature change in ascending or descending order
        const tempChangeA = a[selectedYear] || 0;
        const tempChangeB = b[selectedYear] || 0;
        return sortDirection * (tempChangeA - tempChangeB);
      });

      const formattedData = data.map((object)=>{
        return{
          'country': object.country,
          'ISO3': object.ISO3,
          'year': selectedYear,
          'temperature_change': object[selectedYear],
        };
      });

      // Cache for 1 hour
      cache.put(cachedKey, formattedData.slice(0, numberOfCountries), 3600 * 1000); 
      return formattedData.slice(0, numberOfCountries);
    } else {
      return null;
    }
  }

  /**
   * Asynchronously fetches Co2 Emission data for a number of countries of a year.
   *
   * @param {number} selectedYear - The selected year for data retrieval.
   * @param {number} numberOfCountries - Number of countries for data retrieval.
   * @param {boolean} asc - Ascending.
   * @returns {Array} Array containing the requested data of CO2 emissions.
   */
  async readAllCo2Emissions(selectedYear, numberOfCountries, asc = false) {

    const cachedKey = `co2Emissions_${selectedYear}_${numberOfCountries}_${asc}`;

    const cachedData = cache.get(cachedKey);
    if (cachedData) {
      return cachedData;
    }


    const projection = {
      country: 1,
      ISO3: 1,
      years: {
        $elemMatch: {
          year: selectedYear,
        },
      },
      _id: 0,
    };

    const data = await instance.collection.
      find({
        ISO3: { $ne: '' },
        'years.year': selectedYear,
      }).
      project(projection).
      toArray();

    if (data) {
      const sortDirection = asc ? 1 : -1; 
      // 1 for ascending, -1 for descending

      data.sort((a, b) => {
        // Sort by CO2 emissions in ascending or descending order
        const emissionsA = a.years[0].gasCo2Emmissions || 0;
        const emissionsB = b.years[0].gasCo2Emmissions || 0;
        return sortDirection * (emissionsA - emissionsB);
      });

      const formattedData = data.map((object)=>{
        return{
          'country': object.country,
          'ISO3': object.ISO3,
          'year': selectedYear,
          'gas_co2': object.years[0].gasCo2Emmissions,
          'share_global_gas_co2': object.years[0].co2GlabalSharePercentage,
        };
      });

      // Cache for 1 hour
      cache.put(cachedKey, formattedData.slice(0, numberOfCountries), 3600 * 1000); 
      return formattedData.slice(0, numberOfCountries);
    } else {
      return null;
    }
  }

  /**
   * Asynchronously fetches data for a specific country and year, combining CO2 and 
   * temperature data.
   *
   * @param {string} country - The name of the country to retrieve data for.
   * @param {number} choosedYear - The selected year for data retrieval.
   * @returns {Object} An object containing the requested data for the country and year.
   * @throws {Error} If there is an issue with data retrieval.
   */
  async readCountry(country, choosedYear){

    const cachedKey = `country_${country}_${choosedYear}`;
    const cachedData = cache.get(cachedKey);
    if (cachedData) {
      return cachedData;
    }

    //Get CO2 Data
    const projectionCO2 = {
      country: 1,
      years: {
        $elemMatch: {
          year: choosedYear,
        },
      },
      _id: 0,
    };

    const co2Data = await instance.collection.find({
      'country': country.split('_').join(' '),
      'years.year': choosedYear,
      'dataset': 'co2',
      ISO3: { $ne: '' },
    }).project(projectionCO2).toArray();
  
    //Get Temperature Data
    const temperatureData = await instance.collection.findOne({
      'country': country.split('_').join(' '),
      'dataset': 'temperature_change',
      ISO3: { $ne: '' },
    });
    
    let temperatureChangeValue = null;
    
    if (temperatureData) {
      for (const key in temperatureData) {
        if (key === choosedYear) {
          temperatureChangeValue  = temperatureData[key];
          break; 
        }
      }
    }

    const countryData = {
      'country': co2Data[0].country,
      'year': co2Data[0].years[0].year,
      'gas_co2': co2Data[0].years[0].gasCo2Emmissions,
      'share_global_gas_co2': co2Data[0].years[0].co2GlabalSharePercentage,
      'temperature_change': temperatureChangeValue
    };

    // Cache for 1 hour
    cache.put(cachedKey, countryData, 3600 * 1000); 

    return countryData;
  }


  /**
 * Asynchronously fetches data for a specific country for all available years, 
 * combining CO2 and temperature data.
 * @param {string} country - The name of the country to retrieve data for.
 * @returns {Object} An object containing the requested data for the country 
 * and all available years.
 * @throws {Error} If there is an issue with data retrieval.
 */
  async readCountryAllYears(country) {

    const cachedKey = `countryAllYears_${country}`;
    const cachedData = cache.get(cachedKey);
    if (cachedData) {
      return cachedData;
    }

    // Get CO2 Data for all years
    const projectionCO2 = {
      country: 1,
      years: 1,
      _id: 0,
    };
  
    const co2Data = await instance.collection.
      find({
        country: country,
        dataset: 'co2'
      }).
      project(projectionCO2).
      toArray();
  
    // Get Temperature Data
    const temperatureData = await instance.collection.findOne({
      'country': country,
      'dataset': 'temperature_change'
    });
  
    const countryDataAllYears = [];
  
    for (const yearEntry of co2Data[0].years) {
      const temperatureChange = temperatureData[yearEntry.year];
    
      if (temperatureChange !== undefined) {
        const countryData = {
          'country': co2Data[0].country,
          'year': yearEntry.year,
          'gas_co2': yearEntry.gasCo2Emmissions,
          'share_global_gas_co2': yearEntry.co2GlabalSharePercentage,
          'temperature_change': temperatureChange
        };
    
        countryDataAllYears.push(countryData);
      }
    }

    // Cache for 1 hour
    cache.put(cachedKey, countryDataAllYears, 3600 * 1000); 
  
    return countryDataAllYears;
  }
  
  /**
   * Asynchronously deletes multiple documents from a collection based on a specified filter.
   *
   * @param {Object} filter - The filter criteria to determine which documents to delete.
   * @returns {Object} An object containing information about the deletion operation.
   * @throws {Error} If not connected to a database.
   */
  async deleteMany(filter) {

    cache.del('readAll');

    if (!instance.db) {
      throw new Error('Not connected to a database.');
    }

    const deletionResult = await instance.collection.deleteMany(filter);

    if (deletionResult.deletedCount > 0) {
      console.log(
        `Deleted ${deletionResult.deletedCount} documents from the collection.`
      );
    } else {
      console.log('No documents found to delete.');
    }

    return deletionResult;
  }
  
  async readAllCountries() {
    const filter = {
      'country': {
        $ne: '',
        $not: {
          $regex: /[,.()-]/
        }
      }
    };
  
    const uniqueCountries = await instance.collection.distinct('country', filter);
  
    // Filter out values containing the word "country" and handle null values
    const filteredCountries = uniqueCountries.filter((country) => 
      country && !country.toLowerCase().includes('country'));

  
    const data = filteredCountries.map((country) => ({ country }));
  
    return data;
  }
  
}

module.exports = DB;
