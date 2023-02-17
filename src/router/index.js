import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login'
import home from '../views/Home'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: login
}, {
  path: '/home',
  component: home
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