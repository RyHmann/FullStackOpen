import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, addVote } from './request'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()

  const [notification, dispatch] = useContext(NotificationContext)

  const updatedAnecdoteMutation = useMutation(addVote, {
    onSuccess: () => queryClient.invalidateQueries('anecdotes')
  })

  const handleVote = (anecdote) => {
    dispatch({ type:'VOTE', payload: anecdote})
    setTimeout(() => dispatch({type:'CLEAR'}), 5000)
    updatedAnecdoteMutation.mutate(anecdote)
  }

  const result = useQuery('anecdotes', getAnecdotes, { retry: 1 })

  if ( result.isLoading ) {
    return <div>Loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems with the server</div>
  }

  const anecdotes = result.data

  return (
      <div>
      <h3>Anecdote app</h3>
    
      <Notification/>
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
