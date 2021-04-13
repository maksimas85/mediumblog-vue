import articleApi from '@/api/article'
import {mutationTypes, actionTypes} from '@/store/types/createArticle'

const state = {
  isSubmitting: false,
  validationErrors: null
}

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmiting = true
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmiting = false
  },
  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createArticle](context, {articleInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createArticleStart)
      articleApi
        .createArticle(articleInput)
        .then(article => {
          context.commit(mutationTypes.createArticleSuccess)
          resolve(article)
        })
        .catch(result => {
          context.commit(
            mutationTypes.createArticleFailure,
            result.response.data.errors
          )
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
