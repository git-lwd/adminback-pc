import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//axios配置
import axios from './common/axiosConfig'
import qs from 'qs'
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;

//API接口路径
import apiUrl from './common/apiUrl'
Vue.prototype.$APIURL = apiUrl;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
