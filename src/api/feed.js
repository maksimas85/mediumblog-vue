import axios from '@/api/axios'

const getFeed = apiURL => {
  return axios.get(apiURL)
}

export default {
  getFeed
}
