import axios from 'axios'

const fetchApi = axios.create({
    baseURL: process.env.VITE_BASE_URL_API,
    responseType: "json"
})

export default fetchApi;