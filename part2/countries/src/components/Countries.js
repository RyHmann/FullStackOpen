import Country from './Country'
import FilteredCountries from './FilteredCountries'

const Countries = ( {filteredCountries, handleClick} ) => {
    if (filteredCountries.length === 1) {
      const selectedCountry = [...filteredCountries][0]
      return (
        <Country country={selectedCountry} />
      )
    }
    else if (filteredCountries.length > 1 && filteredCountries.length < 11) {
      return (
        <FilteredCountries countries={filteredCountries} handleClick={handleClick} />
      )
    }
    else if (filteredCountries.length === 0) {
      return (
        <div>
          No countries found
        </div>
      )
    }
    else {
      return (
        <div>
            Too many matches, specify another filter
        </div>
      )
    }
  }



export default Countries