import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://api.weatherstack.com/current";

const fetchWeather = async (resolveFn, query) => {
  const response = await axios.get(
    `${API_BASE}?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${query}`
  );
  resolveFn(response.data);
};

const fetchCountries = async (resolveFn) => {
  const response = await axios.get("https://restcountries.com/v3/all");
  resolveFn(response.data);
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    fetchCountries(setCountries);
  }, []);

  const searchedCountries = searchTerm
    ? countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    : countries;

  useEffect(() => {
    if (
      searchedCountries.length === 1 &&
      weather?.location?.country.toLowerCase() !==
        searchedCountries[0].name.common.toLowerCase()
    ) {
      fetchWeather(setWeather, searchedCountries[0].name.common);
    }
  }, [searchedCountries, weather?.location?.country]);

  console.log(weather);

  return (
    <div>
      <span>find countries: </span>
      <input
        type="text"
        placeholder="Search countries by name.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchedCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : searchedCountries.length === 1 ? (
        <>
          <h2>{searchedCountries[0].name.common}</h2>
          <p>capital {searchedCountries[0].capital[0]}</p>
          {/* there is no population key in v3 */}
          {/* <p>population {searchedCountries[0].population}</p> */}
          <h2>languages</h2>
          <ul>
            {Object.values(searchedCountries[0].languages).map((language) => {
              return <li>{language}</li>;
            })}
          </ul>
          <img
            height="100"
            width="100"
            alt="country flag"
            src={searchedCountries[0].flags[1]}
          />
        </>
      ) : (
        <ul>
          {searchedCountries.map((country) => {
            return (
              <li>
                {country.name.common}
                <button onClick={() => setSearchTerm(country.name.common)}>
                  show
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {weather && (
        <>
          <h2>Weather in {weather.location.name}</h2>
          <p>
            <strong>temperature: </strong> {weather.current.temperature}
          </p>
          {weather.current.weather_icons.map((iconUrl) => {
            return <img src={iconUrl} alt="weather icon" />;
          })}
          <p>
            <strong>wind: </strong>
            {weather.current.wind_speed} mph direction{" "}
            {weather.current.wind_dir}
          </p>
        </>
      )}
    </div>
  );
}

export default App;
