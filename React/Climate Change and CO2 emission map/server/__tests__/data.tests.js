const { readAndParseCSVCo2, readAndParseCSVTemperature } = require('../utils/dataFetchers.js');

/**
 * Test co2 emissions data file loading
 */
test('It should read and parse CO2 emission data from a test CSV file', async () => {
  const filePath = './data/test/co2DataTest.csv';
  const data = await readAndParseCSVCo2(filePath);
  expect(data).toHaveLength(2);

  expect(data[1]).toEqual({
    country: 'Afghanistan',
    dataset: 'co2',
    ISO3: 'AFG',
    years: [
      {
        year: '1967',
        gasCo2Emmissions: '0.26',
        co2GlabalSharePercentage: '0.018',
      },
      {
        year: '1968',
        gasCo2Emmissions: '0.347',
        co2GlabalSharePercentage: '0.022',
      },
      {
        year: '1969',
        gasCo2Emmissions: '0',
        co2GlabalSharePercentage: '0',
      },
      {
        year: '1970',
        gasCo2Emmissions: '0.217',
        co2GlabalSharePercentage: '0.012',
      },
      {
        year: '1971',
        gasCo2Emmissions: '0.44',
        co2GlabalSharePercentage: '0.023',
      },
    ],
  });
}, 10000);

// /**
//  * Test temperature change data file loading
//  */

test('It should read and parse temperature change data from a test CSV file', async () => {
  const filePath = './data/test/temperatureChangeDataTest.csv';
  const data = await readAndParseCSVTemperature(filePath);
  expect(data).toHaveLength(5);
  expect(data).toEqual(
    [
      {
        1961: '-0.113', 
        1962: '-0.164', 
        1963: '0.847', 
        ISO2: 'AF', 
        ISO3: 'AFG', 
        Unit: 'Degree Celsius', 
        country: 'Afghanistan, Islamic Rep. of', 
        dataset: 'temperature_change'
      }, 
      {
        1961: '0.627', 
        1962: '0.326', 
        1963: '0.075', 
        ISO2: 'AL', 
        ISO3: 'ALB', 
        Unit: 'Degree Celsius', 
        country: 'Albania', 
        dataset: 'temperature_change'
      }, 
      {
        1961: '0.164', 
        1962: '0.114', 
        1963: '0.077', 
        ISO2: 'DZ', 
        ISO3: 'DZA', 
        Unit: 'Degree Celsius', 
        country: 'Algeria', 
        dataset: 'temperature_change'
      }, 
      {
        1961: '0.079', 
        1962: '-0.042', 
        1963: '0.169', 
        ISO2: 'AS', 
        ISO3: 'ASM', 
        Unit: 'Degree Celsius', 
        country: 'American Samoa', 
        dataset: 'temperature_change'
      }, 
      {
        1961: '0.736', 
        1962: '0.112', 
        1963: '-0.752', 
        ISO2: 'AD', 
        ISO3: 'AND', 
        Unit: 'Degree Celsius', 
        country: 'Andorra, Principality of', 
        dataset: 'temperature_change'
      }
    ]
  );
});