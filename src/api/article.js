import axios from 'axios'

const getArticle = slug => {
  return axios.get(`/articles/${slug}`).then(res => res.data.article)
}

const deleteArticle = slug => {
  return axios.delete(`/article/${slug}`)
}

const createArticle = articleInput => {
  return axios
    .post('/articles', {article: articleInput})
    .then(res => res.data.article)
}

const updateArticle = (slug, articleInput) => {
  return axios
    .put(`/articles/${slug}`, articleInput)
    .then(res => res.data.article)
}

export default {
  getArticle,
  deleteArticle,
  createArticle,
  updateArticle
}
