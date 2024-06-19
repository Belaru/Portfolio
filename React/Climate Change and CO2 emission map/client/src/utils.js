/**
 * Handles data fetch based on selected view and map options.
 *
 * @async
 * @function
 * @param {string} view - Selected view option.
 * @param {string} map - Selected map option.
 * @returns {void}
 */
export const fetchTopCountriesInfo = async (view, map, year, sort) => {
  const asc = sort === 'Ascending' ? true : false;
  const array = [];

  const item = `${map} Top Countries ${year} ${sort}`;

  //Use data from local storage to display top countries if it exists
  if (localStorage.getItem(item) !== null) {
    const results = JSON.parse(localStorage.getItem(item));
    return results;
  }

  let response;

  if (view === 'Map View' && map === 'Climate Change') {
    response = await fetch(
      `/countries/temperature-change/${year}/100?asc=${asc}`
    );
  } else if (view === 'Map View' && map === 'CO₂ Emissions') {
    response = await fetch(`/countries/co2-emissions/${year}/100?asc=${asc}`);
  } else {
    return null;
  }

  if (response.ok) {
    const data = await response.json();

    localStorage.setItem(item, JSON.stringify(data));

    if (data && data.length > 0) {
      data.forEach((obj) => {
        if (obj.temperature_change !== undefined) {
          array.push({
            country: obj.country,
            ISO3: obj.ISO3,
            year: obj.year,
            temperature_change: obj.temperature_change,
          });
        } else if (obj.gas_co2 !== undefined) {
          array.push({
            country: obj.country,
            ISO3: obj.ISO3,
            year: obj.year,
            gas_co2: obj.gas_co2,
          });
        }
      });
    }
  }

  return array;
};

/**
 * Fetches countries' data from the server.
 *
 * @async
 * @function
 * @returns {Promise<Array>} An array of country data.
 */
export const fetchCountries = async () => {
  
  const item = `Temperature Change Co2 Countries`;

  if (localStorage.getItem(item) !== null) {
    const results = JSON.parse(localStorage.getItem(item));
    return results;
  }

  const response = await fetch('/countries');
  const data = await response.json();
  localStorage.setItem(item, JSON.stringify(data));

  return data;
};

/**
 * Fetches countries' data and corresponding color values based on the selected type.
 *
 * @async
 * @function
 * @param {string} year - The year for which data is fetched.
 * @param {string} type - The type of data to fetch ('Temperature Change' or 'CO₂ Emissions').
 * @returns {Promise<Array>} An array of objects containing country data and color values.
 */  
export async function getCountriesAndColor(year, type){

  const item = `${type} Countries Color ${year}`;

  if (localStorage.getItem(item) !== null) {
    const results = JSON.parse(localStorage.getItem(item));
    return results;
  }

  let fetchedCountries;
  if(type === 'Climate Change'){
    fetchedCountries = await fetch(`/countries/temperature-change/${year}/225`);
    const data = await fetchedCountries.json();
    const countries = data.map((country) =>{
      const iso3Code = country.ISO3;
      const colorValue = country.temperature_change;
      return {id: iso3Code, value: colorValue};
    });
    
    localStorage.setItem(item, JSON.stringify(countries));
    return countries;

  }else{
    fetchedCountries = await fetch(`/countries/co2-emissions/${year}/225`);
    const data = await fetchedCountries.json();
    const countries = data.map((country) =>{
      const iso3Code = country.ISO3;
      const colorValue = country.gas_co2;
      return {id: iso3Code, value: colorValue};
    });

    localStorage.setItem(item, JSON.stringify(countries));
    return countries;
  }
}

/**
 * Fetches statistics information for a particular country.
 *
 * @async
 * @function
 * @param {string} country - The country for which statistics are fetched.
 * @returns {Promise<Object>} Statistics information for the specified country.
 */
export async function getStatisticInfo(country){
  const item = `Temperature Co2 Statistics ${country}`;

  if (localStorage.getItem(item) !== null) {
    const results = JSON.parse(localStorage.getItem(item));
    return results;
  }

  const response = await fetch(`/temperature-co2-statistics/${country}`);
  const dataJson = await response.json();

  localStorage.setItem(item, JSON.stringify(dataJson));

  return dataJson;
}