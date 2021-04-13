import axios from 'axios'

const getArticle = slug => {
  return axios.get(`/articles/${slug}`).then(res => res.data.article)
}

const deleteArticle = slug => {
  return axios.delete(`/article/${slug}`)
}

export default {
  getArticle,
  deleteArticle
}
