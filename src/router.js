import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import CourseInfo from './views/CourseInfo'
import CourseList from './views/CourseList'
import Register from './views/Register'
import StudentInfo from './views/StudentInfo'
import AdminLogin from './views/AdminLogin'
import AdminMain from './views/AdminMain'

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
      path: '/Register',
      name: 'Register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // eslint-disabled-line
      component: Register
    },
      {
          path: '/CourseInfo/:CourseID',
          name: 'CourseInfo',
          component: CourseInfo,
          props:true
      },
      {
          path: '/CourseList',
          name: 'CourseList',
          component: CourseList
      },
      {
          path: '/StudentInfo',
          name: 'StudentInfo',
          component: StudentInfo
      },
      {
          path: '/AdminLogin',
          name: 'AdminLogin',
          component:AdminLogin
      },
      {
          path: '/AdminMain',
          name: 'AdminMain',
          component: AdminMain
      },
  ]
})
