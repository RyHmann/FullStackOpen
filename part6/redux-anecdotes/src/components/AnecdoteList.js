import { useDispatch, useSelector } from "react-redux"
import { incrementVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filteredList = anecdotes.filter(n => n.content.includes(filter))
    const dispatch = useDispatch()

    const vote = async (anecdote) => {
        dispatch(incrementVote(anecdote))
        dispatch(setNotification(`Voted for: '${anecdote.content}'`, 5))
      }

    return (
        <div>
            {filteredList.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList