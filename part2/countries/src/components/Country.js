import { useState, useEffect } from "react"
import weatherService from '../services/weather'

const Country = ({country}) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService
      .getWeather(country.capitalInfo.latlng)
      .then(weather => {
        setWeather(weather)
      })
  }, [country.capitalInfo.latlng]);

  if (weather)
  {
    return (
      <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>
        )}
      </ul>
      <img style={{borderStyle: "solid"}} src={country.flags.png} alt={country.flags.alt}/>
      <div>
        <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" /> 
        <p>wind {weather.wind.speed}</p> 
      </div>
    </div>
    )
  }
  else {
    <h1>Loading...</h1>
  }

  }

export default Country