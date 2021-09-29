export const TooManyMatches = () => {
  return <div>Too many matches, specify another filter</div>;
};

export const CountryDetails = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <img height="100" width="100" alt="country flag" src={country.flags[1]} />
    </>
  );
};

export const CountriesList = ({ countries, handleClick }) => {
  return (
    <ul>
      {countries.map((country) => {
        return (
          <li key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleClick(country.name.common)}>
              show
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export const CountryWeather = ({ weather }) => {
  return (
    <>
      <h2>Weather in {weather.location.name}</h2>
      <p>
        <strong>temperature: </strong> {weather.current.temperature}
      </p>
      {weather.current.weather_icons.map((iconUrl, index) => {
        return <img key={index} src={iconUrl} alt="weather icon" />;
      })}
      <p>
        <strong>wind: </strong>
        {weather.current.wind_speed} mph direction {weather.current.wind_dir}
      </p>
    </>
  );
};
