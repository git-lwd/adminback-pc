

import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element)


const baseURL = process.env.VUE_APP_API_HOST
axios.defaults.baseURL = baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var loading = '';
// 添加请求拦截器
axios.interceptors.request.use(config=> {
    loading = Vue.prototype.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    let token = sessionStorage.getItem('userToken')
    if (token) {
        config.headers['Authorization'] = "Bearer " + token
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    Vue.prototype.$message({
        message: error,
        type: 'error'
    });
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
    loading.close();
    // 对响应数据做点什么
    return response;
}, function (error) {
    loading.close();
    // 对响应错误做点什么
    if (error.response.data.code == '0001') {
        Vue.prototype.$message({
            message: '登录已过期，请重新登录',
            type: 'error'
        });
        setTimeout(() => {
            router.push({ name: "Login" })
        }, 1000);
    } else {
        Vue.prototype.$message({
            message: error,
            type: 'error'
        });
    }
    return Promise.reject(error);
});

export default axios