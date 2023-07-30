import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const handleCreate = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`Added: '${content};`, 5))
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={ handleCreate }>
                <div><input name='anecdote'/></div>
                <button>create</button>
          </form>
        </div>
    )
}

export default AnecdoteForm