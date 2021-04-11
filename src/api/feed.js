import axios from 'axios'

const getFeed = apiURL => {
  return axios.get(apiURL)
}

export default {
  getFeed
}
