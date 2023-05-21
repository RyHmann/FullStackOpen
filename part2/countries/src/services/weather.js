import axios from "axios"

const api_key = process.env.REACT_APP_API_KEY
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"

const getWeather = (coords) => {
    const queryString = `${baseUrl}lat=${coords[0]}&lon=${coords[1]}&appid=${api_key}`
    const request = axios.get(queryString)
    return request.then(response => response.data)
  }

export default {getWeather}