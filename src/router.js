import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import CourseInfo from './views/CourseInfo'
import CourseList from './views/CourseList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/helloWorld',
      name: 'helloWorld',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // eslint-disabled-line
      component: () => import(/* webpackChunkName: "about" */ './views/HelloWorld.vue')
    },
      {
          path: '/CourseInfo',
          name: 'CourseInfo',
          component: CourseInfo
      },
      {
          path: '/CourseList',
          name: 'CourseList',
          component: CourseList
      },
  ]
})
