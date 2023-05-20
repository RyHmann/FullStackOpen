const Contacts = ( props ) => {
    return (
      <div>
        <h1>{props.text}</h1>
        {props.contacts
          .filter(e => e.name.toLowerCase().includes(props.filter))
          .map(contact => <Contact key={contact.name} contact={contact} handleDelete={props.handleDelete}/>)}
      </div>
    )
  }
  
const Contact = ( {contact, handleDelete} ) => {
    return(
    <div>
        {contact.name} {contact.number}<DeleteButton contact={contact} handleDelete={handleDelete}/>
    </div>
    )}

const DeleteButton = ({contact, handleDelete}) => {
    return (
    <button onClick={() => handleDelete(contact)}>Delete Contact</button>
    )
}

export default Contacts