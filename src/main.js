import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  DatePicker,
  Switch,
  Dialog,
  Pagination,
  MessageBox,
  Message
} from 'element-ui';


import 'element-ui/lib/theme-chalk/index.css';
// 导入配置文件（CSS）
import '../src/assets/less/index.less'
// 导入 axios
import http from 'axios'

// 导入路由器（router）文件夹
import router from '../router'
// 导入 store 文件夹（vuex 仓库）
import store from '../store'
// 导入 mock 拦截器组件
import '../api/mock.js'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(Pagination)

// axios 不是插件，绑定在 prototype上
Vue.prototype.$http = http
// 在 ../views/User 中使用了 MessageBox(弹窗)，需要引入 MessageBox ,错误提示: this.$confirm is not a funtion
Vue.prototype.$confirm = MessageBox.confirm 
// 在 ../views/User 中使用了 Message(消息提示)，需要引入 Message ,错误提示: this2.$message is not a funtion
Vue.prototype.$message = Message

// // 导航守卫-路由监听
// router.beforeEach((to, from, next) => {
//   // 避免刷新后丢失 token
//   store.commit('getToken')
//   const token = store.state.user.token

//   console.log(token, 'main-token')
//   console.log(to.name, 'main-to.name')

//   // 如果当前 token 不存在并且当前页面不是 login 页面，不能进入管理系统
//   if (!token && to.name !== 'login') {
//     next({ name: 'login' })
//   }
//   else if (token && to.name === 'login') {
//     next({ name: 'home' })
//     // next()
//   }
//   else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  // store.commit('clearToken')
  store.commit('getToken')
  const token = store.state.user.token 

  // 如果当前 token 不存在并且当前页面不是 login 页面，不能进入管理系统
  if (!token && to.name !== 'login') {
    // next('login')
    next('login')
  } else if (token && to.name === 'login') {
    next('home')
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
