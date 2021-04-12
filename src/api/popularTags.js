import axios from 'axios'

const getPopularTags = () => {
  return axios.get('/tags').then(res => res.data.tags)
}

export default {
  getPopularTags
}
