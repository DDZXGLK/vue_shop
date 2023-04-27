import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Home from '../views/Home'
import Welcome from '../views/Welcome'
import Users from '../views/users/Users'
import Reports from '../views/reports/Reports'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Login
}, {
  path: '/home',
  component: Home,
  redirect: "/welcome",
  children: [{
    path: "/welcome",
    component: Welcome
  }, {
    path: "/users",
    component: Users
  }, {
    path: "/reports",
    component: Reports
  }]
}]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == "/") return next();
  const token = sessionStorage.getItem("token");
  if (!token) return next("/");
  next();
})

export default router