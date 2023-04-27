import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/base.css'

// 引入element ui
import './plugins/element'

// 引入axios
import axios from 'axios'

// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

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

// 引入全局组件
import component from './components/echarts'
Vue.use(component)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')