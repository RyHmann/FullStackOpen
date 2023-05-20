import { useState, useEffect } from 'react'
import contactService from './services/contacts'
import Filter from './components/Filter'
import AddContact from './components/AddContact'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(allContacts => {
        setPersons(allContacts)
      })
  }, []);

  const addNewContact = (event) => {
    event.preventDefault()
    const newContactObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(e => e.name === newContactObject.name && e.number === newContactObject.number)) {
      alert(`${newContactObject.name} is already added to the phonebook`)
      clearContact()
    }
    else if (persons.some(e => e.name === newContactObject.name && e.number !== newContactObject.number)) {
      if (window.confirm(`${newContactObject.name} is already added to the phonebook, replace the old number with a new one?`)) {
      let contactId = persons.find(e => e.name === newContactObject.name).id
      contactService
        .update(contactId, newContactObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== contactId ? person : response))
        })
      }
      clearContact()
    }
    else {
      contactService
        .create(newContactObject)
        .then(response => {
          setPersons(persons.concat(response))
          clearContact()
        })
    }
  }

  const deleteContact = (contact) => {
    if (window.confirm(`Do you want to delete ${contact.name} from the phonebook?`)){
    contactService
      .deleteContact(contact.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== contact.id))
      })
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
                  handleAddContact={addNewContact} />
      <Contacts text="Contacts" contacts={persons} filter={filterText} handleDelete={deleteContact}/>
    </div>
  )
}

export default App
