import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Search = ({ countries, setResult, setCountry, query, setQuery }) => {

  const handleQueryChange = (e) => {
    setCountry({})
    setQuery(e.target.value)
  
    let filterOutput = []
    
    const filter = countries.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))

    if (filter) filterOutput = filter

    setResult(filterOutput)

    if (filterOutput.length === 1) {
      setCountry(filterOutput[0])
    }
  }

  return (
    <div>
      <p>Find Countries</p>
      <input value={query} onChange={handleQueryChange}/>
    </div>
  )
}

const CountryList = ({ countries, setCountry }) => {
  const handleShowCountryGen = (country) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
    return () => {
      axios
      .get(url)
      .then(response => {
        console.log(response.data)
        country.weather = response.data.current
        setCountry(country)
      })
    }
  }

  return (
    <div>
      {countries.map(c => {
        return (
          <div key={c.name}>
            <p>{c.name}</p>
            <button onClick={handleShowCountryGen(c)}>show</button>
          </div>
        )
      })}
    </div>
  )
}

const Country = ({ country }) => {
  if (Object.keys(country).length === 0) {
    return (<></>)
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>
      <img src={country.flag} height="100px"></img>
      <h2>Weather in {country.capital}</h2>
      <p><b>temperature: </b>{country.weather.temperature} Celcius</p>
      <img src={country.weather.weather_icons[0]} height="50px"/>
      <p><b>wind: </b>{country.weather.wind_speed} mph direction {country.weather.wind_dir}</p>
    </div>
  )
}

const Result = ({ country, result, setCountry }) => {
  
  let output = (<></>)
  if (result.length > 10) {
    output =  (<p>Too many matches, specify another filter</p>)
  } else if (result.length === 1) {
    output = (<Country country={country}/>)
  } else {
    output = (
      <>
        <CountryList countries={result} setCountry={setCountry}/>
        <Country country={country}/>
      </>
    )
  }

  return output
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ query, setQuery ] = useState('')
  const [ country, setCountry ] = useState({})
  const [ result, setResult ] = useState([])
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])


  return (
    <div>
      <Search countries={countries} setCountry={setCountry} query={query} setQuery={setQuery} setResult={setResult}/>
      <Result country={country} result={result} setCountry={setCountry}/>
    </div>
  )
}

export default App