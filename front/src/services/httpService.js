import axios from 'axios'
import config from '../config'
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500

  if (!expectedError) {
    console.log('Error', error)
  }
  return Promise.reject(error)
})
axios.defaults.baseURL = config.apiEndpoint
export default {
  get: axios.get,
  post: axios.post,
}
