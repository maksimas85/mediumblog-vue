/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/views/Register'
import GlobalFeed from '@/views/GlobalFeed'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: GlobalFeed
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: GlobalFeed
  },
  {
    path: '/article/new',
    name: 'createArticle',
    component: GlobalFeed
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: GlobalFeed
  },
  {
    path: '/article/:slug/edit',
    name: 'editArticle',
    component: GlobalFeed
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed
  }
]

const router = new VueRouter({
  routes
})

export default router
