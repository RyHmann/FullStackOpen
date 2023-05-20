const Filter = ( props ) => {
    return (
      <div>
        <h2>{props.text}</h2>
        <div>
          find contacts <input value={props.filter} onChange={props.handleChange}/>
        </div>
      </div>
    )
  }

export default Filter