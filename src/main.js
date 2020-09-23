import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//element-ui
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element)

//axios配置
import axios from './common/axiosConfig'
import qs from 'qs'
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;

//API接口路径
import apiUrl from './common/apiUrl'
Vue.prototype.$APIURL = apiUrl;

//vuex
Vue.prototype.$store = store;

//全局过滤器
import './common/globalFilter'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
