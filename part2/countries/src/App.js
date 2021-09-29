import React, { useState, useEffect } from "react";
import {
  TooManyMatches,
  CountryDetails,
  CountriesList,
  CountryWeather,
} from "./components";
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

const RenderCountries = ({ countries, setSearchTerm }) => {
  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }
  if (countries.length > 10) {
    return <TooManyMatches />;
  }

  return <CountriesList countries={countries} handleClick={setSearchTerm} />;
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
    const isCountryChanged = () =>
      weather?.location?.country.toLowerCase() !==
      searchedCountries[0].name.common.toLowerCase();

    if (searchedCountries.length === 1 && isCountryChanged()) {
      fetchWeather(setWeather, searchedCountries[0].name.common);
    }
  }, [searchedCountries, weather?.location?.country]);

  return (
    <div>
      <span>find countries: </span>
      <input
        type="text"
        placeholder="Search countries by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm ? (
        <>
          <RenderCountries
            countries={searchedCountries}
            setSearchTerm={setSearchTerm}
          />
          {weather && <CountryWeather weather={weather} />}
        </>
      ) : null}
    </div>
  );
}

export default App;
