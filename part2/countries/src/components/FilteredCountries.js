
const FilteredCountries = ({countries, handleClick}) => {
    return (
        <div>
        {countries
        .map(n => 
            <div key={n.name.common}>
              {n.name.common} <button onClick={() => handleClick(n.name.common)}>show</button>
            </div>
            )}
      </div>
    )
}

export default FilteredCountries