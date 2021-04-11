import feedApi from '@/api/feed'
import {mutationTypes, actionTypes} from '@/store/types/feed'

const state = {
  data: null,
  isLoading: false,
  error: null
}

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getFeedFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getFeed](context, {apiURL}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getFeedStart)
      feedApi
        .getFeed(apiURL)
        .then(res => {
          context.commit(mutationTypes.getFeedSuccess, res.data)
          resolve(res.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getFeedFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
