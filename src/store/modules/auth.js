const state = {
  isSubmitting: false
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true
  }
}

const actions = {
  register(context) {
    setTimeout(() => {
      context.commit('registerStart')
    }, 1000)
  }
}

export default {
  state,
  mutations,
  actions
}
