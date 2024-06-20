/* eslint-disable camelcase */
const request = require('supertest');
const app = require('../app');
const DB = require('../db/db');

jest.mock('../db/db');

/**
 * Test server route endpoint
 */

describe('GET /', () => {
  test('It should return server endpoints info', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual(
      { status: 'fulfilled', paths: [
        {
          temperatureChange: '/countries/temperature-change/:year/:number',
          co2Emmissions: '/countries/co2-emissions/:year/:number',
          temperatureAndCo2: '/temperature-co2-statistics/:country/:year',
          countryTemperatureAndCo2: '/temperature-co2-statistics/:country',
          countries: '/countries',
        },
      ] 
      });
    expect(response.statusCode).toBe(200);

  });
});

describe('GET /countries', () => {
  test('It should return list of countries and their ISO3', async () => {
    jest.spyOn(DB.prototype, 'readAllCountries').mockResolvedValue([
      {'country':'Afghanistan, Islamic Rep. of', 'ISO3':'AFG'},
      {'country':'Albania', 'ISO3':'ALB'},
      {'country':'Algeria', 'ISO3':'DZA'}
    ]);
    const response = await request(app).get('/countries');
    expect(response.body).toEqual([
      {'country':'Afghanistan, Islamic Rep. of', 'ISO3':'AFG'},
      {'country':'Albania', 'ISO3':'ALB'},
      {'country':'Algeria', 'ISO3':'DZA'}
    ]);
    expect(response.statusCode).toBe(200);
  });
});

/**
 * Test temperature change endpoint of countries
 */

describe('GET /countries/temperature-change/:year/:number/{asc?=true} ', () => {
  test('It should return two countries', async () => {
    jest.spyOn(DB.prototype, 'readAllTemperatureChanges').mockResolvedValue([
      {
        '1995': '-0.33',
        'country': 'Iceland',
        'ISO3': 'ISL'
      },
      {
        '1995': '-0.328',
        'country': 'Greenland',
        'ISO3': 'GRL'
      }
    ]);
    const response = await request(app).get(
      '/countries/temperature-change/1995/2?asc=true'
    );
    expect(response.body).toEqual([
      {
        '1995': '-0.33',
        'country': 'Iceland',
        'ISO3': 'ISL'
      },
      {
        '1995': '-0.328',
        'country': 'Greenland',
        'ISO3': 'GRL'
      }
    ]);
    expect(response.statusCode).toBe(200);
  });

  test('It should fail', async () => {
    jest.spyOn(DB.prototype, 'readAllTemperatureChanges').mockResolvedValue({
      status: 'error',
      message: 'Invalid Year. Data available between 1961 and 2022',
    });
    const response = await request(app).get(
      '/countries/temperature-change/1000/2?asc=true'
    );
    expect(response.body).toEqual({
      status: 'error',
      message: 'Invalid Year. Data available between 1961 and 2022',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should fail', async () => {
    jest.spyOn(DB.prototype, 'readAllTemperatureChanges').mockResolvedValue({
      status: 'error',
      message: 'Invalid Number of Countries. Number must be bigger than 0.',
    });
    const response = await request(app).get(
      '/countries/temperature-change/2000/0?asc=true'
    );
    expect(response.body).toEqual({
      status: 'error',
      message: 'Invalid Number of Countries. Number must be bigger than 0.',
    });
    expect(response.statusCode).toBe(400);
  });
});

/**
 * Test CO2 emissions change of countries endpoint
 */
describe('GET /countries/co2-emissions/:year/:number/{asc?=true}', () => {
  test('It should return two countries', async () => {
    jest.spyOn(DB.prototype, 'readAllCo2Emissions').mockResolvedValue([
      {
        country: 'Aruba',
        ISO3: 'ABW',
        years: [
          {
            year: '1995',
            gas_co2: '0',
            share_global_gas_co2: '0',
          },
        ],
      },
      {
        country: 'Afghanistan',
        ISO3: 'AFG',
        years: [
          {
            year: '1995',
            gas_co2: '0.322',
            share_global_gas_co2: '0.008',
          },
        ],
      },
    ]);
    const response = await request(app).get(
      '/countries/co2-emissions/1995/2?asc=true'
    );
    expect(response.body).toEqual([
      {
        country: 'Aruba',
        ISO3: 'ABW',
        years: [
          {
            year: '1995',
            gas_co2: '0',
            share_global_gas_co2: '0',
          },
        ],
      },
      {
        country: 'Afghanistan',
        ISO3: 'AFG',
        years: [
          {
            year: '1995',
            gas_co2: '0.322',
            share_global_gas_co2: '0.008',
          },
        ],
      },
    ]);
    expect(response.statusCode).toBe(200);
  });

  test('It should fail', async () => {
    jest.spyOn(DB.prototype, 'readAllCo2Emissions').mockResolvedValue({
      status: 'error',
      message: 'Invalid Year. Data available between 1961 and 2022',
    });
    const response = await request(app).get(
      '/countries/co2-emissions/1000/2?asc=true'
    );
    expect(response.body).toEqual({
      status: 'error',
      message: 'Invalid Year. Data available between 1961 and 2022',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should fail', async () => {
    jest.spyOn(DB.prototype, 'readAllCo2Emissions').mockResolvedValue({
      status: 'error',
      message: 'Invalid Number of Countries. Number must be bigger than 0.',
    });
    const response = await request(app).get(
      '/countries/co2-emissions/2000/0?asc=true'
    );
    expect(response.body).toEqual({
      status: 'error',
      message: 'Invalid Number of Countries. Number must be bigger than 0.',
    });
    expect(response.statusCode).toBe(400);
  });
});

/**
 * Test CO2 emissions and temperature change of a country endpoint
 */
describe('GET /temperature-CO2-statistics/:country/:year', () => {
  test('It should return valid data for a valid request', async () => {
    jest.spyOn(DB.prototype, 'readCountry').mockResolvedValue({
      country: 'Armenia',
      year: '2000',
      co2_gaz: '2.565',
      share_co2_gaz: '0.054',
      temperature_change: null,
    });
    const response = await request(app).get(
      '/temperature-CO2-statistics/Armenia/2000'
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      country: 'Armenia',
      year: '2000',
      co2_gaz: '2.565',
      share_co2_gaz: '0.054',
      temperature_change: null,
    });
  });

  test('It should return an error for an invalid country name', async () => {
    const response = await request(app).get(
      '/temperature-CO2-statistics/9321/2022'
    );
      //SHOULD FAIL
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Invalid country format',
    });
  });

  test('It should return an error for an invalid year', async () => {
    const response = await request(app).get(
      '/temperature-CO2-statistics/ValidCountry/you'
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Invalid Year. Data available between 1961 and 2022',
    });
  });

  test('It should return an error for an invalid route', async () => {
    const response = await request(app).get('/invalid-route/CountryName/2022');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      status: 'rejected',
      message: 'Page not found',
    });
  });
});


/**
 * Test CO2 emissions and temperature change for all years of a country endpoint
 */
describe('GET /temperature-CO2-statistics/:country', () => {
  test('It should return valid data for a valid request', async () => {
    jest.spyOn(DB.prototype, 'readCountryAllYears').mockResolvedValue(      
      [
        {
          'country':'Canada',
          'year':'1961',
          'co2_gaz':'22.966',
          'share_co2_gaz':'2.604',
          'temperature_change':'0.057'
        },
        {
          'country':'Canada',
          'year':'1962',
          'co2_gaz':'25.978',
          'share_co2_gaz':'2.685',
          'temperature_change':'-0.118'
        },
        {
          'country':'Canada',
          'year':'1963',
          'co2_gaz':'22.365',
          'share_co2_gaz':'2.136',
          'temperature_change':'0.335'
        },
        {
          'country':'Canada',
          'year':'1964',
          'co2_gaz':'34.159', 
          'share_co2_gaz':'2.963', 
          'temperature_change':'-0.299'
        }, 
        {
          'country':'Canada', 
          'year':'1965', 
          'co2_gaz':'38.036', 
          'share_co2_gaz':'3.091', 
          'temperature_change':'-0.867'
        }, 
        {
          'country':'Canada', 
          'year':'1966', 
          'co2_gaz':'42.422', 
          'share_co2_gaz':'3.166', 
          'temperature_change':'-0.152'
        }, 
        {
          'country':'Canada', 
          'year':'1967', 
          'co2_gaz':'45.064', 
          'share_co2_gaz':'3.145', 
          'temperature_change':'-0.452'
        }, 
        {
          'country':'Canada', 
          'year':'1968', 
          'co2_gaz':'55.525', 
          'share_co2_gaz':'3.56', 
          'temperature_change':'0.476'
        }, 
        {
          'country':'Canada', 
          'year':'1969', 
          'co2_gaz':'58.298', 
          'share_co2_gaz':'3.412', 
          'temperature_change':'-0.003'
        }, 
        {
          'country':'Canada', 
          'year':'1970', 
          'co2_gaz':'62.625', 
          'share_co2_gaz':'3.497', 
          'temperature_change':'0.426'
        }
      ]);
    const response = await request(app).get(
      '/temperature-CO2-statistics/Canada'
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      [
        {
          'country':'Canada',
          'year':'1961',
          'co2_gaz':'22.966',
          'share_co2_gaz':'2.604',
          'temperature_change':'0.057'
        },
        {
          'country':'Canada',
          'year':'1962',
          'co2_gaz':'25.978',
          'share_co2_gaz':'2.685',
          'temperature_change':'-0.118'
        },
        {
          'country':'Canada',
          'year':'1963',
          'co2_gaz':'22.365',
          'share_co2_gaz':'2.136',
          'temperature_change':'0.335'
        },
        {
          'country':'Canada',
          'year':'1964',
          'co2_gaz':'34.159', 
          'share_co2_gaz':'2.963', 
          'temperature_change':'-0.299'
        }, 
        {
          'country':'Canada', 
          'year':'1965', 
          'co2_gaz':'38.036', 
          'share_co2_gaz':'3.091', 
          'temperature_change':'-0.867'
        }, 
        {
          'country':'Canada', 
          'year':'1966', 
          'co2_gaz':'42.422', 
          'share_co2_gaz':'3.166', 
          'temperature_change':'-0.152'
        }, 
        {
          'country':'Canada', 
          'year':'1967', 
          'co2_gaz':'45.064', 
          'share_co2_gaz':'3.145', 
          'temperature_change':'-0.452'
        }, 
        {
          'country':'Canada', 
          'year':'1968', 
          'co2_gaz':'55.525', 
          'share_co2_gaz':'3.56', 
          'temperature_change':'0.476'
        }, 
        {
          'country':'Canada', 
          'year':'1969', 
          'co2_gaz':'58.298', 
          'share_co2_gaz':'3.412', 
          'temperature_change':'-0.003'
        }, 
        {
          'country':'Canada', 
          'year':'1970', 
          'co2_gaz':'62.625', 
          'share_co2_gaz':'3.497', 
          'temperature_change':'0.426'
        }
      ]);
  });

  test('It should return an error for an invalid country name', async () => {
    const response = await request(app).get(
      '/temperature-CO2-statistics/9321'
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Invalid country format',
    });
  });

  test('It should return an error for an invalid route', async () => {
    const response = await request(app).get('/invalid-route/CountryName/2022');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      status: 'rejected',
      message: 'Page not found',
    });
  });
});
