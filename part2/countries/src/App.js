import { useState, useEffect } from "react";
import countryService from './services/countries'
import Countries from './components/Countries'

function App() {

const [countries, setCountries] = useState([])
const [filter, setFilter] = useState([])
const [filteredCountries, setFilteredCountries] = useState([])



useEffect(() => {
  countryService
    .getAll()
    .then(countries => {
    setCountries(countries)
  })
  .catch(error => {
    console.log('error response', error);
  })
}, []);

const handleFilterChange = (event) => {
  setFilter(event.target.value)
  setFilteredCountries(countries.filter(n => n.name.common.toLowerCase().includes(event.target.value)))
}

const handleSelectCountry = (name) => {
  const currentCountries = [...filteredCountries]
  setFilteredCountries(currentCountries.filter(n => n.name.common === name))
}

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange}/>
      <Countries filteredCountries={filteredCountries} handleClick={handleSelectCountry}/>
    </div>
  );

}

export default App;
