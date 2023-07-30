import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}

export const createAnecdote = (obj) => {
    return axios.post(baseUrl, obj).then(res => res.data)
}

export const addVote = (obj) => {
    const votedAnecdote = {...obj, votes: obj.votes + 1}
    return axios.put(`${baseUrl}/${obj.id}`, votedAnecdote).then(res => res.data)
}