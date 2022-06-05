import axios from 'axios'
import config from '../config'

// 判断当前的配置环境，改变相应的接口地址
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

// ES6 class 语法
class HttpRequest {
    // 构造函数，初始化 baseUrl
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    // 初始化配置
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,  // 地址
            header: {}  // 请求头
        }
        return config
    }

    // 拦截器设置
    interceptors(instance) {
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
          }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
          });
        
        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            console.log(response, 'response')
            // 对响应数据做点什么
            return response;
        }, function (error) {
            console.log(error, 'error')
            // 对响应错误做点什么
            return Promise.reject(error);
        });
        
        // // 移除拦截器
        // const myInterceptor = instance.interceptors.request.use(function () {/*...*/});
        // instance.interceptors.request.eject(myInterceptor);
    }

    // 接口请求调用
    request(options) {
        const instance = axios.create() // 创建 axios 接口
        options = { ...this.getInsideConfig(), ...options } // 解构初始化配置和传入的参数
        this.interceptors(instance) // 调用拦截器拦截 axios 接口请求
        return instance(options)    // 返回接口配置信息
    }
}

// 对 class 类 HttpRequest 进行全局暴露     
export default new HttpRequest(baseUrl)
