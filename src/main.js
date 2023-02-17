import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/base.css'
import './plugins/element.js'
import axios from 'axios'
// 配置请求基准路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
// 配置请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})

// 挂载到vue原型上，通过this即可访问
Vue.prototype.$request = axios;

// 关闭生产提示
Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')