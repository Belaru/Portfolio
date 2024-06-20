/* eslint-disable no-unused-vars */

/**
 * Swagger docs
 * https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do 
 * https://swagger.io/docs/specification/data-models/data-types/
*/
const express = require('express');
const DB = require('./db/db');

const app = express();
const db = new DB();

const compression = require('compression');
app.use(compression());

app.use(express.static('../client/build', {setHeaders: (res, path) =>
  res.set(
    'Cache-Control', 'max-age=31536000'
  )
}));

app.use(express.json());

app.use(function (req, res, next){
  res.set(
    'Cache-Control', 'max-age=31536000'
  );
  next();
});



/**
 * Swagger
 */

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.1.0',
  info: {
    title: 'swaggerDefinition',
    version: '2.0',
  },
  description:
    'This is a REST API application made with Express. It retrieves data ./data/',
  license: {
    name: 'Licensed Under MIT',
    url: 'https://spdx.org/licenses/MIT.html',
  },
  contact: {
    name: 'JSONPlaceholder',
    url: 'https://jsonplaceholder.typicode.com',
  },
  servers: [
    {
      url: 'http://localhost:3085',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./app.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Server route
 *                  
*/

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve paths in server
 *     description: Informational display of server
 *     responses:
 *       200:
 *         description: List of paths in server.
 *         content:
 *           application/json:
 *             example:
 *               status: fulfilled
 *               paths: [{ temperatureChange: '/countries/temperature-change/:year/:number',
 *                      co2Emmissions: '/countries/co2-emissions/:year/:number', 
 *                      temperatureAndCo2: '/temperature-co2-statistics/:country/:year',
 *                      countryTemperatureAndCo2: '/temperature-co2-statistics/:country',
 *                      countries: '/countries' }]
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: fullfiled
 *                 paths:
 *                   type: array
 *                   description: List of paths in server.
*/
app.get('/', async (req, res) => {
  const endpoints = [
    {
      temperatureChange: '/countries/temperature-change/:year/:number',
      co2Emmissions: '/countries/co2-emissions/:year/:number',
      temperatureAndCo2: '/temperature-co2-statistics/:country/:year',
      countryTemperatureAndCo2: '/temperature-co2-statistics/:country',
      countries: '/countries',
    },
  ];
  const info = { status: 'fulfilled', paths: endpoints };
  res.send(info);
});

/*
 * Define a route to handle GET requests to the '/countries' endpoint
 */

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Retrieve all countries names and their ISO3.
 *     description: Displays all countries names and their ISO3.
 *     responses:
 *       200:
 *         description: All countries names and their ISO3.
 *         content:
 *           application/json:
 *             example:
 *               country: Anguilla
 *               paths: AIA
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                     description: country name
 *                   ISO3:
 *                     type: string
 *                     description: country's ISO3 code
 *                
*/
app.get('/countries', async (req, res) => {
  const data = await db.readAllCountries();
  res.json(data);
});

/**
 * Receive all countries names, their codes, and temperature change for a year
 */

/**
 * @swagger
 * /countries/temperature-change/{year}/{number}:
 *   get:
 *     summary: Retrieve temparature change for a number of countries, at a specific year.
 *     description: Displays temparature change for a number of countries, at a specific year.
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         description: The year for which temperature change data is requested.
 *         schema:
 *           type: string
 *       - in: path
 *         name: number
 *         required: true
 *         description: The number of countries for which temperature change data is requested.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Temparature change for a number of countries, at a specific year.
 *         content:
 *           application/json:
 *             example:
 *               country: Estonia, Rep. of
 *               ISO3: EST
 *               year: "2000"
 *               temperature_change: "2.066"
 *             schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 year:
 *                   type: string
 *                   description: temperature change in celsius
 *                 ISO3:
 *                   type: string
 *                   description: country 3 letter code
 *                 country:
 *                   type: string
 *                   description: country name
 *                 temperature_change:
 *                   type: string
 *                   description: temperature change compared to previous year
 *       400:
 *         description: Invalid number of countries or specific year request.
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Invalid Year. Data available between 1961 and 2022
 *             schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: rejected
 *               message:
 *                 type: string
 *                 description: specifies invalid input
 *       404:
 *         description: Requests can't be found in server.
 *         content:
 *           application/json:
 *             example:
 *               status: rejected
 *               message: Invalid inputs. Make sure number and year are valid.
 *             schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: rejected
 *               message:
 *                 type: string
 *                 description: request cannot be found
 *       500:
 *         description: Process error.
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Server side error. Something went wrong.
 *             schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: rejected
 *               message:
 *                 type: string
 *                 description: server side error
 *                
*/
app.get('/countries/temperature-change/:year/:number', async (req, res) => {
  try {
    const year = req.params.year;
    const NumberOfCountries = req.params.number;
    const asc = req.query.asc;

    if (!isValidYear(year)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Year. Data available between 1961 and 2022',
      });
    }

    if (!isValidNumber(NumberOfCountries)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Number of Countries. Number must be bigger than 0.',
      });
    }

    // Set a default sorting order (descending) if 'asc' is not provided
    const isAscending = asc !== undefined ? asc === 'true' : false;

    try {
      const data = await db.readAllTemperatureChanges(
        year,
        NumberOfCountries,
        isAscending
      );
      res.json(data);
    } catch (e) {
      res.send(500).json({
        status: 'error',
        message: 'Server side error. Something went wrong.',
      });
    }
  } catch (e) {
    res.status(404).json({
      status: 'rejected',
      message: 'Invalid inputs. Make sure number and year are valid.',
    });
  }
});

/**
 * Receive all countries names and CO2 emisson for a year
 */

/**
 * @swagger
 * /countries/co2-emissions/{year}/{number}:
 *   get:
 *     summary: Retrieve CO2 emission for a number of countries, at a specific year.
 *     description: Displays CO2 emission for a number of countries, at a specific year.
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         description: The year for which temperature change data is requested.
 *         schema:
 *           type: string
 *       - in: path
 *         name: number
 *         required: true
 *         description: The number of countries for which temperature change data is requested.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: CO2 emission for a number of countries, at a specific year.
 *         content:
 *           application/json:
 *             example:
 *               country: United States
 *               ISO3: USA
 *               gas_co2: "1252.332"
 *               share_global_gas_co2: "26.469"
 *             schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 country:
 *                   type: string
 *                   description: country name
 *                 ISO3:
 *                   type: string
 *                   description: country 3 letter code
 *                 years:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         year: 
 *                           type: string
 *                           description: year of observation
 *                         gas_co2: 
 *                           type: string
 *                           description: CO2 emission quantity in million tones
 *                         share_global_gas_co2: 
 *                           type: string
 *                           description: CO2 emission percentage on global share
 *       400:
 *         description: Invalid number of countries or specific year request.
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Invalid Year. Data available between 1961 and 2022
 *             schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: rejected
 *               message:
 *                 type: string
 *                 description: specifies invalid inpud
 *       404:
 *         description: Requests can't be found in server.
 *         content:
 *           application/json:
 *             example:
 *               status: rejected
 *               message: Invalid inputs. Make sure number and year are valid.
 *             schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: rejected
 *               message:
 *                 type: string
 *                 description: request cannot be found
 *       500:
 *         description: Process error.
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Server side error. Something went wrong.
 *             schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: rejected
 *               message:
 *                 type: string
 *                 description: server side error
 *                
*/
app.get('/countries/co2-emissions/:year/:number', async (req, res) => {
  try {
    const year = req.params.year;
    const NumberOfCountries = req.params.number;
    const asc = req.query.asc;

    if (!isValidYear(year)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Year. Data available between 1961 and 2022',
      });
    }

    if (!isValidNumber(NumberOfCountries)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Number of Countries. Number must be bigger than 0.',
      });
    }

    // Set a default sorting order (descending) if 'asc' is not provided
    const isAscending = asc !== undefined ? asc === 'true' : false;
    try {
      const data = await db.readAllCo2Emissions(
        year,
        NumberOfCountries,
        isAscending
      );

      res.json(data);
    } catch (e) {
      res.send(500).json({
        status: 'error',
        message: 'Server side error. Something went wrong.',
      });
    }
  } catch (e) {
    res.send(404).json({
      status: 'rejected',
      message: 'Invalid inputs. Make sure number and year are valid.',
    });
  }
});

/**
 * Handles the GET request for '/temperature-CO2-statistics/{country}/{year}'.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */

/**
 * @swagger
 * /temperature-co2-statistics/{country}/{year}:
 *   get:
 *     summary: Retrieve CO2 emission and temperature change for a country, at a specific year.
 *     description: Displays CO2 emission and temperature change for a country, at a specific year.
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         description: The country observed.
 *         schema:
 *           type: string
 *       - in: path
 *         name: year
 *         required: true
 *         description: The year observed.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: CO2 emission and temperature change for a country, at a specific year.
 *         content:
 *           application/json:
 *             example:
 *               country: Canada
 *               ISO3: CAN
 *               gas_co2: "172.817"
 *               share_global_gas_co2: "3.653"
 *               temperature_change: "1.291"
 *             schema:
 *             type: object
 *             properties:
 *               country:
 *                 type: string
 *                 description: country name
 *               year:
 *                 type: array
 *                 items:
 *               gaz_co2:
 *                 type: string
 *                 description: CO2 emission in million tones
 *               share_global_gaz_co2:
 *                 type: string
 *                 description: CO2 emission percentage in global share
 *               temperature_change:
 *                 type: string
 *                 description: temperature change in celsius
 *       400:
 *         description: Invalid country or specific year request.
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Invalid Year. Data available between 1961 and 2022
 *             schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: rejected
 *               message:
 *                 type: string
 *                 description: specifies invalid inpud
 *       404:
 *         description: Requests can't be found in server.
 *         content:
 *           application/json:
 *             example:
 *               status: rejected
 *               message: Page not found
 *             schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: rejected
 *               message:
 *                  type: string
 *                  description: request cannot be found
 *                
*/
app.get('/temperature-co2-statistics/:country/:year', async (req, res) => {
  try {
    const country = req.params.country;
    const year = req.params.year;

    if (!isValidCountry(country)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid country format',
      });
    }
    if (!isValidYear(year)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Year. Data available between 1961 and 2022',
      });
    }

    const data = await db.readCountry(country, year);

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Data is unavailable for the specified year.',
      });
    }
  } catch (e) {
    res.status(404).json({ status: 'rejected', message: 'Page not found' });
  }
});


/**
 * Handles the GET request for '/temperature-CO2-statistics/:country'.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */

/**
 * @swagger
 * /temperature-co2-statistics/{country}:
 *   get:
 *     summary: Retrieve CO2 emission and temperature change for a country.
 *     description: Displays CO2 emission and temperature change for a country.
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         description: The country observed.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CO2 emission and temperature change for a country.
 *         content:
 *           application/json:
 *             example:
 *               country: Canada
 *               ISO3: CAN
 *               gas_co2: "172.817"
 *               share_global_gas_co2: "3.653"
 *               temperature_change: "1.291"
 *             schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 country:
 *                   type: string
 *                   description: country name
 *                 year:
 *                   type: string
 *                   description: year observerd
 *                 gaz_co2:
 *                   type: string
 *                   description: CO2 gaz emission in million tones
 *                 share_global_gas_co2:
 *                   type: string
 *                   description: CO2 gaz emission percentage in global share
 *                 temperature_change:
 *                   type: string
 *                   description: temperature change in Celsius
 *       400:
 *         description: Invalid country or specific year request.
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Invalid country format
 *             schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: rejected
 *               message:
 *                 type: string
 *                 description: specifies invalid inpud
 *       404:
 *         description: Requests can't be found in server.
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Data is unavailable for the specified country 
 *                        or there is no CO2 data available.
 *             schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: rejected
 *               message:
 *                 type: string
 *                 description: request cannot be found
 *               
*/

app.get('/temperature-co2-statistics/:country', async (req, res) => {
  try {
    const country = req.params.country;

    if (!isValidCountry(country)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid country format',
      });
    }

    const data = await db.readCountryAllYears(country);

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Data is unavailable for the specified country or there is no CO2 data available.',
      });
    }
  } catch (e) {
    res.status(404).json({ status: 'rejected', message: 'Page not found' });
  }
});


/**
 * Validates the 'year' parameter to ensure it falls within a
 * specific range.
 *
 * @param {number} year - The year to be validated.
 * @returns {boolean} True if the year is valid, false otherwise.
 */
function isValidYear(year) {
  return year >= 1961 && year <= 2022;
}

/**
 * Validates the 'country' parameter to ensure it consists of letters
 * and starts with an uppercase letter.
 *
 * @param {string} country - The country name to be validated.
 * @returns {boolean} True if the country is valid, false otherwise.
 */
function isValidCountry(country) {
  const noNumbersRegex = /^[^\d]*$/;
  return typeof country === 'string' && noNumbersRegex.test(country);
}

/**
 * Validates the 'number' parameter to ensure it is bigger than 0
 *
 * @param {number} number - The number to be validated.
 * @returns {boolean} True if the number is valid, false otherwise.
 */
function isValidNumber(number) {
  return number > 0;
}

app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).send({ status: 'rejected', message: 'Page not found' });
});

module.exports = app;
