const AddContact = ( props ) => {
    return (
      <div>
        <h2>{props.text}</h2>
        <form>
          <div>
            name: <input value={props.nameValue} onChange={props.nameChange} />
          </div>
          <div>number: <input value={props.numberValue} onChange={props.numberChange} /></div>
          <div>
            <button onClick={props.handleAddContact} type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }

export default AddContact