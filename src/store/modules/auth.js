import authApi from '@/api/auth'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true
    state.validationErrors = null // сбрасываем ошибки валидации при прошлой попытке зарегистрироваться/войти
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false
    // payload - наш ответ с сервера (наш пользователь)
    state.currentUser = payload
    state.isLoggedIn = true // залогинены успешно
  },
  registerFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload // записываем ошибки
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
          context.commit('registerSuccess', res.data.user)
          resolve(res.data.user)
        })
        .catch(result => {
          context.commit('registerFailure', result.response.data.errors)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
