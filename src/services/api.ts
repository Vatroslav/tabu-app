import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  timeout: 2000,
  headers: { 'X-Custom-Header': 'foobar' },
})
export default instance
