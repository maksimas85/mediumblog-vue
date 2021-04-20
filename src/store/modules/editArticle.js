import articleApi from '@/api/article'
import {mutationTypes, actionTypes} from '@/store/types/editArticle'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null
}

const mutations = {
  [mutationTypes.updateArticleStart](state) {
    state.isSubmiting = true
  },
  [mutationTypes.updateArticleSuccess](state) {
    state.isSubmiting = false
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.article = payload
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.updateArticle](context, {slug, articleInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.updateArticleStart)
      articleApi
        .updateArticle(slug, articleInput)
        .then(article => {
          context.commit(mutationTypes.updateArticleSuccess, article)
          resolve(article)
        })
        .catch(result => {
          context.commit(
            mutationTypes.updateArticleFailure,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.getArticle](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getArticleStart)
      articleApi
        .getArticle(slug)
        .then(article => {
          context.commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
