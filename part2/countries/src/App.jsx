import { useState, useEffect } from "react"
import axios from "axios"


const Filter = ({ search, handleSearch }) => {
  return (
    <div>
      find countries: <input value={search} onChange={handleSearch} />
    </div>
  )
}

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => console.log(error))
  }, [capital])

  if (Object.keys(weather).length === 0) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p><b>temperature:</b> {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
      <p><b>wind:</b> {weather.wind.speed} m/s</p>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>
            {language}
          </li>
        ))}
      </ul>
      <br />
      <img src={country.flags.png} height="100" alt={`flag of ${country.name.common}`} />

      <Weather capital={country.capital} />

    </div>
  )
}

const ManyCountries = ({ filterCountry, setSearch }) => {
  return (
    <div>
      <ul>
        {filterCountry.map(country => (
          <li key={country.name.common}>
            {country.name.common} &nbsp;
            <button onClick={() => setSearch(country.name.common)}>show</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Countries = ({ filterCountry, setSearch }) => {
  if (filterCountry.length > 10) {
    return (
      <div>
        too many matches, specify another filter
      </div>
    )
  }

  if (filterCountry.length === 1) {
    return (
      <div>
        <Country country={filterCountry[0]} />
      </div>
    )
  }

  if (filterCountry.length <= 10 && filterCountry.length > 1) {
    return (
      <div>
        <ManyCountries filterCountry={filterCountry} setSearch={setSearch} />
      </div>
    )
  }

  if (filterCountry.length === 0) {
    return (
      <div>
        no matches
      </div>
    )
  }
}


function App() {
  const [allCountries, setAllCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
      })
      .catch(error => console.log(error))
  }, [])

  const handleSearch = (event) => setSearch(event.target.value)

  useEffect(() => {
    if (search !== "") {
      setFilterCountry(allCountries.filter(
        country => country.name.common.toLowerCase().includes(search.toLowerCase())
      ))
    } else {
      setFilterCountry([])
    }
  }, [search, allCountries])

  if (allCountries.length === 0) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <div>
      <Filter search={search} handleSearch={handleSearch} />
      <br />
      <Countries filterCountry={filterCountry} setSearch={setSearch} />
    </div>
  )
}

export default App
