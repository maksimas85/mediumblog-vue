import authApi from '@/api/auth'
const state = {
  isSubmitting: false
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true
  },
  registerSuccess(state) {
    state.isSubmitting = false
  },
  registerFailure(state) {
    state.isSubmitting = false
  }
}

// Используем Promise так как в нашем компоненте требуется среагировать на action. (then in onSubmit/Register.vue)
const actions = {
  register(context, credentials) {
    // context - this.$store
    return new Promise(resolve => {
      context.commit('registerStart')
      authApi
        .register(credentials)
        .then(res => {
          console.log('response', res)
          context.commit('registerSuccess', res.data.user)
          resolve(res.data.user)
        })
        .catch(result => {
          console.log('result errors', result)
          context.commit('registerFailure', result.response.data.errors)
        })
    })
    // setTimeout(() => {
    //   context.commit('registerStart')
    // }, 1000)
  }
}

export default {
  state,
  mutations,
  actions
}
