import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
  isLoading: false
}

export const actionsTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[] getCurrentUser'
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous'
}

export const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure'
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
  },
  [actionsTypes.login](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationsTypes.loginStart)
      authApi
        .login(credentials)
        .then(res => {
          context.commit(mutationsTypes.loginSuccess, res.data.user)
          setItem('accessToken', res.data.user.token)
          resolve(res.data.user)
        })
        .catch(result => {
          context.commit(
            mutationsTypes.loginFailure,
            result.response.data.errors
          )
        })
    })
  },
  [actionsTypes.getCurrentUser](context) {
    return new Promise(resolve => {
      context.commit(mutationsTypes.getCurrentUserStart)
      authApi
        .getCurrentUser()
        .then(res => {
          context.commit(mutationsTypes.getCurrentUserSuccess, res.data.user)
          resolve(res.data.user)
        })
        .catch(() => {
          context.commit(mutationsTypes.getCurrentUserFailure)
        })
    })
  }
}

const getters = {
  [getterTypes.currentUser]: state => {
    return state.currentUser
  },
  [getterTypes.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.isAnonymous]: state => {
    return state.isLoggedIn === false
  }
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
  },
  [mutationsTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationsTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationsTypes.loginFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationsTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationsTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationsTypes.getCurrentUserFailure](state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
