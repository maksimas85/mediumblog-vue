/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/views/Register'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

export default router
