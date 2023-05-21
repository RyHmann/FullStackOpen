import axios from "axios"

// the url from FullStackOpen (https://studies.cs.helsinki.fi/restcountries/api/all) doesn't seem to be allowing me to make calls to it
// using a third party url instead
const url = "https://restcountries.com/v3.1/all"
const localUrl = 'http://localhost:3001/countries'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default {getAll}