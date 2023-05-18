import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    const newNameObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(e => e.name === newNameObject.name)) {
      alert(`${newNameObject.name} is already added to the phonebook`)
      clearContact()
    }
    else {
      setPersons(persons.concat(newNameObject))
      clearContact()
    }
  }

  const clearContact = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <Filter text='Phonebook' filter={filterText} handleChange={handleFilterTextChange} />
      <AddContact text="Add Contact" 
                  nameValue={newName} 
                  nameChange={handleNameChange} 
                  numberValue={newNumber} 
                  numberChange={handleNumberChange} 
                  handleAddContact={addNewName} />
      <Contacts text="Contacts" contacts={persons} filter={filterText}/>
    </div>
  )
}

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

const Contacts = ( props ) => {
  return (
    <div>
      <h1>{props.text}</h1>
      {props.contacts
      .filter(e => e.name.toLowerCase().includes(props.filter))
      .map(contact => <Contact key={contact.name} name={contact.name} number={contact.number}/>)}
    </div>
  )
}

const Contact = ( {name, number} ) => <p>{name} {number}</p>

export default App
