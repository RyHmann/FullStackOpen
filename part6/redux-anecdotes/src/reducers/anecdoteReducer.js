import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

export const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

    addVote(state, action) {
      const id = action.payload.id
      const anecdote = state.find(n => n.id === id)
      const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote).toSorted((a, b) => { return b.votes - a.votes })
    },

    addAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload.toSorted((a, b) => { return b.votes - a.votes })
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const addedAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(addAnecdote(addedAnecdote))
  }
}

export const incrementVote = (object) => {
  return async dispatch => {
    const anecdote = await anecdoteService.addVote(object)
    dispatch(addVote(anecdote))
  }
}

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer