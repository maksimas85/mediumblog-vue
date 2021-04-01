import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
}

export const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure'
}

const mutations = {
  [mutationsTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null // сбрасываем ошибки валидации при прошлой попытке зарегистрироваться/войти
  },
  [mutationsTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    // payload - наш ответ с сервера (наш пользователь)
    state.currentUser = payload
    state.isLoggedIn = true // залогинены успешно
  },
  [mutationsTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload // записываем ошибки
  }
}

export const actionsTypes = {
  register: '[auth] register'
}

// Используем Promise так как в нашем компоненте требуется среагировать на action. (.then in onSubmit/Register.vue)
const actions = {
  [actionsTypes.register](context, credentials) {
    // context - this.$store
    return new Promise(resolve => {
      context.commit(mutationsTypes.registerStart)
      authApi
        .register(credentials)
        .then(res => {
          context.commit(mutationsTypes.registerSuccess, res.data.user)
          setItem('accessToken', res.data.user.token)
          resolve(res.data.user)
        })
        .catch(result => {
          context.commit(
            mutationsTypes.registerFailure,
            result.response.data.errors
          )
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
