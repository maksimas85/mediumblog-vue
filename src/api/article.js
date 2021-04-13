import axios from "axios";

const getArticle = slug => {
  return axios.get(`/articles/${slug}`).then(res => res.data.article)
}

export default {
  getArticle
}